"use client";
import {
  SplitCard,
  SplitCardContent,
  SplitCardHeader,
  SplitCardBody,
} from "@/app/components/cards/split-card";
import EmailToast from "@/app/components/ui/email-toast";
import { useState } from "react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

export default function About() {
  const [showTLDR, setShowTLDR] = useState(true);

  const toggleView = () => {
    setShowTLDR((prev) => !prev);
  };

  const variants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <SplitCard className="my-24 text-palette-2">
      <SplitCardContent side="all">
        <SplitCardHeader className="flex justify-between items-center mb-2">
          <motion.h1
            className="text-left md:text-center font-bold text-3xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            About the site<span className="text-palette-4">.</span>
          </motion.h1>
          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={toggleView}
              className={cn(
                showTLDR ? "border border-palette-4" : "",
                "text-sm rounded-md px-2 py-1 bg-palette-2/10 backdrop-blur-md",
              )}
            >
              TL;DR
            </button>
            <button
              onClick={toggleView}
              className={cn(
                !showTLDR ? "border border-palette-4" : "",
                "text-sm rounded-md px-2 py-1 bg-palette-2/10 backdrop-blur-md",
              )}
            >
              Long Story
            </button>
          </motion.div>
        </SplitCardHeader>
        <SplitCardBody className="flex flex-col gap-3">
          <AnimatePresence mode="wait">
            {showTLDR ? (
              <motion.div
                key="tldr"
                variants={variants}
                initial="enter"
                animate="center"
                transition={{ duration: 0.3 }}
              >
                <p className="text-md text-pretty text-left mb-1">
                  Thanks for stopping by! I&apos;ve always wanted a space to
                  share my projects, notes, and thoughts on various topics from
                  my education, hobbies, and life experiences, so here it is :)
                  Feel free to reach out!
                  <EmailToast className="inline-flex gap-1 text-md text-palette-4 hover:underline focus:outline-hidden items-center">
                    isaisanchezcc@gmail.com
                  </EmailToast>
                </p>
                <p className="text-md text-pretty text-left">
                  The site was built with{" "}
                  <Link
                    href="https://nextjs.org/"
                    className="text-palette-4 hover:underline"
                  >
                    Next.js
                  </Link>{" "}
                  and uses Typescript, Tailwind CSS for styling, and some simple
                  and neat{" "}
                  <Link
                    href="https://ui.shadcn.com/"
                    className="text-palette-4 hover:underline"
                  >
                    shadcn
                  </Link>{" "}
                  components too. Source code is{" "}
                  <Link
                    href="https://github.com/isai7710/isai-portfolio"
                    className="text-palette-4 hover:underline"
                  >
                    here
                  </Link>
                  .
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="long-story"
                className="text-md text-pretty text-left flex flex-col gap-2"
                variants={variants}
                initial="enter"
                animate="center"
                transition={{ duration: 0.3 }}
              >
                <p>Thanks for stopping by to my personal website!</p>
                <p>
                  Like I said, I&apos;ve always wanted an online space dedicated
                  to sharing my efforts, thoughts, and reflections on everything
                  that I&apos;ve been fortunate enough to experience throughout
                  my schooling at BYU and life growing up in Utah.
                </p>
                <p>
                  Here, you&apos;ll find some of my projects, notes, and blog
                  posts, covering everything from how I set up my Minolta film
                  camera to the intricacies of the 2nd Law of Thermodynamics and
                  everything in between. I&apos;d love to hear your feedback or
                  chat about any of these topics, so feel free to reach out!
                  <EmailToast className="inline-flex gap-1 text-md text-palette-4 hover:underline focus:outline-hidden items-center">
                    isaisanchezcc@gmail.com
                  </EmailToast>
                </p>
                <p>
                  The site was built with{" "}
                  <Link
                    href="https://nextjs.org/"
                    className="text-palette-4 hover:underline"
                  >
                    Next.js
                  </Link>{" "}
                  and uses Typescript, Tailwind CSS for styling, and some simple
                  and neat{" "}
                  <Link
                    href="https://ui.shadcn.com/"
                    className="text-palette-4 hover:underline"
                  >
                    shadcn
                  </Link>{" "}
                  components too. Source code is{" "}
                  <Link
                    href="https://github.com/isai7710/isai-portfolio"
                    className="text-palette-4 hover:underline"
                  >
                    here
                  </Link>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </SplitCardBody>
      </SplitCardContent>
    </SplitCard>
  );
}
