import { useRouter } from "next/router";
import Image from "next/image";
// Images
import LeftArrowIcon from "@/images/icons/back.png";

type BackButtonProps = {
  pageName?: string;
};

const BackButton = ({ pageName }: BackButtonProps): JSX.Element => {
  const router = useRouter();
  return (
    <button type="button" onClick={() => router.back()}>
      <div className="flex items-center font-bold">
        <div className="flex items-center mr-2 opacity-50">
          <Image
            src={LeftArrowIcon}
            layout="fixed"
            height={18}
            width={18}
            alt="logout"
          />
        </div>
        <div className="text-black opacity-40">{pageName ?? ""}</div>
      </div>
    </button>
  );
};

export default BackButton;
