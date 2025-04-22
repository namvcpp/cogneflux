from manim import *

class BubbleSortAnimation(Scene):
    def construct(self):
        arr = [5, 1, 4, 2, 8]
        rects = []
        texts = []
        for i, num in enumerate(arr):
            rect = Rectangle(height=num, width=0.8, fill_opacity=0.8, color=BLUE, fill_color=BLUE)
            rect.move_to(LEFT * 3 + RIGHT * i * 1.2)
            rects.append(rect)
            text = Text(str(num), color=WHITE).move_to(rect.get_center())
            texts.append(text)

        self.play(*[Create(rect) for rect in rects], *[Create(text) for text in texts])
        self.wait(1)

        n = len(arr)
        for i in range(n):
            for j in range(0, n - i - 1):
                self.play(rects[j].animate.set_color(YELLOW), rects[j+1].animate.set_color(YELLOW))
                self.wait(0.5)

                if arr[j] > arr[j+1]:
                    arr[j], arr[j+1] = arr[j+1], arr[j]
                    self.play(
                        rects[j].animate.move_to(LEFT * 3 + RIGHT * (j+1) * 1.2),
                        rects[j+1].animate.move_to(LEFT * 3 + RIGHT * j * 1.2),
                        texts[j].animate.move_to(rects[j+1].get_center()),
                        texts[j+1].animate.move_to(rects[j].get_center())
                    )
                    rects[j], rects[j+1] = rects[j+1], rects[j]
                    texts[j], texts[j+1] = texts[j+1], texts[j]
                    self.wait(0.5)

                self.play(rects[j].animate.set_color(BLUE), rects[j+1].animate.set_color(BLUE))

            self.play(rects[n - i - 1].animate.set_color(GREEN))

        self.wait(2)