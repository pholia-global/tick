import Image from "next/image";

interface ButtonProps {
  label?: string;
  image: StaticImageData;
  isHollow?: boolean;
  className?: string;
  onClick: () => void;
}

function ButtonWithIcon({
  label,
  image,
  onClick,
  className,
  isHollow = false,
}: ButtonProps): JSX.Element {
  return (
    <button
      type="button"
      className={`${className} px-2.5 py-1 flex items-center rounded whitespace-nowrap border-2 border-theme_blue ${
        isHollow ? "bg-white text-theme_blue" : "bg-theme_blue text-white"
      } transition-shadow hover:shadow-md`}
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
