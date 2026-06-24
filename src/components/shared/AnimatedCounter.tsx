"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const factor = 10 ** decimals;
    const controls = animate(0, value, {
      duration,
      ease: [0.21, 0.47, 0.32, 0.98],
      onUpdate: (latest) => setDisplay(Math.round(latest * factor) / factor),
    });
    return () => controls.stop();
  }, [isInView, value, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("ro-RO", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
