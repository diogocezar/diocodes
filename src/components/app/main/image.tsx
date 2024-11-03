import React from "react";
import Image from "next/image";

const MeImage = () => {
  return (
    <Image
      className="h-56 w-56 md:h-80 md:w-80"
      src="./assets/images/perfil/avatar.svg"
      width={400}
      height={400}
      alt="Avatar do Diogão"
    />
  );
};

export { MeImage };
