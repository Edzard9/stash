from manim import *


class BinaryPlaceValue(Scene):
    """Binary place value: bits flip on, and a running total adds up.

    Text and shapes only - no MathTex / LaTeX anywhere.
    The byte shown is 10101101 = 128 + 32 + 8 + 4 + 1 = 173.
    """

    def construct(self):
        title = Text("Binary place value", font_size=42).to_edge(UP)
        self.play(FadeIn(title))

        places = [128, 64, 32, 16, 8, 4, 2, 1]
        bits = [1, 0, 1, 0, 1, 1, 0, 1]

        squares = VGroup()
        digits = VGroup()
        labels = VGroup()
        for i, p in enumerate(places):
            sq = Square(side_length=0.92)
            sq.set_stroke(WHITE, width=3)
            sq.set_fill(BLUE_E, opacity=0.25)
            digit = Text("0", font_size=40)
            label = Text(str(p), font_size=26, color=YELLOW)
            squares.add(sq)
            digits.add(digit)
            labels.add(label)

        squares.arrange(RIGHT, buff=0.18).move_to(UP * 0.55)
        for sq, d, lab in zip(squares, digits, labels):
            d.move_to(sq.get_center())
            lab.next_to(sq, UP, buff=0.18)

        self.play(Create(squares), FadeIn(digits), FadeIn(labels))

        total = 0
        total_text = Text("Total = 0", font_size=44, color=GREEN).move_to(DOWN * 1.7)
        self.play(FadeIn(total_text))

        for i, b in enumerate(bits):
            if b == 0:
                continue
            total += places[i]
            new_digit = Text("1", font_size=40, color=GREEN).move_to(
                squares[i].get_center()
            )
            new_total = Text(
                f"Total = {total}", font_size=44, color=GREEN
            ).move_to(DOWN * 1.7)
            self.play(
                squares[i].animate.set_fill(GREEN, opacity=0.55),
                Transform(digits[i], new_digit),
                Transform(total_text, new_total),
                run_time=0.7,
            )

        caption = Text("10101101 in binary = 173 in decimal", font_size=32).move_to(
            DOWN * 2.7
        )
        self.play(FadeIn(caption))
        self.wait(1.2)
