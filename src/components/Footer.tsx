import React from "react";
import { cn } from "@/lib/utils";

const Footer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <footer ref={ref} className={cn("bg-green mt-10 w-full", className)}>
      <div className="flex flex-col items-center justify-between gap-6 p-5 pt-10 md:flex-row md:gap-0 md:p-24 md:pt-12 lg:p-12 lg:pt-14">
        {props.children}
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export { Footer };
