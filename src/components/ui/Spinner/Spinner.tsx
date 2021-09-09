enum SPINNER_SIZE {
  SMALL = 1,
  MEDIUM,
  LARGE,
}

type SpinnerProps = {
  size: SPINNER_SIZE;
};

const Spinner = ({ size }: SpinnerProps) => {
  return (
    <div className=" flex justify-center items-center">
      <div
        className={`${
          size === SPINNER_SIZE.SMALL
            ? "h-12 w-12"
            : size === SPINNER_SIZE.MEDIUM
            ? "h-24 w-24"
            : "h-32 w-32"
        } loader ease-linear rounded-full border-8 border-t-8 border-gray-200`}
      ></div>
    </div>
  );
};

export default Spinner;
