from manim import *
import random

class QuickSortAnimation(Scene):
    def construct(self):
        # Configuration
        array_size = 10
        array = list(range(1, array_size + 1))
        random.shuffle(array)
        rect_width = 0.7
        rect_height_scale = 0.5
        spacing = 0.1

        # Create rectangles
        rects = VGroup()
        numbers = VGroup()
        for i, num in enumerate(array):
            rect = Rectangle(width=rect_width, height=num * rect_height_scale)
            rect.move_to(LEFT * (array_size / 2 - 0.5 - i) * (rect_width + spacing))
            number = Tex(str(num))
            number.scale(0.6)
            number.move_to(rect.get_center())
            rects.add(rect)
            numbers.add(number)

        self.play(Create(rects), Create(numbers))
        self.wait(0.5)

        def partition(arr, rects_group, numbers_group, l, h):
            pivot = arr[h]
            i = l - 1

            pivot_rect = rects_group[h].copy()
            pivot_rect.set_fill(YELLOW, opacity=0.5)
            self.play(Create(pivot_rect), run_time=0.3)

            for j in range(l, h):
                rect_j = rects_group[j]
                rect_j_copy = rect_j.copy()
                rect_j_copy.set_fill(BLUE, opacity=0.5)
                self.play(Create(rect_j_copy), run_time=0.3)
                self.wait(0.1)

                if arr[j] <= pivot:
                    i += 1
                    rect_i = rects_group[i]

                    if i != j:
                        arr[i], arr[j] = arr[j], arr[i]
                        numbers_group[i].target = rect_j.get_center()
                        numbers_group[j].target = rect_i.get_center()
                        rects_group[i].target = rect_j.get_center()
                        rects_group[j].target = rect_i.get_center()

                        self.play(MoveToTarget(numbers_group[i]),
                                  MoveToTarget(numbers_group[j]),
                                  MoveToTarget(rects_group[i]),
                                  MoveToTarget(rects_group[j]), run_time=0.5)

                        rects_group[i], rects_group[j] = rects_group[j], rects_group[i]
                        numbers_group[i], numbers_group[j] = numbers_group[j], numbers_group[i]

                    else:
                         self.wait(0.2)

                self.play(FadeOut(rect_j_copy), run_time=0.1)

            arr[i + 1], arr[h] = arr[h], arr[i + 1]
            numbers_group[i + 1].target = rects_group[h].get_center()
            numbers_group[h].target = rects_group[i + 1].get_center()
            rects_group[i + 1].target = rects_group[h].get_center()
            rects_group[h].target = rects_group[i + 1].get_center()

            self.play(MoveToTarget(numbers_group[i + 1]),
                        MoveToTarget(numbers_group[h]),
                        MoveToTarget(rects_group[i + 1]),
                        MoveToTarget(rects_group[h]), run_time=0.5)

            rects_group[i + 1], rects_group[h] = rects_group[h], rects_group[i + 1]
            numbers_group[i + 1], numbers_group[h] = numbers_group[h], numbers_group[i + 1]

            self.play(FadeOut(pivot_rect), run_time=0.2)
            return i + 1

        def quick_sort(arr, rects_group, numbers_group, l, h):
            if l < h:
                pi = partition(arr, rects_group, numbers_group, l, h)
                quick_sort(arr, rects_group, numbers_group, l, pi - 1)
                quick_sort(arr, rects_group, numbers_group, pi + 1, h)

        quick_sort(array, rects, numbers, 0, len(array) - 1)

        for rect in rects:
            rect.set_fill(GREEN, opacity=0.5)

        self.play(AnimationGroup(*[rect.animate.set_fill(GREEN, opacity=0.5) for rect in rects]), run_time=1)

        self.wait(2)