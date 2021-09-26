import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

type NavigationItemProps = {
  icon: string;
  target: {
    pathname: string;
    query: any;
  };
  text: string;
};

const NavigationItem = ({
  icon,
  target,
  text,
}: NavigationItemProps): JSX.Element => {
  const router = useRouter();

  const isActive = router.pathname === target.pathname;

  return (
    <Link href={target}>
      <a
        className={`flex items-center mb-3 px-12 py-3 ${
          isActive ? "bg-theme_dawn_pink-light rounded" : "opacity-60"
        }`}
      >
        <Image src={icon} alt={text} layout="fixed" width={25} height={25} />
        <div className={`ml-4 font-bold`}>{text}</div>
      </a>
    </Link>
  );
};

export default NavigationItem;
