import { cn } from "@/lib/utils";
import React from "react";

const Box = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  let joinClassName = "box ";
  joinClassName += cn(
    "bg-foreground border-4 border-black p-5 relative flex flex-col justify-start items-start max-w-full",
    className,
  );
  return (
    <div ref={ref} className={joinClassName}>
      {props.children}
    </div>
  );
});

Box.displayName = "Box";

export { Box };
