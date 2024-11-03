import { MeImage } from "@/components/app/main/image";
import {
  Calendar,
  AddressBook,
  TwitterLogo,
  InstagramLogo,
  TiktokLogo,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react/dist/ssr";

import Image from "next/image";

type ButtonProps = {
  children: string;
  href: string;
  icon?: JSX.Element;
};

const Button = (props: ButtonProps) => {
  return (
    <a href={props.href} target="_blank">
      <button className="me-button bg-pink-primary text-foreground uppercase font-bold hover:bg-foreground hover:text-background-dark transition-all gap-2 justify-center">
        {props.icon}
        {props.children}
      </button>
    </a>
  );
};

export default function MePage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-3 relative">
      <MeImage />
      <Image
        className="h-[120px] inline mt-3 mb-3"
        src="assets/images/logo/logo-simple.svg"
        width={200}
        height={120}
        alt="Logo do DioGO"
      />
      <Button href="https://diocodes.dev" icon={<Calendar size={24} />}>
        Agende sua mentoria
      </Button>
      <Button href="https://diogocezar.dev" icon={<AddressBook size={24} />}>
        Portifólio
      </Button>
      <Button
        href="https://twitter.com/diogocezar"
        icon={<TwitterLogo size={24} weight="fill" />}
      >
        Twitter
      </Button>
      <Button
        href="https://www.instagram.com/diocodes"
        icon={<InstagramLogo size={24} weight="fill" />}
      >
        Instagram
      </Button>
      <Button
        href="https://www.tiktok.com/@diogocodes"
        icon={<TiktokLogo size={24} weight="fill" />}
      >
        TikTok
      </Button>
      <Button
        href="https://www.linkedin.com/in/diogocezar/"
        icon={<LinkedinLogo size={24} weight="fill" />}
      >
        Linkedin
      </Button>
      <Button
        href="https://github.com/diogocezar"
        icon={<GithubLogo size={24} weight="fill" />}
      >
        Github
      </Button>
    </div>
  );
}
