interface ListItemButtonProps {
  label: string;
  onClick: () => void;
}

const ListItemButton = ({
  label,
  onClick,
}: ListItemButtonProps): JSX.Element => {
  return (
    <button onClick={onClick} className="w-full flex items-center">
      <div className="h-px w-full bg-theme_eagle"></div>
      <div className="px-5 text-theme_eagle whitespace-nowrap">{label}</div>
      <div className="h-px w-full bg-theme_eagle"></div>
    </button>
  );
};

export default ListItemButton;
