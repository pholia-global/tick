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
      className={
        className ??
        `px-2.5 py-1 flex items-center rounded border border-theme_blue ${
          isHollow ? "bg-white text-theme_blue" : "bg-theme_blue text-white"
        }`
      }
      onClick={onClick}
    >
      <div className="mr-1">
        <Image src={image} alt={label} width={10} height={10} />
      </div>

      {label}
    </button>
  );
}

export default ButtonWithIcon;
