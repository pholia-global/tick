interface GeneralInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  labelText?: string;
}

const GeneralInput = ({
  labelText,
  id,
  ...props
}: GeneralInputProps): JSX.Element => {
  return (
    <div className="flex flex-col">
      {labelText && (
        <label className="font-bold mb-1" htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        id={id}
        name={id}
        className="w-full h-full p-3 rounded-md border border-theme_dawn_pink bg-transparent"
        {...props}
      />
    </div>
  );
};

export default GeneralInput;
