interface ButtonProps {
  label: string;
  isHollow?: boolean;
  className?: string;
  onClick: () => void;
}

function Button({
  label,
  onClick,
  className,
  isHollow = false,
}: ButtonProps): JSX.Element {
  return (
    <button
      type="button"
      className={
        className ??
        `px-2.5 py-1 rounded border-2 border-theme_blue ${
          isHollow ? "bg-white text-theme_blue" : "bg-theme_blue text-white"
        } transition-shadow hover:shadow-md`
      }
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
