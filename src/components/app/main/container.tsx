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
        "flex flex-col p-5 md:mb-0 md:items-start md:p-28 md:pt-20 md:pb-6 lg:p-44 lg:pt-24",
        className,
      )}
    >
      {props.children}
    </main>
  );
});

Container.displayName = "Container";

export { Container };
