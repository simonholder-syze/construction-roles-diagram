# Construction Roles Diagram (Client‑Centred)

An editable React + SVG diagram that maps key UK domestic construction roles with a **client at the centre**.

**Roles included:** Client, Principal Designer (PD), Principal Contractor (PC – Syze Developments), Structural Engineer (SE), Building Control (BC), Planning Authority (PA), Southern Water (SW).

**Links (directions):**
- PD → PA (submission)
- PD ↔ PC (coordination)
- PD ↔ SE (structural coordination)
- PD → BC (instruction / compliance comms)
- PD — SW (reference only, no arrows – dashed)
- PC ↔ BC (inspections)  
- Client connected to all nodes (plain lines)

## Quick Start (no build tools)
1. Open **index.html** in your browser.
2. Edit node positions/labels in `src/ConstructionRolesDiagram.jsx` (NODES + EDGES). Save and refresh.

## Repo Structure
```
/src/ConstructionRolesDiagram.jsx  # Diagram component + config (edit here)
index.html                         # Loads React via CDN and renders the component
.gitignore
README.md
```

## How to Publish (GitHub Pages)
1. Push this repo to GitHub.
2. In your repo settings → **Pages**, set source to **Deploy from a branch**, branch: **main**, folder: **/**.
3. Visit the URL GitHub shows (it may be `https://simonholder-syze.github.io/construction-roles-diagram/`).

## Editing the Diagram
- Move a node: change its `x, y` in the `NODES` object.
- Resize a node: change its `r` (radius).
- Change links: edit the `EDGES` array. Types: `"one"` (→), `"two"` (↔), `"plain"` (no arrows). Add `dashed: true` for reference lines.
- The curve routing avoids most crossings; tune the `curve` constant in `curvedPath()` if needed.

---
© 2025 Simon Holder. Feel free to adapt.
