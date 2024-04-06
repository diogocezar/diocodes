import React from "react";
import { cn } from "@/lib/utils";

const DashboardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={cn("text-pink font-poppin text-4xl font-bold", className)}
    >
      {props.children}
    </h2>
  );
});

DashboardTitle.displayName = "DashboardTitle";

export { DashboardTitle };
