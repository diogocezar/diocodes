import React from "react";
import { cn } from "@/lib/utils";

const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "min-h-screen flex-col items-center justify-between p-5 md:p-24 lg:p-36",
        className,
      )}
    >
      {props.children}
    </main>
  );
});

export { Container };
