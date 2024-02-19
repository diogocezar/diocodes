import React from "react";
import { cn } from "@/lib/utils";

const Paragraph = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <h1
      ref={ref}
      className={cn("text-foreground text-md mb-6 md:text-left", className)}
    >
      {props.children}
    </h1>
  );
});

Paragraph.displayName = "Paragraph";

export { Paragraph };
