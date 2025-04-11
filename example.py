from manim import *
import numpy as np

class ElectricFieldDipoleScene(Scene):
    def construct(self):
        # --- Configuration ---
        # Define charge positions and magnitudes
        charge1_pos = np.array([-2, 0, 0])  # Position of positive charge
        charge1_q = 1.0                   # Magnitude (positive)
        charge2_pos = np.array([2, 0, 0])   # Position of negative charge
        charge2_q = -1.0                  # Magnitude (negative)

        charges = [(charge1_pos, charge1_q), (charge2_pos, charge2_q)]
        k = 1 # Electric constant (set to 1 for visualization simplicity)

        # --- Electric Field Function ---
        # This function calculates the electric field vector at a given point
        def electric_field_function(point):
            total_field = np.array([0.0, 0.0, 0.0]) # Initialize field vector (Manim works in 3D)
            for charge_pos, charge_q in charges:
                # Vector from charge to the point
                r_vec = point - charge_pos
                # Distance squared
                r_sq = np.sum(r_vec**2)

                # Avoid singularity and extremely large vectors very close to the charge
                # Option 1: Return zero field very close (can create artifacts)
                # if r_sq < 1e-4:
                #     return np.array([0.0, 0.0, 0.0])
                # Option 2: Set a minimum distance (smoother near charge)
                min_r_sq = 0.05
                if r_sq < min_r_sq:
                    r_sq = min_r_sq

                # Calculate field contribution: E = k * q / r^2 * (r_vec / |r|)
                r_mag = np.sqrt(r_sq)
                field_contribution = k * charge_q / r_sq * (r_vec / r_mag)

                total_field += field_contribution

            # Optional: Clamp the magnitude to prevent overly dominant vectors/streamlines
            # max_field_magnitude = 5.0
            # current_magnitude = np.linalg.norm(total_field)
            # if current_magnitude > max_field_magnitude:
            #    total_field = total_field * (max_field_magnitude / current_magnitude)

            return total_field

        # --- Manim Objects ---
        # Create dots to represent the charges
        pos_charge_dot = Dot(point=charge1_pos, color=RED, radius=0.15)
        neg_charge_dot = Dot(point=charge2_pos, color=BLUE, radius=0.15)

        # Create labels for the charges
        pos_label = MathTex("+q", color=RED).next_to(pos_charge_dot, UP, buff=0.2)
        neg_label = MathTex("-q", color=BLUE).next_to(neg_charge_dot, UP, buff=0.2)

        # --- Field Visualization using StreamLines ---
        stream_lines = StreamLines(
            electric_field_function,
            x_range=[-5, 5, 0.5],  # Start, Stop, Step (controls density)
            y_range=[-4, 4, 0.5],  # Start, Stop, Step (controls density)
            padding=1,            # Extend calculation slightly beyond range
            stroke_width=1.5,
            max_anchors_per_line=30, # Controls complexity/smoothness of lines
            virtual_time=1.5,      # Controls how far the lines are traced
            # Example: Color lines based on magnitude (optional)
            # color_func = lambda p: interpolate_color(BLUE, RED, np.clip(np.linalg.norm(electric_field_function(p))/3, 0, 1))
            # stream_lines.set_color_by_rgb_func(color_func)
        )
        # Add arrows to the streamlines
        stream_lines.add_arrow_tips(tip_length=0.15, tip_width=0.1)


        # Add a flowing effect animation
        flow_animation = ShowPassingFlash(
            stream_lines.copy().set_color(WHITE), # Use a copy for the flash
            run_time=3,
            time_width=0.3, # Width of the flash along the line
            rate_func=linear,
        )

        # Alternative: Use ArrowVectorField to show vectors at grid points
        # vector_field = ArrowVectorField(
        #     electric_field_function,
        #     x_range=[-5, 5, 1], # Grid spacing for arrows
        #     y_range=[-4, 4, 1],
        #     length_func=lambda norm: 0.4 * sigmoid(norm), # Scale arrow length non-linearly
        #     opacity=0.75
        # )

        # --- Animation Steps ---
        self.play(
            FadeIn(pos_charge_dot),
            FadeIn(neg_charge_dot),
            Write(pos_label),
            Write(neg_label),
            run_time=1
        )
        self.wait(0.5)

        # Animate the creation of the streamlines
        self.play(Create(stream_lines), run_time=4)
        self.wait(0.5)

        # Play the flow animation
        self.play(flow_animation)
        self.wait(1)

        # # If using VectorField instead of/in addition to StreamLines:
        # self.play(Create(vector_field), run_time=3)
        # self.wait(2)

        # Keep the final scene for a bit
        self.wait(3)


# --- How to Run ---
# 1. Save the code above as a Python file (e.g., `electric_field.py`).
# 2. Make sure you have Manim installed (Community Edition recommended: https://docs.manim.community/en/stable/installation/index.html).
# 3. Open your terminal or command prompt, navigate to the directory where you saved the file.
# 4. Run the command: manim -pql electric_field.py ElectricFieldDipoleScene
#    - `-p` flag previews the animation.
#    - `-q` sets the quality (`l` for low, `m` for medium, `h` for high, `k` for 4k). `l` is fastest for testing.