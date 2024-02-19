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
        "flex min-h-screen flex-col items-center p-5 md:items-start md:p-24 md:pt-12 lg:p-36 lg:pt-14",
        className,
      )}
    >
      {props.children}
    </main>
  );
});

Container.displayName = "Container";

export { Container };
