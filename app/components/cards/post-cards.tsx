"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  BookOpen,
  Code2,
} from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { PostMetadata } from "@/app/lib/types";
import PostCardsSkeleton from "./post-cards-skeleton";
import Thumbnail from "@/app/components/media/thumbnail";

export default function PostCards({ posts }: { posts: PostMetadata[] }) {
  const [activeTab, setActiveTab] = useState<PostMetadata["type"]>("project");
  const filteredPosts = posts.filter((post) => post.type === activeTab);

  const tabs = [
    {
      id: "blog" as const,
      label: "Blog",
      icon: BookOpen,
    },
    {
      id: "project" as const,
      label: "Projects",
      icon: Code2,
    },
  ];

  return (
    <>
      {/* Enhanced Toggle Buttons */}
      <div className="relative mt-4">
        <div className="flex items-end gap-8 mb-2">
          <LayoutGroup>
            {/* Active tab always on left */}
            <motion.button
              key={`active-${activeTab}`}
              className="relative cursor-pointer z-20"
              onClick={() =>
                setActiveTab(activeTab === "blog" ? "project" : "blog")
              }
              layout
              transition={{ type: "spring", bounce: 0.25, duration: 0.8 }}
            >
              <motion.h1
                layoutId="activeTitle"
                className="text-left font-bold text-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {tabs.find((tab) => tab.id === activeTab)?.label}
                <span className="text-palette-4">.</span>
              </motion.h1>
            </motion.button>

            {/* Inactive tab always on right */}
            <motion.button
              key={`inactive-${activeTab === "blog" ? "project" : "blog"}`}
              className="relative cursor-pointer z-10"
              onClick={() =>
                setActiveTab(activeTab === "blog" ? "project" : "blog")
              }
              layout
              transition={{ type: "spring", bounce: 0.25, duration: 0.8 }}
            >
              <motion.h2
                layoutId="inactiveTitle"
                className="text-left font-medium text-3xl text-palette-2/20 hover:text-palette-2/40 hover:blur-0 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tabs.find((tab) => tab.id !== activeTab)?.label}
                <span>.</span>
              </motion.h2>
            </motion.button>
          </LayoutGroup>
        </div>

        <motion.p
          className="text-md text-left text-palette-2/80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Here&apos;s a little bit of what I&apos;ve been{" "}
          {activeTab === "blog" ? `writing about.` : `working on.`}
        </motion.p>
      </div>

      <Suspense fallback={<PostCardsSkeleton count={filteredPosts.length} />}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 px-2 md:px-0 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Suspense>
    </>
  );
}

function PostCard({ post }: { post: PostMetadata }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="group relative flex flex-col overflow-hidden rounded-xl border border-palette-1 bg-palette-2/5 backdrop-blur-md shadow-xl hover:shadow-xl transition-all duration-300 ease-in-out">
        {/* Subtle gradient overlay that appears on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-palette-4/5 via-transparent to-palette-3/5 opacity-0 pointer-events-none rounded-2xl"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <CardHeader className="p-0">
          <Thumbnail src={post.src} />
        </CardHeader>

        <Link href={`/blog/${post.slug}`} className="flex-grow">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-xl sm:text-2xl font-bold line-clamp-1">
                {post.title}
              </CardTitle>
              <div className="flex items-center text-xs text-palette-2/50">
                <Calendar className="w-3 h-3 mr-1" />
                {post.publishDate}
              </div>
            </div>

            <CardDescription className="text-sm text-palette-2 line-clamp-2 mb-3">
              {post.description}
            </CardDescription>

            {post.technologies && post.technologies.length > 0 && (
              <motion.div
                className="flex flex-wrap gap-2 mt-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {post.technologies.slice(0, 4).map((tag, index) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Badge className="px-2 py-0.5 text-palette-2/50 text-[10px] bg-palette-1/10 backdrop-blur-sm border border-palette-1/20 hover:bg-palette-4/20 hover:border-palette-4/30 transition-all duration-300">
                      {tag}
                    </Badge>
                  </motion.div>
                ))}
                {post.technologies.length > 4 && (
                  <Badge className="px-3 py-1 text-palette-2/50 text-[10px] bg-palette-1/5 backdrop-blur-sm border border-palette-1/10">
                    +{post.technologies.length - 4}
                  </Badge>
                )}
              </motion.div>
            )}
          </CardContent>
        </Link>

        <CardFooter className="flex items-center justify-between mt-2 p-3 text-sm">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={`/blog/${post.slug}`}
              className="flex items-center gap-2 px-4 py-2.5 border border-palette-1/30 rounded-lg bg-palette-1/20 backdrop-blur-md hover:bg-palette-4/20 hover:border-palette-4/40 transition-all duration-300 text-sm font-medium text-palette-3 hover:text-palette-4"
            >
              Read More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {post.src && post.src.link && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={post.src.link}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2.5 border border-palette-4/30 text-palette-4 rounded-lg hover:bg-palette-4/10 transition-all duration-300 text-sm font-medium backdrop-blur-sm"
              >
                View Demo
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
