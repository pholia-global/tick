import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";
// Images
import GenericPlaceholderImage from "@/images/placeholders/generic_placeholder.png";

const Avatar = (): JSX.Element => {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center mt-4 mb-10">
      <div className="h-24 w-24 mb-5 rounded-full shadow-sm">
        <Image
          className="rounded-full"
          src={user?.picture ?? GenericPlaceholderImage}
          alt="User profile icon"
          width={96}
          height={96}
        />
      </div>
      <div className="font-primary font-bold text-2xl">{user?.name}</div>
    </div>
  );
};

export default Avatar;
