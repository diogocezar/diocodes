import Image from "next/image";
import {
  Calendar,
  AddressBook,
  TwitterLogo,
  InstagramLogo,
  TiktokLogo,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react/dist/ssr";

type ButtonProps = {
  children: string;
  href: string;
  icon?: JSX.Element;
};

const MeImage = () => {
  return (
    <div className="relative">
      <Image
        className="h-60 w-60 rounded-full border-[6px] border-background-dark me-img"
        src="/profile.jpg"
        width={400}
        height={400}
        alt="Foto do Diogão"
      />
    </div>
  );
};

const Button = (props: ButtonProps) => {
  return (
    <a href={props.href} target="_blank">
      <button className="me-button hover:bg-green transition-all gap-2 font-medium">
        {props.icon}
        {props.children}
      </button>
    </a>
  );
};

export default function MePage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4 relative">
      <MeImage />
      <h1 className="text-border-black text-green text-5xl font-poppins mb-4 font-black tracking-tighter">
        Diogão
      </h1>
      <Button href="https://diocodes.dev" icon={<Calendar size={22} />}>
        Agende sua mentoria
      </Button>
      <Button href="https://diogocezar.dev" icon={<AddressBook size={22} />}>
        Conheça meu portifólio
      </Button>
      <Button
        href="https://twitter.com/diogocezar"
        icon={<TwitterLogo size={22} weight="fill" />}
      >
        Twitter
      </Button>
      <Button
        href="https://www.instagram.com/diocodes"
        icon={<InstagramLogo size={22} weight="fill" />}
      >
        Instagram
      </Button>
      <Button
        href="https://www.tiktok.com/@diogocodes"
        icon={<TiktokLogo size={22} weight="fill" />}
      >
        TikTok
      </Button>
      <Button
        href="https://www.linkedin.com/in/diogocezar/"
        icon={<LinkedinLogo size={22} weight="fill" />}
      >
        Linkedin
      </Button>
      <Button
        href="https://github.com/diogocezar"
        icon={<GithubLogo size={22} weight="fill" />}
      >
        Github
      </Button>
    </div>
  );
}
