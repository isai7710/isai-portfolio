"use client";
import { motion } from "motion/react";

export default function Divider({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center w-full ${className}`}>
      <motion.span
        className="w-2 h-2 bg-palette-1 rounded-sm mr-2" // Darker square, rounded corners
        initial={{ opacity: 0, scale: 0.5 }} // Start invisible and smaller
        animate={{ opacity: 1, scale: 1 }} // Fade in and scale to full size
        transition={{ delay: 0.6, duration: 0.3, ease: "easeOut" }} // Delay to appear after line starts
        aria-hidden="true" // Decorative element, hide from screen readers
      />

      <motion.div
        className="h-[2px] bg-palette-1 w-full" // Slightly thicker line, adapts to light/dark mode
        initial={{ width: 0 }} // Start with no width
        animate={{ width: "100%" }} // Animate to full width
        transition={{ duration: 0.8, ease: "easeOut" }} // Smooth reveal animation
        aria-hidden="true" // Decorative element
      />

      <motion.span
        className="w-2 h-2 bg-palette-1 rounded-sm ml-2" // Darker square, rounded corners
        initial={{ opacity: 0, scale: 0.5 }} // Start invisible and smaller
        animate={{ opacity: 1, scale: 1 }} // Fade in and scale to full size
        transition={{ delay: 0.6, duration: 0.3, ease: "easeOut" }} // Delay to appear after line starts
        aria-hidden="true" // Decorative element
      />
    </div>
  );
}
