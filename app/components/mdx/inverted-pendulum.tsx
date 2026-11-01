"use client";

import React, { useState, useEffect, useRef } from "react";
import { RotateCcw, PauseIcon, PlayIcon } from "lucide-react";

// Define types for the system state and parameters
type SystemState = [number, number, number, number]; // [theta, z, thetaDot, zDot]
type DerivativeValues = [number, number, number, number];

interface InvertedPendulumSimulationProps {
  initialAngle?: number;
  width?: number;
  height?: number;
  autoPlay?: boolean;
}

const InvertedPendulumSimulation: React.FC<InvertedPendulumSimulationProps> = ({
  initialAngle = 0.3,
  width = 400,
  height = 200,
  autoPlay = false,
}) => {
  // Simulation parameters
  const [theta, setTheta] = useState<number>(initialAngle); // Pendulum angle in radians
  const [cartPosition, setCartPosition] = useState<number>(0); // Cart position in simulation units
  const [running, setRunning] = useState<boolean>(autoPlay);

  // Physical parameters
  const g: number = 9.8; // Gravity (m/s^2)
  const l: number = 1.0; // Pendulum length (m)
  const m1: number = 0.25; // Pendulum mass (kg)
  const m2: number = 1.0; // Cart mass (kg)
  const b: number = 0.05; // Damping coefficient (Ns)

  // Animation frame reference
  const requestRef = useRef<number | undefined>(undefined);
  const previousTimeRef = useRef<number | undefined>(undefined);
  // State of the system [theta, z, thetaDot, zDot]
  const stateRef = useRef<SystemState>([theta, 0, 0, 0]);
  // Force input
  const forceRef = useRef<number>(0);

  // SVG parameters (for mapping simulation units to pixels)
  const svgWidth: number = width;
  const svgHeight: number = height;
  const svgCartCenterX: number = width / 2;
  const svgCartCenterY: number = (height * 2) / 3;
  const pendulumLength: number = height / 3; // Length in pixels
  const pixelsPerUnit: number = 100; // Conversion factor

  // Apply force to the cart
  const applyForce = (force: number): void => {
    forceRef.current = force;
  };

  // Calculate derivatives for RK4 integration
  const calculateDerivatives = (
    state: SystemState,
    force: number,
  ): DerivativeValues => {
    const [theta, z, thetaDot, zDot] = state;

    // Equations of motion matrices
    const M11: number = (l ** 2 / 3.0) * m1;
    const M12: number = (l / 2) * m1 * Math.cos(theta);
    const M21: number = M12;
    const M22: number = m1 + m2;

    const detM: number = M11 * M22 - M12 * M21;

    const P1: number = (l / 2) * m1 * g * Math.sin(theta);
    const P2: number =
      (l / 2) * m1 * thetaDot ** 2 * Math.sin(theta) + force - b * zDot;

    // Solve for accelerations
    const thetaDotDot: number = (M22 * P1 - M12 * P2) / detM;
    const zDotDot: number = (M11 * P2 - M21 * P1) / detM;

    return [thetaDot, zDot, thetaDotDot, zDotDot];
  };

  // RK4 integration step
  const rk4Step = (
    state: SystemState,
    force: number,
    dt: number,
  ): SystemState => {
    const k1: DerivativeValues = calculateDerivatives(state, force);

    const state2: SystemState = state.map(
      (val, idx) => val + (dt / 2) * k1[idx],
    ) as SystemState;
    const k2: DerivativeValues = calculateDerivatives(state2, force);

    const state3: SystemState = state.map(
      (val, idx) => val + (dt / 2) * k2[idx],
    ) as SystemState;
    const k3: DerivativeValues = calculateDerivatives(state3, force);

    const state4: SystemState = state.map(
      (val, idx) => val + dt * k3[idx],
    ) as SystemState;
    const k4: DerivativeValues = calculateDerivatives(state4, force);

    return state.map(
      (val, idx) =>
        val + (dt / 6) * (k1[idx] + 2 * k2[idx] + 2 * k3[idx] + k4[idx]),
    ) as SystemState;
  };

  // Animation loop
  const animationLoop = (time: number): void => {
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time;
    }

    const deltaTime: number = Math.min(
      (time - previousTimeRef.current) / 1000,
      0.03,
    ); // In seconds, capped for stability
    previousTimeRef.current = time;

    if (running) {
      // Update system state using RK4 integration
      stateRef.current = rk4Step(stateRef.current, forceRef.current, deltaTime);

      // Extract the updated values
      setTheta(stateRef.current[0]);
      setCartPosition(stateRef.current[1]);
    }

    requestRef.current = requestAnimationFrame(animationLoop);
  };

  // Start animation when component mounts
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animationLoop);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [running]);

  // Convert simulation theta to SVG coordinates for the pendulum rod end
  const rodEndX: number = svgCartCenterX + pendulumLength * Math.sin(theta);
  const rodEndY: number = svgCartCenterY - pendulumLength * Math.cos(theta);

  // Cart dimensions
  const cartWidth: number = svgWidth / 4;
  const cartHeight: number = svgHeight / 7.5;
  const wheelRadius: number = cartHeight / 2.5;

  // Cart SVG position
  const cartX: number =
    svgCartCenterX - cartWidth / 2 + cartPosition * pixelsPerUnit;

  // Reset function
  const resetSimulation = (): void => {
    stateRef.current = [initialAngle, 0, 0, 0];
    setTheta(initialAngle);
    setCartPosition(0);
  };

  return (
    <div className="aspect-video relative bg-primary shadow-lg rounded p-4">
      {!autoPlay ? (
        <>
          <div className="absolute top-0 left-0 flex gap-2 m-2">
            <button
              className="bg-primary hover:bg-palette-1 transition-colors duration-300 text-palette-4 border border-palette-4 font-bold py-1 px-4 rounded mr-2"
              onClick={() => setRunning(!running)}
            >
              {running ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button
              className="bg-palette-2/10 backdrop-blur-md hover:bg-palette-2/20 text-palette-2 font-bold py-1 px-4 rounded mr-2"
              onClick={resetSimulation}
            >
              <RotateCcw />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 flex gap-2 justify-around text-sm m-2">
            <div>
              <span className="text-palette-2">Angle:</span>
              <span className="ml-2 font-mono">
                {((theta * 180) / Math.PI).toFixed(1)}°
              </span>
            </div>
            <div>
              <span className="text-palette-2">Cart Position:</span>
              <span className="ml-2 font-mono">{cartPosition.toFixed(2)}m</span>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-full"
      >
        {/* Ground line */}
        <line
          x1={svgWidth * 0.125}
          y1={svgCartCenterY + wheelRadius}
          x2={svgWidth * 0.875}
          y2={svgCartCenterY + wheelRadius}
          stroke="#0000AA"
          strokeWidth="2"
          strokeDasharray="5,5"
        />

        {/* Cart */}
        <rect
          id="cart"
          x={cartX}
          y={svgCartCenterY - cartHeight / 2}
          width={cartWidth}
          height={cartHeight}
          fill="#3366CC"
          stroke="black"
          strokeWidth="2"
        />

        {/* Wheels */}
        <circle
          id="wheel-left"
          cx={cartX + cartWidth * 0.2}
          cy={svgCartCenterY + cartHeight / 2}
          r={wheelRadius}
          fill="#32CD32"
          stroke="black"
          strokeWidth="2"
        />
        <circle
          id="wheel-right"
          cx={cartX + cartWidth * 0.8}
          cy={svgCartCenterY + cartHeight / 2}
          r={wheelRadius}
          fill="#32CD32"
          stroke="black"
          strokeWidth="2"
        />

        {/* Pendulum rod */}
        <line
          id="pendulum-rod"
          x1={cartX + cartWidth / 2}
          y1={svgCartCenterY}
          x2={rodEndX}
          y2={rodEndY}
          stroke="#8B4513"
          strokeWidth="10"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

const InvertedPendulumSVG = () => {
  return (
    <div className="flex justify-start my-0">
      <svg
        viewBox="0 0 300 200"
        className="w-full max-w-sm bg-primary border border-palette-2 rounded-md"
      >
        {/* Coordinate system - smaller and centered */}
        <g id="coordinates" className="text-gray-400">
          {/* x-axis (i-hat) - passing through center of cart */}
          <line
            x1="30"
            y1="100"
            x2="60"
            y2="100"
            stroke="currentColor"
            strokeWidth="1"
          />
          <polygon points="60,100 55,97 55,103" fill="currentColor" />
          <text x="62" y="103" fontSize="10" fill="currentColor">
            î
          </text>

          {/* y-axis (j-hat) */}
          <line
            x1="30"
            y1="100"
            x2="30"
            y2="70"
            stroke="currentColor"
            strokeWidth="1"
          />
          <polygon points="30,70 27,75 33,75" fill="currentColor" />
          <text x="32" y="68" fontSize="10" fill="currentColor">
            ĵ
          </text>
        </g>

        {/* Track (dotted line) */}
        <line
          x1="30"
          y1="115"
          x2="270"
          y2="115"
          stroke="#0000AA"
          strokeWidth="1.5"
          strokeDasharray="4,4"
        />

        {/* Cart */}
        <rect
          id="cart"
          x="125"
          y="85"
          width="50"
          height="30"
          fill="#3366CC"
          stroke="#000"
          strokeWidth="1.5"
        />

        {/* Pendulum rod (at slight angle) - starting from center of cart */}
        <line
          x1="150"
          y1="100"
          x2="165"
          y2="40"
          stroke="#8B4513"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Vertical reference line */}
        <line
          x1="150"
          y1="100"
          x2="150"
          y2="40"
          stroke="#888"
          strokeWidth="0.75"
          strokeDasharray="2,2"
        />

        {/* Force arrow */}
        <line
          x1="175"
          y1="100"
          x2="195"
          y2="100"
          stroke="#FF4500"
          strokeWidth="1.5"
        />
        <polygon points="195,100 190,97 190,103" fill="#FF4500" />
        <text x="185" y="95" fontSize="10" fill="#FF4500">
          F
        </text>

        {/* Generalized coordinates */}
        {/* Theta angle */}
        <text x="152" y="50" fontSize="10" fill="#009900">
          θ
        </text>

        {/* Cart position */}
        <line
          x1="30"
          y1="125"
          x2="150"
          y2="125"
          stroke="#009900"
          strokeWidth="1"
          markerEnd="url(#arrowhead)"
        />
        <text x="105" y="135" fontSize="10" fill="#009900">
          z
        </text>

        {/* Arrowhead marker definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="6"
            refX="8"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="#009900" />
          </marker>
        </defs>
      </svg>
    </div>
  );
};

export { InvertedPendulumSimulation, InvertedPendulumSVG };
