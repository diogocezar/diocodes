import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type HeaderImageProps = {
  className?: string;
  src: string;
  alt: string;
};

const HeaderImage = ({ className, src, alt, ...props }: HeaderImageProps) => {
  return (
    <div className="mb-12 h-[250px] w-[250px] items-center overflow-hidden rounded-full">
      <Image
        className={cn("", className)}
        src={src}
        width={500}
        height={500}
        alt={alt}
        {...props}
      />
    </div>
  );
};

HeaderImage.displayName = "Image";

export { HeaderImage };
