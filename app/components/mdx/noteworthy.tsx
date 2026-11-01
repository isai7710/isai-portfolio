"use client";
import React, { useState, ReactNode, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/app/lib/utils";

interface NoteworthyProps {
  children: ReactNode;
  note: ReactNode;
  trigger?: "hover" | "click";
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

const Noteworthy: React.FC<NoteworthyProps> = ({
  children,
  note,
  trigger = "hover",
  position = "top",
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [actualPosition, setActualPosition] = useState(position);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);

  // Handle positioning and centering based on viewport and trigger size
  useEffect(() => {
    if (isVisible && triggerRef.current && noteRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const noteRect = noteRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      let newPosition = position;

      // Check if note would go off-screen and adjust
      if (position === "top" && triggerRect.top - noteRect.height < 20) {
        newPosition = "bottom";
      } else if (
        position === "bottom" &&
        triggerRect.bottom + noteRect.height > viewportHeight - 20
      ) {
        newPosition = "top";
      } else if (
        position === "left" &&
        triggerRect.left - noteRect.width < 20
      ) {
        newPosition = "right";
      } else if (
        position === "right" &&
        triggerRect.right + noteRect.width > viewportWidth - 20
      ) {
        newPosition = "left";
      }

      setActualPosition(newPosition);

      // Center the note relative to the trigger element
      const note = noteRef.current;
      if (newPosition === "top" || newPosition === "bottom") {
        // Center horizontally
        const triggerCenter = triggerRect.width / 2;
        const noteCenter = noteRect.width / 2;
        const leftOffset = triggerCenter - noteCenter;
        note.style.left = `${leftOffset}px`;
        note.style.top = "";
      } else {
        // Center vertically
        const triggerCenter = triggerRect.height / 2;
        const noteCenter = noteRect.height / 2;
        const topOffset = triggerCenter - noteCenter;
        note.style.top = `${topOffset}px`;
        note.style.left = "";
      }
    }
  }, [isVisible, position]);

  const handleMouseEnter = () => {
    if (trigger === "hover") setIsVisible(true);
  };

  const handleMouseLeave = () => {
    if (trigger === "hover") setIsVisible(false);
  };

  const handleClick = () => {
    if (trigger === "click") setIsVisible(!isVisible);
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsVisible(false);
    };

    if (isVisible && trigger === "click") {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isVisible, trigger]);

  const getPositionClasses = () => {
    const baseClasses = "absolute z-50";
    switch (actualPosition) {
      case "top":
        return `${baseClasses} bottom-full mb-2`;
      case "bottom":
        return `${baseClasses} top-full mt-2`;
      case "left":
        return `${baseClasses} right-full mr-2`;
      case "right":
        return `${baseClasses} left-full ml-2`;
      default:
        return `${baseClasses} bottom-full mb-2`;
    }
  };

  const getArrowClasses = () => {
    const arrowSize = "w-3 h-3";
    const baseClasses = `absolute ${arrowSize} bg-palette-1/90 backdrop-blur-xs border border-palette-4 transform rotate-45`;

    switch (actualPosition) {
      case "top":
        return `${baseClasses} top-full left-1/2 -translate-x-1/2 -translate-y-1/2 border-t-0 border-l-0`;
      case "bottom":
        return `${baseClasses} bottom-full left-1/2 -translate-x-1/2 translate-y-1/2 border-b-0 border-r-0`;
      case "left":
        return `${baseClasses} left-full top-1/2 -translate-x-1/2 -translate-y-1/2 border-l-0 border-b-0`;
      case "right":
        return `${baseClasses} right-full top-1/2 translate-x-1/2 -translate-y-1/2 border-r-0 border-t-0`;
      default:
        return `${baseClasses} top-full left-1/2 -translate-x-1/2 -translate-y-1/2 border-t-0 border-l-0`;
    }
  };

  return (
    <span className={cn("relative inline-block", className)}>
      <span
        ref={triggerRef}
        className={cn(
          "inline-flex items-center gap-1 cursor-help decoration-dotted underline-offset-2",
          trigger === "hover"
            ? "underline decoration-palette-4/60 hover:decoration-palette-4"
            : "",
          trigger === "click"
            ? "underline decoration-palette-4/60 hover:decoration-palette-4 active:decoration-palette-3"
            : "",
          isVisible ? "decoration-palette-3" : "",
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "text-palette-4 transition-colors duration-200 shrink-0",
            isVisible ? "text-palette-3" : "group-hover:text-palette-3",
          )}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      </span>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={noteRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={getPositionClasses()}
          >
            <div className="bg-palette-1/90 backdrop-blur-md border border-palette-4 rounded-lg shadow-lg max-w-sm w-max">
              <div className="px-4 py-3 text-sm text-palette-3 leading-relaxed">
                {note}
              </div>
              {/* Arrow */}
              <div className={getArrowClasses()} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default Noteworthy;
