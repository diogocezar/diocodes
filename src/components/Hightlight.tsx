import React from "react";
import { cn } from "@/lib/utils";

const Hightlight = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <span ref={ref} className={cn("text-purple", className)}>
      {props.children}
    </span>
  );
});

export { Hightlight };
