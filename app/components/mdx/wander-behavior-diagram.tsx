"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function WanderBehaviorDiagram() {
  return (
    <>
      <div className="border border-palette-2 bg-palette-2/10 backdrop-blur-xs rounded-md w-full max-w-md mx-auto">
        <div className="relative w-full" style={{ paddingBottom: "55%" }}>
          {/* 4:3 aspect ratio */}
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="5 20 450 250"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Definitions for arrowheads */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#000" />
              </marker>
              <marker
                id="arrowhead-white"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#E8DFCA" />
              </marker>
              <marker
                id="arrowhead-blue"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#5483eb" />
              </marker>
              <marker
                id="arrowhead-accent"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#F28D35" />
              </marker>
            </defs>

            {/* Ant */}
            <circle cx="100" cy="200" r="8" fill="#5c2f0f" />
            <text x="87" y="230" className="text-sm font-bold" fill="#E8DFCA">
              Ant
            </text>

            {/* Current velocity vector */}
            <line
              x1="100"
              y1="200"
              x2="170"
              y2="162"
              stroke="#5483eb"
              strokeWidth="2"
              markerEnd="url(#arrowhead-blue)"
            />
            <foreignObject
              x="160"
              y="135"
              width="50"
              height="50"
              className="text-sm text-[#5483eb]"
            >
              <InlineMath>{`\\vec{v}`}</InlineMath>
            </foreignObject>

            {/* Wander circle */}
            <circle
              cx="250"
              cy="120"
              r="55"
              strokeWidth="1"
              strokeDasharray="5"
              fill="none"
              className="stroke-palette-2"
            />
            <circle cx="250" cy="120" r="2" fill="#E8DFCA" />
            <text x="285" y="65" className="text-sm" fill="#E8DFCA">
              Wander Circle
            </text>

            {/* Vector to wander circle center */}
            <line
              x1="100"
              y1="200"
              x2="250"
              y2="120"
              stroke="#000"
              strokeWidth="1"
              strokeDasharray="4"
              markerEnd="url(#arrowhead)"
            />
            <foreignObject
              x="220"
              y="138"
              width="50"
              height="50"
              className="text-xs text-black"
            >
              <InlineMath>{`\\vec{d}_w`}</InlineMath>
            </foreignObject>

            {/* Wander target */}
            <circle cx="290" cy="160" r="4" fill="#F28D35" />
            <text x="305" y="165" className="text-sm" fill="#F28D35">
              Wander Target
            </text>

            {/* Wander target vector */}
            <line
              x1="250"
              y1="120"
              x2="290"
              y2="160"
              stroke="#F28D35"
              strokeWidth="1"
              markerEnd="url(#arrowhead-accent)"
            />
            <foreignObject
              x="270"
              y="120"
              width="50"
              height="50"
              className="text-xs text-palette-4"
            >
              <InlineMath>{`\\vec{w}_t`}</InlineMath>
            </foreignObject>

            {/* Jitter circle */}
            <circle
              cx="290"
              cy="160"
              r="12"
              stroke="#d65454"
              strokeWidth="1"
              strokeDasharray="2"
              fill="none"
            />
            <text x="285" y="185" className="text-xs" fill="#d65454">
              Jitter circle
            </text>

            {/* acceleration vector */}
            <line
              x1="100"
              y1="200"
              x2="290"
              y2="160"
              stroke="#E8DFCA"
              strokeWidth="1"
              markerEnd="url(#arrowhead-white)"
            />
            <foreignObject
              x="200"
              y="182"
              width="50"
              height="50"
              className="text-xs text-palette-2"
            >
              <InlineMath>{`\\vec{a}`}</InlineMath>
            </foreignObject>
          </svg>
        </div>
      </div>
      <p className="text-sm text-center mt-2">
        Figure 1: Visualization of the wandering behavior algorithm
      </p>
    </>
  );
}
