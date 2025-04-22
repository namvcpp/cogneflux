from manim import *

class BubbleSortAnimation(Scene):
    def construct(self):
        array = [5, 1, 4, 2, 8]
        rects = []
        numbers = []
        n = len(array)
        x_start = -3
        y_pos = 0

        for i, num in enumerate(array):
            rect = Rectangle(width=0.7, height=num, color=BLUE, fill_opacity=0.7)
            rect.move_to([x_start + i, y_pos, 0])
            rects.append(rect)

            number = Text(str(num), color=WHITE)
            number.move_to(rect.get_center())
            numbers.append(number)

        group = VGroup(*rects, *numbers)
        self.play(Create(group))
        self.wait(0.5)

        for i in range(n):
            for j in range(0, n - i - 1):
                self.play(rects[j].animate.set_color(YELLOW),
                          rects[j+1].animate.set_color(YELLOW))
                self.wait(0.3)

                if array[j] > array[j + 1]:
                    self.play(
                        rects[j].animate.shift(RIGHT),
                        rects[j + 1].animate.shift(LEFT),
                        numbers[j].animate.shift(RIGHT),
                        numbers[j + 1].animate.shift(LEFT)
                    )
                    rects[j], rects[j + 1] = rects[j + 1], rects[j]
                    numbers[j], numbers[j + 1] = numbers[j + 1], numbers[j]
                    array[j], array[j + 1] = array[j + 1], array[j]
                    self.wait(0.5)

                self.play(rects[j].animate.set_color(BLUE),
                          rects[j+1].animate.set_color(BLUE))

            self.play(rects[n-i-1].animate.set_color(GREEN))
            self.wait(0.2)

        self.play(rects[0].animate.set_color(GREEN))
        self.wait(1)