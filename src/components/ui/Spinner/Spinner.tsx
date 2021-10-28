enum SPINNER_SIZE {
  SMALL = 1,
  MEDIUM,
  LARGE,
}

type SpinnerProps = {
  size: SPINNER_SIZE;
};

const Spinner = ({ size }: SpinnerProps): JSX.Element => {
  return (
    <div className=" flex justify-center items-center">
      <div
        className={`${
          size === SPINNER_SIZE.SMALL
            ? "h-6 w-6 border-4 border-t-4"
            : size === SPINNER_SIZE.MEDIUM
            ? "h-24 w-24 border-8 border-t-8"
            : "h-32 w-32 border-8 border-t-8"
        } loader ease-linear rounded-full border-gray-200`}
      ></div>
    </div>
  );
};

export default Spinner;
