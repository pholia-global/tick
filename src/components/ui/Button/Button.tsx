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
      className={
        className ??
        `px-2.5 py-1 rounded border border-theme_blue ${
          isHollow ? "bg-white text-theme_blue" : "bg-theme_blue text-white"
        }`
      }
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
