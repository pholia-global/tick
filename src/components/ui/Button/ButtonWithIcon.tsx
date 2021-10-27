import Image from "next/image";

export enum BUTTON_TYPE {
  DEFAULT = 1,
  SUCCESS,
  DANGER,
}

interface ButtonProps {
  label?: string;
  type?: BUTTON_TYPE;
  image: StaticImageData;
  isHollow?: boolean;
  className?: string;
  onClick: () => void;
}

function ButtonWithIcon({
  label,
  type = BUTTON_TYPE.DEFAULT,
  image,
  onClick,
  className,
  isHollow = false,
}: ButtonProps): JSX.Element {
  const borderStyle =
    type === BUTTON_TYPE.DEFAULT
      ? "border-theme_blue"
      : type === BUTTON_TYPE.DANGER
      ? "border-red-600"
      : "border-green-600";

  const bgStyle = isHollow
    ? "bg-white"
    : type === BUTTON_TYPE.DEFAULT
    ? "bg-theme_blue"
    : type === BUTTON_TYPE.DANGER
    ? "bg-red-600"
    : "bg-green-600";

  const textStyle =
    type === BUTTON_TYPE.DEFAULT
      ? isHollow
        ? "text-theme_blue"
        : "text-white"
      : type === BUTTON_TYPE.DANGER
      ? "text-red-600"
      : "text-green-600";
  return (
    <button
      type="button"
      className={`${className} w-full px-2.5 py-1 flex items-center rounded whitespace-nowrap border-2 ${borderStyle} ${bgStyle} ${textStyle} transition-shadow hover:shadow-md`}
      onClick={onClick}
    >
      <div className="mr-1 flex items-center">
        <Image src={image} alt={label} width={14} height={14} layout="fixed" />
      </div>

      {label}
    </button>
  );
}

export default ButtonWithIcon;
