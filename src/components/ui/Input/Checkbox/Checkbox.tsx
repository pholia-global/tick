interface GeneralInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  checked: boolean;
  labelText?: string;
}

const CheckBox = ({
  labelText,
  id,
  checked,
  ...props
}: GeneralInputProps): JSX.Element => {
  return (
    <div className="w-full flex items-center">
      <input
        id={id}
        name={id}
        type="checkbox"
        role={"checkbox"}
        className="opacity-0 absolute h-5 w-5 cursor-pointer"
        defaultChecked={checked}
        {...props}
      />
      <div className="w-5 h-5 flex flex-shrink-0 justify-center items-center bg-white border-2 rounded border-theme_blue focus-within:border-theme_blue">
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            data-testid="checkbox-check-img"
            style={{ fill: "rgba(70, 70, 96, 1)", transform: ";msFilter:" }}
          >
            <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
          </svg>
        )}
      </div>
      {labelText && (
        <label className="font-bold" htmlFor={id}>
          {labelText}
        </label>
      )}
    </div>
  );
};

export default CheckBox;
