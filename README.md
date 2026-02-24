🧩 Phuzzle

Phuzzle is a system-driven, browser-based photo puzzle game built with vanilla JavaScript and canvas rendering.

Swap tiles, build clusters, manage modifiers, and restore the original image. Designed with a frosted glass UI, responsive layout, and layered sensory feedback for a polished, atmospheric experience.

✨ Core Features

Tile swapping with intelligent cluster grouping

Adjustable board sizes (3×3 → 6×6)

Persistent stats tracking (lifetime solves, streaks, highest difficulty)

Modifier system with locked difficulty multipliers

Cinematic solve animations and confetti

Frosted glass UI with responsive layout

Lightweight, framework-free architecture

🧩 Modifier System (v2.0.0)

Phuzzle now includes a weighted modifier system that increases difficulty and score multipliers:

No Cluster Drag – disables rigid cluster translation

Rotation Mode – tiles may start rotated (upright required to solve)

Fog of War – dynamic pointer-based visibility reveal with cinematic solve bloom

Modifiers arm before first move and lock on first interaction. Difficulty multipliers snapshot at run start.

🌫 Fog of War (New in v2.0.0)

Full-board fog overlay

Dynamic reveal window (mouse / touch)

Soft fade-out on mobile release

Purple live-state tint integration

Cinematic fog dispersal on solve

Weighted at 1.40× difficulty

Fog of War introduces tension, perceptual constraint, and visual payoff.

🎧 Accessibility & Sensory Features

Low Vision mode (high-contrast collections)

Audio proximity tone guidance

Haptic vibration feedback

Spoken photo titles on solve

Accessibility is a first-class system, not an afterthought.

🚀 Run Locally

From the project root:

python -m http.server 8000

Then open:

http://localhost:8000
🌐 Deployment (GitHub Pages)

When deploying:

Use relative asset paths

Avoid leading slashes (/)

Ensure images are inside /assets/

Correct:

assets/images/photo.jpg

Incorrect:

/assets/images/photo.jpg
🛠 Tech Stack

HTML5 Canvas rendering

Vanilla JavaScript (no frameworks)

Offscreen compositing for visual effects

CSS glass UI styling

GitHub Pages hosting

📦 Versioning

Phuzzle follows semantic versioning:

Patch: small fixes

Minor: UI/UX improvements or feature additions

Major: structural or gameplay system changes

Current release: v2.0.0

🧠 Design Philosophy

Phuzzle is built as a lightweight, performance-focused puzzle system.

Every update refines:

Interaction clarity

Visual tension

Modifier balance

Player progression

The goal is not complexity for its own sake, but layered polish.