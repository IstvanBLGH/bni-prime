import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  width: number;
  height: number;
  label?: string;
  className?: string;
  aspectRatio?: string;
  rounded?: boolean;
  /** Smaller icon + dimensions-only label, for tight spots like circular avatars. */
  compact?: boolean;
}

export function ImagePlaceholder({
  width,
  height,
  label,
  className,
  aspectRatio,
  rounded = true,
  compact = false,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center border border-[#D2D2D7] bg-[#F5F5F7]",
        "font-medium text-[#86868B]",
        rounded && "rounded-2xl",
        className
      )}
      style={{ aspectRatio: aspectRatio || `${width}/${height}` }}
      title={`${width}×${height}px${label ? ` — ${label}` : ""}`}
    >
      {compact ? (
        <>
          <ImageIcon className="h-5 w-5 opacity-40" aria-hidden="true" />
          <span className="mt-1 text-[0.6rem] leading-none opacity-60">
            {width}×{height}
          </span>
        </>
      ) : (
        <>
          <ImageIcon className="mb-3 h-12 w-12 opacity-40" aria-hidden="true" />
          <span className="text-sm">{label || "Imagine"}</span>
          <span className="mt-1 text-xs opacity-60">
            {width}×{height}px
          </span>
        </>
      )}
    </div>
  );
}
