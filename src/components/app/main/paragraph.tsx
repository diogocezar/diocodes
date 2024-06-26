import React from "react";
import { cn } from "@/lib/utils";

const Paragraph = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        "text-background-dark text-md mb-6 md:text-left tracking-tighter",
        className,
      )}
    >
      {props.children}
    </p>
  );
});

Paragraph.displayName = "Paragraph";

export { Paragraph };
