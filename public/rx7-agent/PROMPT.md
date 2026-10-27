# Task for the coding agent

This folder is a mockup of the "About me" hero for my portfolio (dark HUD style, mono + wide display fonts).
Port it into my existing site, then improve the line art.

## Files
- about-me.html : the finished standalone mockup (open in a browser to see the target)
- tpl.html : the page template (CSS/JS, with %%PATHS%% and %%IMG%% placeholders)
- trace.py : aligns RX7_Black_Seats.png onto More_RX7.jpg (SIFT + affine) and runs Canny to make edges.png
- build.py : turns edges.png into SVG paths and bakes them into tpl.html -> about-me.html
- More_RX7.jpg (aurora, colour circle) and RX7_Black_Seats.png (clean sky, used for edges)
Run: pip install opencv-python numpy ; python trace.py ; python build.py

## How it works
White line-art car is drawn with stroke-dashoffset, then the aurora circle expands over the car.
A second copy of the lines, clipped to a circle that follows the cursor, is brighter/thicker.

## To do
1. Integrate into my site's real About page (framework, fonts, nav, scroll % HUD). Keep the animation.
2. Improve the line art: tires, rear wing and light poles are weak; remove stray fragments in the trees on the right. Tune Canny thresholds in trace.py, or hand-edit the paths.
3. Split the paths into two files/inline blocks instead of duplicating them for the cursor layer (use <use href>).
4. Make it responsive (mobile) and respect prefers-reduced-motion.
5. Optional: live Discord status via the Lanyard API.
