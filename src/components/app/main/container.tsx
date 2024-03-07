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
        "flex flex-col p-5 md:mb-0 md:items-start md:p-24 md:pb-6 md:pt-12",
        className,
      )}
    >
      {props.children}
    </main>
  );
});

Container.displayName = "Container";

export { Container };
