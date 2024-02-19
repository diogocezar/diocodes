import React from "react";
import { cn } from "@/lib/utils";

const Paragraph = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <h1 ref={ref} className={cn("text-foreground mb-6", className)}>
      {props.children}
    </h1>
  );
});

Paragraph.displayName = "Paragraph";

export { Paragraph };
