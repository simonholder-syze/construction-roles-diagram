/* Construction Roles Relationship to Client (React + SVG, CDN-friendly)
   Edit NODES/EDGES below to reposition or relink. */

const NODES = {
  C:  { label: "Client",                               x: 530, y: 300, r: 64 },
  PD: { label: "Architect (PD)",              x: 530, y: 90,  r: 48 },
  PA: { label: "Planning (LPA)",              x: 860, y: 160, r: 46 },
  BC: { label: "Inspector (BCO)",                x: 530, y: 540, r: 46 },
  SW: { label: "Water Co. (WC)",                  x: 860, y: 440, r: 46 },
  PC: { label: "Builder (PC)",     x: 220, y: 440, r: 46 },
  SE: { label: "Engineer (SE)",             x: 220, y: 160, r: 46 },
};

/* Edge legend:
   type: "one" (A -> B), "two" (A <-> B), "plain" (no arrows)
   dashed: true for reference-only links */
const EDGES = [
  // Client links (simple plain lines, no arrowheads)
  { from: "C", to: "PD", type: "plain" },
  { from: "C", to: "PC", type: "plain" },
  
  { from: "C", to: "BC", type: "plain" },
  { from: "C", to: "PA", type: "plain" },
  

  // PD connections
  { from: "PD", to: "PA", type: "one" },            // submission
  { from: "PD", to: "PC", type: "two" },            // coordination
  { from: "PD", to: "SE", type: "two" },            // structural design
              // instruction / compliance comms
  { from: "PD", to: "SW", type: "plain", dashed: true }, // shared info only

  // PC connections
  { from: "PC", to: "BC", type: "two", dashed: false },            // inspections
{ from: "PC", to: "SE", type: "plain", dashed: false },
   
  // SW additional reference link
  { from: "SW", to: "BC", type: "plain", dashed: true },
];

function ArrowDefs() {
  return (
    <defs>
      <marker id="arrowSmall" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
      </marker>
    </defs>
  );
}

function lineProps(edge) {
  const base = { fill: "none", stroke: "currentColor", strokeWidth: 2, opacity: 0.9 };
  if (edge.dashed) base.strokeDasharray = "6 6";
  if (edge.type === "one") return { ...base, markerEnd: "url(#arrowSmall)" };
  if (edge.type === "two") return { ...base, markerStart: "url(#arrowSmall)", markerEnd: "url(#arrowSmall)" };
  return base; // plain
}

function curvedPath(a, b) {
  // Gentle curve to reduce crossings
  const dx = b.x - a.x, dy = b.y - a.y;
  const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
  const curve = 0.18;
  const cx = mx - dy * curve, cy = my + dx * curve;
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
}

function Node({ n }) {
  return (
    <g>
      <circle cx={n.x} cy={n.y} r={n.r} fill="#fde68a" stroke="#f59e0b" strokeWidth="2" />
      <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#334155">
  {n.label}
</text>
    </g>
  );
}

function DiagramCanvas() {
  return (
    <svg viewBox="0 0 1080 620">
      <ArrowDefs />
      {/* edges */}
      {EDGES.map((e, i) => {
        const a = NODES[e.from], b = NODES[e.to];
        return <path key={i} d={curvedPath(a, b)} {...lineProps(e)} />;
      })}
      {/* nodes */}
      {Object.entries(NODES).map(([id, n]) => <Node key={id} n={n} />)}
    </svg>
  );
}

ReactDOM.render(<DiagramCanvas />, document.getElementById("diagram-root"));
