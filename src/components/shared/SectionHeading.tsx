"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  kicker?: string;
  title?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  kicker,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      {...fadeInUp}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {kicker && (
        <span className="mb-4 inline-block text-3xl font-semibold uppercase tracking-tight text-primary md:text-4xl lg:text-5xl">
          {kicker}
        </span>
      )}
      {description && (
        <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
