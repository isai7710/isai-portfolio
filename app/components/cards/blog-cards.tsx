"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  SplitCard,
  SplitCardContent,
  SplitCardThumbnail,
} from "@/app/components/cards/split-card";
import Thumbnail from "@/app/components/media/thumbnail";
import { Badge } from "@/app/components/ui/badge";
import { PostMetadata } from "@/app/lib/types";
import { cn } from "@/app/lib/utils";
import { Calendar, ArrowRight } from "lucide-react";

function BlogCard({ post }: { post: PostMetadata }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative group rounded-lg bg-primary backdrop-blur-sm p-4"
    >
      <div className="absolute -top-0.5 -left-0.5 w-8 h-8 rounded-ss-xl border-l-4 border-t-4 border-palette-4"></div>
      <div className="absolute -bottom-0.5 -right-0.5 w-8 h-8 rounded-ee-xl border-r-4 border-b-4 border-[#F28D35]"></div>
      <SplitCard className="flex flex-col sm:flex-row gap-4 text-palette-3">
        <SplitCardThumbnail className="w-full sm:w-2/5 flex-shrink-0 border border-palette-1 rounded-md overflow-hidden">
          <Thumbnail src={post.src} autoPlay={true} className="h-full" />
        </SplitCardThumbnail>
        <Link href={`/blog/${post.slug}`}>
          <SplitCardContent className="w-full flex flex-col p-0.5">
            <div className="flex items-center gap-2 my-2">
              {post.technologies?.map((tag) => (
                <Badge
                  key={tag}
                  className="px-2 py-0 text-palette-2/50 text-[10px] bg-white/10 shadow-sm hover:bg-primary rounded-full"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <h2 className="text-left font-bold text-3xl mb-2">{post.title}</h2>
            <p className="inline-flex text-palette-2 text-sm">
              {post.description}
            </p>
            <div className="inline-flex items-center text-palette-4 text-xs mt-6">
              <Calendar size={14} className="mr-1" />
              <time dateTime={post.publishDate}>{post.publishDate}</time>
            </div>
          </SplitCardContent>
        </Link>
      </SplitCard>
    </motion.div>
  );
}

export default function BlogCards({ posts }: { posts: PostMetadata[] }) {
  const [activeTab, setActiveTab] = useState<PostMetadata["type"]>("project");

  const filteredPosts = posts.filter((post) => post.type === activeTab);

  return (
    <>
      <div className="flex justify-center mb-4">
        <div className="inline-flex text-sm text-palette-3">
          <button
            className={cn(
              "w-20 py-1 px-2 rounded-s-md border bg-palette-3/10 backdrop-blur-sm transition-colors duration-200",
              activeTab === "blog" ? "border-palette-4" : "border-palette-1",
            )}
            onClick={() => setActiveTab("blog")}
          >
            Blog
          </button>
          <button
            className={cn(
              "w-24 py-1 px-2 rounded-e-md border bg-palette-3/10 backdrop-blur-sm transition-colors duration-200",
              activeTab === "project" ? "border-palette-4" : "border-palette-1",
            )}
            onClick={() => setActiveTab("project")}
          >
            Projects
          </button>
        </div>
      </div>
      <ul className="flex flex-col gap-4" role="list">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="space-y-6"
          >
            {filteredPosts.map((post) => (
              <li key={post.slug}>
                <BlogCard post={post} />
              </li>
            ))}
          </motion.div>
        </AnimatePresence>
      </ul>
    </>
  );
}
