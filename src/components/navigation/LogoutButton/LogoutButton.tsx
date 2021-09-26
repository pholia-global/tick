import Link from "next/link";
import Image from "next/image";
// Images
import LogoutIcon from "@/images/icons/logout2.png";

const LogoutButton = (): JSX.Element => {
  return (
    <Link href="/api/auth/logout">
      <a className="flex items-center font-bold text-lg text-black-sixty_op">
        <div className="flex items-center mr-2">
          <Image
            src={LogoutIcon}
            layout="fixed"
            height={14}
            width={14}
            alt="logout"
          />
        </div>
        Logout
      </a>
    </Link>
  );
};

export default LogoutButton;
