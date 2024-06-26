import React from "react";

const Title = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h1
      ref={ref}
      className="text-foreground text-5xl mb-4 font-black tracking-tighter font-poppins md:mb-12 md:text-6xl mt-5 lg:mt-10 lg:max-w-[70%]"
    >
      {props.children}
    </h1>
  );
});

Title.displayName = "Title";

const SubTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className="font-poppins mb-4 mt-2 text-2xl font-black md:mb-12 md:text-4xl tracking-tighter"
    >
      {props.children}
    </h3>
  );
});

SubTitle.displayName = "SubTitle";

const SubSubTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className="text-border-black text-green font-black font-poppins mb-8 mt-8 text-3xl md:mt-14 md:text-5xl tracking-tighter"
    >
      {props.children}
    </h2>
  );
});

SubSubTitle.displayName = "SubSubTitle";

export { Title, SubTitle, SubSubTitle };
