🧩 Phuzzle

Phuzzle is a system-driven, browser-based photo puzzle game built with vanilla JavaScript and HTML5 canvas rendering.

Swap tiles. Build clusters. Engage modifiers. Restore the original image.

Designed with a frosted glass interface, responsive layout, and layered sensory feedback, Phuzzle blends tactile interaction with cinematic polish.

✨ Core Features

Intelligent tile swapping with cluster grouping

Adjustable board sizes (3×3 → 6×6)

Persistent lifetime stats and streak tracking

Weighted modifier system with difficulty multipliers

Cinematic solve animations and confetti

Frosted glass UI with responsive mobile layout

Framework-free, performance-focused architecture

👤 Local Profiles System (New in v2.1.0)

Phuzzle now supports multiple local player profiles.

Profiles are stored entirely in the browser using localStorage. No accounts. No servers. No data leaves the device.

Each profile tracks independently:

Lifetime solves

Modifier clears

Highest difficulty reached

Current and best streak

Total play time

Best time and best moves per grid size

Users can:

Create new profiles

Rename profiles

Delete profiles

Switch instantly between players

This system enables family play, isolated progress tracking, and future unlockable mechanics — all without external infrastructure.

🧩 Modifier System (v2.0+)

Phuzzle includes a weighted modifier framework that increases difficulty and score multipliers:

No Cluster Drag
Disables rigid cluster translation

Rotation Mode
Tiles may start rotated. Upright orientation required to lock

Fog of War
Dynamic pointer-based reveal window with cinematic bloom on solve

Modifiers arm before the first move and lock on first interaction.
Difficulty multipliers snapshot at run start.

🌫 Fog of War (Enhanced in v2.1.0)

Full-board fog overlay

Dynamic reveal window (mouse and touch)

Soft linger fade on mobile release

Increased touch reveal radius for better ergonomics

Purple live-state tint integration

Cinematic fog dispersal on solve

Fog of War introduces tension, perceptual constraint, and visual payoff.

Weighted at 1.40× difficulty.

🎧 Accessibility & Sensory Systems

Accessibility is a first-class system.

Low Vision mode with high-contrast collections

Audio proximity tone guidance

Haptic vibration feedback

Spoken image titles on solve

These systems layer visual, audio, and tactile feedback to support broader interaction clarity.

🚀 Run Locally

From the project root:

python -m http.server 8000

Then open:

http://localhost:8000
🌐 Deployment (GitHub Pages)

When deploying:

Use relative asset paths

Avoid leading slashes

Ensure images are inside /assets/

Correct:

assets/images/photo.jpg

Incorrect:

/assets/images/photo.jpg
🛠 Tech Stack

HTML5 Canvas rendering

Vanilla JavaScript (no frameworks)

Offscreen compositing for layered visual effects

CSS frosted glass UI styling

GitHub Pages hosting

📦 Versioning

Phuzzle follows semantic versioning:

Patch: fixes and refinements

Minor: feature additions and UX evolution

Major: structural or gameplay system changes

Current release: v2.1.0

🧠 Design Philosophy

Phuzzle is built as a lightweight, performance-focused puzzle system.

Every update refines:

Interaction clarity

Visual tension

Modifier balance

Player progression

The goal is not complexity for its own sake, but layered polish.