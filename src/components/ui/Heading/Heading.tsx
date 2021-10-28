interface HeadingProps {
  title: string;
}

function Heading({ title }: HeadingProps): JSX.Element {
  return (
    <div>
      <div className="text-xl mb-1">{title}</div>
      <div className="h-0.5 w-9/12 bg-theme_eagle"></div>
    </div>
  );
}

export default Heading;
