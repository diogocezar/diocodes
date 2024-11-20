import { cn } from "@/lib/utils";
import React from "react";

const Title = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const joinClassName = cn(
    "text-foreground text-5xl mb-4 font-black tracking-tighter md:mb-12 md:text-6xl mt-5 lg:mt-10 lg:max-w-[70%]",
    className,
  );
  return (
    <h1 ref={ref} className={joinClassName}>
      {props.children}
    </h1>
  );
});

Title.displayName = "Title";

const SubTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const joinClassName = cn(
    "mb-5 mt-0 text-2xl font-bold text-pink-primary md:mb-10 md:text-3xl tracking-tighter lg:max-w-[70%]",
    className,
  );
  return (
    <h3 ref={ref} className={joinClassName}>
      {props.children}
    </h3>
  );
});

SubTitle.displayName = "SubTitle";

const SubSubTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  let joinClassName = "";
  joinClassName += cn(
    "text-foreground mb-8 mt-8 font-semibold text-3xl md:mt-14 md:text-5xl tracking-tighter lg:max-w-[70%]",
    className,
  );
  return (
    <h2 ref={ref} className={joinClassName}>
      {props.children}
    </h2>
  );
});

SubSubTitle.displayName = "SubSubTitle";

export { Title, SubTitle, SubSubTitle };
