import React from "react";
import Image from "next/image";

const MeImage = () => {
  return (
    <Image
      className="h-56 w-56 rounded-full border-[6px] border-background-dark me-img"
      src="/profile.jpg"
      width={400}
      height={400}
      alt="Foto do Diogão"
    />
  );
};

export { MeImage };
