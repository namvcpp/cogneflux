from manim import *

class BubbleSortAnimation(Scene):
    def construct(self):
        numbers = [5, 1, 4, 2, 8]
        rects = []
        texts = []
        for i, num in enumerate(numbers):
            rect = Rectangle(width=1, height=num, color=WHITE)
            rect.move_to(np.array([i * 1.5 - 3, num / 2 - 2, 0]))
            text = Text(str(num)).move_to(rect.get_center())
            rects.append(rect)
            texts.append(text)

        self.play(*[Create(rect) for rect in rects], *[Create(text) for text in texts])
        self.wait(1)

        n = len(numbers)
        for i in range(n):
            for j in range(0, n - i - 1):
                self.play(rects[j].animate.set_color(YELLOW), rects[j+1].animate.set_color(YELLOW))
                self.wait(0.5)

                if numbers[j] > numbers[j + 1]:
                    numbers[j], numbers[j + 1] = numbers[j + 1], numbers[j]

                    self.play(
                        rects[j].animate.move_to(np.array([j * 1.5 + 1.5 - 3, numbers[j] / 2 - 2, 0])),
                        rects[j+1].animate.move_to(np.array([j * 1.5 - 3, numbers[j+1] / 2 - 2, 0])),
                        texts[j].animate.move_to(rects[j+1].get_center()),
                        texts[j+1].animate.move_to(rects[j].get_center()),
                    )

                    rects[j], rects[j + 1] = rects[j + 1], rects[j]
                    texts[j], texts[j + 1] = texts[j + 1], texts[j]
                    
                self.play(rects[j].animate.set_color(WHITE), rects[j+1].animate.set_color(WHITE))
                self.wait(0.5)

        self.wait(2)