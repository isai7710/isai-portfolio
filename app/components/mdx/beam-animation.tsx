"use client";

import { useState, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

interface BeamControlsProps {
  force: number;
  setForce: Dispatch<SetStateAction<number>>;
  youngModulus: number;
  setYoungModulus: Dispatch<SetStateAction<number>>;
  momentInertia: number;
  setMomentInertia: Dispatch<SetStateAction<number>>;
  animating: boolean;
  setAnimating: Dispatch<SetStateAction<boolean>>;
  maxDeflection: number;
}
interface BeamRendererProps {
  beamPoints: Array<{ x: number; y: number }>;
  currentForce: number;
}

function DeflectionFormula() {
  const deflection_formula = `y = \\frac{F}{EI}\\left(\\frac{Lx^2}{2} - \\frac{x^3}{6}\\right)`;

  return (
    <div className="flex flex-col px-8 items-center gap-2 bg-primary shadow-lg rounded-lg py-4 border border-palette-2/10 h-full">
      <div className="font-mono text-palette-2 text-lg">Deflection Formula</div>
      {/* Equation display */}
      <div className="bg-palette-1/30 p-3 rounded border border-palette-3/20 inline-block">
        <div className="text-lg text-palette-2 font-mono">
          <BlockMath math={deflection_formula} />
        </div>
      </div>
    </div>
  );
}

function BeamControls({
  force,
  setForce,
  youngModulus,
  setYoungModulus,
  momentInertia,
  setMomentInertia,
  animating,
  setAnimating,
  maxDeflection,
}: BeamControlsProps) {
  return (
    <div className="flex flex-col w-full bg-primary shadow-lg rounded-lg px-4 border border-palette-2/10 h-full">
      {/* Controls section */}
      <div className="relative z-10 flex justify-between items-center py-4">
        <div className="flex items-center">
          <div className="w-1 h-6 bg-palette-4 rounded-full mr-2"></div>
          <div className="text-lg font-semibold text-palette-2">
            Beam Parameters
          </div>
        </div>
        <button
          onClick={() => setAnimating(!animating)}
          className={`
            px-4 py-1.5 rounded-full text-xs font-mono 
            shadow-md transform transition-all duration-200
            ${
              animating
                ? "bg-palette-4 text-primary hover:bg-palette-4/90 hover:scale-105"
                : "bg-palette-1 text-palette-2 hover:bg-palette-1/80 hover:scale-105"
            }
          `}
        >
          {animating ? "Pause" : "Animate"}
        </button>
      </div>

      {/* Sliders */}
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between text-xs">
            <label className="text-palette-3">Applied Force (N):</label>
            <span className="font-mono text-palette-4">{force} N</span>
          </div>
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            value={force}
            onChange={(e) => setForce(Number(e.target.value))}
            disabled={animating}
            className="w-full h-1.5 bg-palette-1/70 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex justify-between text-xs">
            <label className="text-palette-3">
              Young&apos;s Modulus (GPa):
            </label>
            <span className="font-mono text-palette-4">{youngModulus} GPa</span>
          </div>
          <input
            type="range"
            min="50"
            max="400"
            step="10"
            value={youngModulus}
            onChange={(e) => setYoungModulus(Number(e.target.value))}
            disabled={animating}
            className="w-full h-1.5 bg-palette-1/70 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex justify-between text-xs">
            <label className="text-palette-3">
              Moment of Inertia (10^6 mm^4):
            </label>
            <span className="font-mono text-palette-4">{momentInertia}</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.1"
            value={momentInertia}
            onChange={(e) => setMomentInertia(Number(e.target.value))}
            disabled={animating}
            className="w-full h-1.5 bg-palette-1/70 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {/* Max deflection indicator with more visual emphasis */}
      <div className="relative z-10 py-4 flex items-center gap-4">
        <div className="flex items-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            className="mr-2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#F28D35"
              strokeWidth="1.5"
            />
            <path
              d="M12 8V12L15 15"
              stroke="#F28D35"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-xs text-palette-3 font-medium">
            Maximum Deflection:
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-palette-4 text-xs">
            {Math.abs(maxDeflection).toFixed(2)} mm
          </span>
        </div>
      </div>
    </div>
  );
}

function BeamRenderer({ beamPoints, currentForce }: BeamRendererProps) {
  // Format beam points for SVG path
  const formatBeamPath = (points: Array<{ x: number; y: number }>): string => {
    return points
      .map((point, index) =>
        index === 0 ? `M ${point.x},0` : `L ${point.x},${point.y}`,
      )
      .join(" ");
  };

  const beamPath = formatBeamPath(beamPoints);

  return (
    <div className="relative bg-primary shadow-lg rounded-lg p-4 border border-palette-2/10 h-full">
      {/* Blueprint background */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern
            id="grid-renderer"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(232, 223, 202, 0.5)"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-renderer)" />
        </svg>
      </div>

      {/* Main beam visualization */}
      <div className="relative z-10 h-full w-full flex items-center justify-center">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 120 40"
          preserveAspectRatio="xMidYMid meet"
          className="overflow-visible"
        >
          {/* Center the coordinate system */}
          <g transform="translate(10, 20)">
            {/* Coordinate system */}
            <g className="coordinate-system">
              {/* X-axis */}
              <line
                x1="0"
                y1="0"
                x2="100"
                y2="0"
                stroke="rgba(232, 223, 202, 0.6)"
                strokeWidth="0.2"
              />
              <text
                x="102"
                y="3"
                fontSize="3"
                fill="rgba(232, 223, 202, 0.8)"
                className="font-mono"
              >
                X
              </text>

              {/* X-axis ticks */}
              {[0, 25, 50, 75, 100].map((x) => (
                <g key={`x-tick-${x}`}>
                  <line
                    x1={x}
                    y1="-1"
                    x2={x}
                    y2="1"
                    stroke="rgba(232, 223, 202, 0.6)"
                    strokeWidth="0.2"
                  />
                  <text
                    x={x}
                    y="4"
                    fontSize="2"
                    fill="rgba(232, 223, 202, 0.8)"
                    textAnchor="middle"
                    className="font-mono"
                  >
                    {x === 0 ? "0" : `${x / 100}L`}
                  </text>
                </g>
              ))}

              {/* Y-axis */}
              <line
                x1="0"
                y1="-15"
                x2="0"
                y2="15"
                stroke="rgba(232, 223, 202, 0.6)"
                strokeWidth="0.2"
              />
              <text
                x="-3"
                y="-15"
                fontSize="3"
                fill="rgba(232, 223, 202, 0.8)"
                className="font-mono"
              >
                Y
              </text>

              {/* Y-axis ticks */}
              {[-10, -5, 0, 5, 10].map((y) => (
                <g key={`y-tick-${y}`}>
                  <line
                    x1="-1"
                    y1={y}
                    x2="1"
                    y2={y}
                    stroke="rgba(232, 223, 202, 0.6)"
                    strokeWidth="0.2"
                  />
                  <text
                    x="-3"
                    y={y + 0.7}
                    fontSize="2"
                    fill="rgba(232, 223, 202, 0.8)"
                    textAnchor="end"
                    className="font-mono"
                  >
                    {y}
                  </text>
                </g>
              ))}
            </g>

            {/* Fixed support */}
            <rect
              x="-3"
              y="-10"
              width="3"
              height="20"
              fill="#4F6F52"
              stroke="rgba(232, 223, 202, 0.6)"
              strokeWidth="0.2"
            />

            {/* Support hatching */}
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={i}
                x1="-3"
                y1={-10 + (i + 1) * 2.5}
                x2="0"
                y2={-10 + i * 2.5}
                stroke="rgba(232, 223, 202, 0.6)"
                strokeWidth="0.2"
              />
            ))}

            {/* Initial beam position (reference) */}
            <line
              x1="0"
              y1="0"
              x2="100"
              y2="0"
              stroke="#E8DFCA"
              strokeWidth="0.3"
              strokeDasharray="1,1"
            />

            {/* Beam line */}
            <path
              d={beamPath}
              fill="none"
              stroke="#F28D35"
              strokeWidth="0.8"
              strokeLinecap="round"
              className="transition-all duration-100"
            />

            {/* Force arrow */}
            {currentForce > 0 && (
              <g transform="translate(100, 0)">
                {/* Arrow shaft */}
                <line
                  x1="0"
                  y1={beamPoints[beamPoints.length - 1].y}
                  x2="0"
                  y2={beamPoints[beamPoints.length - 1].y - 6}
                  stroke="#F28D35"
                  strokeWidth="0.5"
                />
                {/* Arrow head */}
                <polygon
                  points={`0,${beamPoints[beamPoints.length - 1].y - 7} -1,${
                    beamPoints[beamPoints.length - 1].y - 5
                  } 1,${beamPoints[beamPoints.length - 1].y - 5}`}
                  fill="#F28D35"
                />
                {/* Force value */}
                <text
                  x="2"
                  y={beamPoints[beamPoints.length - 1].y - 3}
                  fontSize="3"
                  fill="#F28D35"
                  fontWeight="bold"
                  className="font-mono"
                >
                  {Math.round(currentForce)} N
                </text>
              </g>
            )}

            {/* Label the beam */}
            <text
              x="50"
              y="-12"
              fontSize="3"
              fill="#F28D35"
              textAnchor="middle"
              className="font-mono"
            >
              Cantilever Beam
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function BeamAnimation() {
  // Default values
  const [force, setForce] = useState(1000); // Newtons
  const [youngModulus, setYoungModulus] = useState(200); // GPa
  const [momentInertia, setMomentInertia] = useState(1.83); // 10^6 mm^4

  // Constant for beam length (in meters)
  const beamLength = 2; // 2 meters (200cm)

  // Animation control
  const [animating, setAnimating] = useState(true);
  const [animationProgress, setAnimationProgress] = useState(0);

  // Convert values to consistent units
  const E = youngModulus * 1e9; // Convert GPa to Pa
  const I = momentInertia * 1e-6; // Convert 10^6 mm^4 to m^4

  // Function to calculate deflection at any point x along the beam
  const calculateDeflection = (x: number, forceValue: number): number => {
    // y = (F/EI)(Lx^2/2 - x^3/6)
    const deflection =
      (forceValue / (E * I)) * ((beamLength * x * x) / 2 - (x * x * x) / 6);

    // Scale deflection for visualization
    return deflection * 1000; // Scaling factor for visual clarity
  };

  // Generate points for the deflection curve
  const generateBeamPoints = (
    forceValue: number,
  ): Array<{ x: number; y: number }> => {
    const numPoints = 50;
    const points: Array<{ x: number; y: number }> = [];

    for (let i = 0; i <= numPoints; i++) {
      const x = (i / numPoints) * beamLength;
      const deflection = calculateDeflection(x, forceValue);

      // Convert to SVG coordinates (flip y-axis since SVG y increases downward)
      const svgX = (x / beamLength) * 100; // Convert to percentage of width
      const svgY = -deflection; // Negative because upward deflection

      points.push({ x: svgX, y: svgY });
    }

    return points;
  };

  // Start/toggle animation
  useEffect(() => {
    if (!animating) return;

    let animationFrame: number;
    let startTime: number | null = null;
    const duration = 4000; // 4 seconds

    const animate = (timestamp: number): void => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Calculate progress with a loop
      const normalizedTime = (elapsed % (duration * 2)) / duration;
      let progress;

      if (normalizedTime <= 1) {
        // Increasing force (0 to 1)
        progress = normalizedTime;
      } else {
        // Decreasing force (1 to 0)
        progress = 2 - normalizedTime;
      }

      setAnimationProgress(progress);
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [animating]);

  // Calculate current force based on animation progress
  const currentForce = animating ? force * animationProgress : force;

  // Generate beam points for current force
  const beamPoints = generateBeamPoints(currentForce);

  // Max deflection for display
  const maxDeflection = animating
    ? calculateDeflection(beamLength, currentForce)
    : calculateDeflection(beamLength, force);

  return (
    <div className="w-full">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {/* Full-span Renderer Component */}
        <div className="md:col-span-full h-64">
          <BeamRenderer beamPoints={beamPoints} currentForce={currentForce} />
        </div>
        {/* Formula Component - Small container */}
        <div className="md:col-span-2 h-32">
          <DeflectionFormula />
        </div>

        {/* Controls Component */}
        <div className="md:col-span-3 h-60">
          <BeamControls
            force={force}
            setForce={setForce}
            youngModulus={youngModulus}
            setYoungModulus={setYoungModulus}
            momentInertia={momentInertia}
            setMomentInertia={setMomentInertia}
            animating={animating}
            setAnimating={setAnimating}
            maxDeflection={maxDeflection}
          />
        </div>
      </div>
    </div>
  );
}
