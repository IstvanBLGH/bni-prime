import { cn } from "@/lib/utils";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn("mx-auto max-w-7xl px-5 md:px-8", className)}>
      {children}
    </div>
  );
}
