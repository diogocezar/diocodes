import { MeLogo } from "@/components/app/main/image";
import {
  TwitterLogo,
  InstagramLogo,
  TiktokLogo,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react/dist/ssr";

import { Calendar, User } from "solar-icon-set";

import Image from "next/image";

type ButtonProps = {
  children: string;
  href: string;
  icon?: JSX.Element;
};

const Button = (props: ButtonProps) => {
  return (
    <a href={props.href} target="_blank">
      <button className="me-button bg-pink-primary items-center text-foreground uppercase font-bold hover:bg-foreground hover:text-background-dark transition-all gap-2 justify-center text-sm">
        {props.icon}
        {props.children}
      </button>
    </a>
  );
};

export default function MePage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4 relative">
      <MeLogo />
      <Button href="https://diocodes.dev" icon={<Calendar size={24} />}>
        Agende sua mentoria
      </Button>
      <Button href="https://diogocezar.dev" icon={<User size={24} />}>
        Portifólio
      </Button>
      <Button
        href="https://twitter.com/diogocezar"
        icon={<TwitterLogo size={24} weight="regular" />}
      >
        Twitter
      </Button>
      <Button
        href="https://www.instagram.com/diocodes"
        icon={<InstagramLogo size={24} weight="regular" />}
      >
        Instagram
      </Button>
      <Button
        href="https://www.tiktok.com/@diogocodes"
        icon={<TiktokLogo size={24} weight="regular" />}
      >
        TikTok
      </Button>
      <Button
        href="https://www.linkedin.com/in/diogocezar/"
        icon={<LinkedinLogo size={24} weight="regular" />}
      >
        Linkedin
      </Button>
      <Button
        href="https://github.com/diogocezar"
        icon={<GithubLogo size={24} weight="regular" />}
      >
        Github
      </Button>
    </div>
  );
}
