"use client";

import { Card } from "@/app/components/ui/card";
import {
  GraduationCap,
  Code,
  Braces,
  Cpu,
  Cog,
  Mail,
  Atom,
  MapPin,
} from "lucide-react";
import EmailToast from "../ui/email-toast";
import Arduino from "@/app/components/media/icons/arduino";
import React from "@/app/components/media/icons/react";
import NextJS from "@/app/components/media/icons/next-js";
import Typescript from "@/app/components/media/icons/typescript";
import TailwindCSS from "@/app/components/media/icons/tailwindcss";
import Cpp from "../media/icons/cpp";
import Python from "../media/icons/python";
import Numpy from "../media/icons/numpy";
import Raspbi from "../media/icons/raspbi";
import SolidWorks from "../media/icons/solidworks";
import { motion, type Variants } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Delay between each child animation
      delayChildren: 0.2, // Initial delay before children start animating
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth animation
    },
  },
};

export default function BentoGrid() {
  return (
    <div className="w-full mx-auto py-4 transition-colors duration-1000 ease-in-out text-palette-2 my-10 md:my-20">
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the component is visible
      >
        {/* About Card */}
        <motion.div
          variants={cardVariants}
          className="col-span-full md:col-span-4 row-span-2 rounded-lg px-4 py-6 bg-palette-2/10 backdrop-blur-md flex flex-col justify-between border-none shadow-xl"
        >
          <div className="flex items-center mb-2">
            <Atom className="h-7 w-7 mr-2" />
            <h2 className="text-2xl font-bold">
              About Me<span className="text-palette-4">.</span>
            </h2>
          </div>
          <p className="text-sm">
            I grew up playing soccer & piano in the beautiful state of Utah.
            Throughout my education I was blessed to have mentors that
            challenged me and sparked my interest in subjects relating to
            engineering. It was tough but I loved the journey.
            <br /> Some of my hobbies include taking pictures with my film
            camera, chess, skateboarding, hiking and reading.
          </p>
        </motion.div>

        {/* Education Card */}
        <motion.div
          variants={cardVariants}
          className="col-span-full sm:col-span-4 bg-primary border border-palette-1 rounded-lg p-4 shadow-xl"
        >
          <div className="flex items-center mb-2">
            <GraduationCap className="h-6 w-6 text-palette-4 mr-2" />
            <h3 className="text-md lg:text-lg font-semibold whitespace-nowrap">
              B.S. Mechanical Engineering
            </h3>
          </div>
          <div className="flex items-center justify-between text-sm">
            <p>Brigham Young University</p>
            <p className="flex items-center gap-1">
              <MapPin className="w-4 h-4 inline-block" />
              Provo, UT
            </p>
          </div>
        </motion.div>

        {/* Coding Card */}
        <motion.div
          variants={cardVariants}
          className="col-span-1 md:col-span-2 bg-primary border border-palette-1 p-4 rounded-lg shadow-xl"
        >
          <div className="flex items-center mb-2">
            <Braces className="h-5 w-5 mr-2" />
            <h3 className="text-lg font-semibold">Coding</h3>
          </div>
          <div className="flex gap-1 justify-start">
            <Cpp className="inline-block w-9 h-9 text-palette-3 bg-white/10 backdrop-blur-xs p-2 rounded-md" />
            <Python className="inline-block w-9 h- text-palette-3 bg-white/10 backdrop-blur-xs p-2 rounded-md" />
            <Numpy className="inline-block w-9 h-9 text-palette-3 bg-white/10 backdrop-blur-xs p-2 rounded-md" />
          </div>
        </motion.div>

        {/* Web Development Card */}
        <motion.div
          variants={cardVariants}
          className="col-span-1 md:col-span-2 p-4 bg-primary border border-palette-1 rounded-lg shadow-xl"
        >
          <div className="flex items-center mb-2">
            <Code className="h-5 w-5 mr-2" />
            <h3 className="text-lg font-semibold">Web Dev</h3>
          </div>
          <div className="flex gap-1 justify-start">
            <NextJS className="inline-block w-9 h-9 text-palette-3 bg-white/10 backdrop-blur-xs p-2 rounded-md" />
            <Typescript className="inline-block w-9 h-9 text-palette-3 bg-white/10 backdrop-blur-xs p-2 rounded-md" />
            <TailwindCSS className="inline-block w-9 h-9 text-palette-3 bg-white/10 backdrop-blur-xs p-2 rounded-md" />
          </div>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          variants={cardVariants}
          className="col-span-full sm:col-span-4 order-1 md:order-0 p-4 bg-primary border border-palette-1 rounded-lg shadow-xl"
        >
          <div className="flex items-center mb-2">
            <Mail className="h-5 w-5 mr-2 text-palette-4" />
            <h3 className="text-lg font-semibold">Contact Me</h3>
          </div>
          <p className="text-sm text-balance">
            Shoot me an email!
            <EmailToast className="inline-flex gap-1 text-sm text-palette-4 hover:underline focus:outline-hidden">
              isaisanchezcc@gmail.com
            </EmailToast>
          </p>
        </motion.div>

        {/* Hardware Card */}
        <motion.div
          variants={cardVariants}
          className="col-span-1 md:col-span-2 p-4 bg-primary border border-palette-1 rounded-lg shadow-xl"
        >
          <div className="flex items-center mb-2">
            <Cpu className="h-5 w-5 mr-2" />
            <h3 className="text-lg font-semibold">Hardware</h3>
          </div>
          <div className="flex space-x-1">
            <Arduino className="inline-block w-9 h-9 text-palette-3 bg-white/10 backdrop-blur-xs p-1 rounded-md" />
            <Raspbi className="inline-block w-9 h-9 text-palette-3 bg-white/10 backdrop-blur-xs p-1 rounded-md" />
          </div>
        </motion.div>

        {/* CAD Card */}
        <motion.div
          variants={cardVariants}
          className="col-span-1 md:col-span-2 p-4 bg-primary border border-palette-1 rounded-lg shadow-xl"
        >
          <div className="flex items-center mb-2">
            <Cog className="h-5 w-5 mr-2" />
            <h3 className="text-lg font-semibold">CAD</h3>
          </div>
          <div className="flex space-x-2">
            <SolidWorks className="inline-block w-9 h-9 text-palette-3 bg-white/10 backdrop-blur-xs p-2 rounded-md" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
