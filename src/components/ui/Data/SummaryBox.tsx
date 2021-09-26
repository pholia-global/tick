type InfoPoint = {
  name: string;
  status?: string;
};

type SummaryBoxType = {
  boxName: string;
  infoPoints: InfoPoint[];
  callbackLabel: string;
  callback: () => void;
};

const SummaryBox = ({
  boxName,
  infoPoints,
  callbackLabel,
  callback,
}: SummaryBoxType): JSX.Element => {
  return (
    <div className="flex flex-col w-full p-7 bg-white rounded">
      <div className="flex justify-between items-center mb-2">
        <div className="font-black text-2xl">{boxName}</div>
        <button
          className="bg-theme_blue py-1 px-5 font-bold text-white rounded-xl"
          onClick={callback}
        >
          {callbackLabel}
        </button>
      </div>
      <div className="font-light">
        {infoPoints.map((info: InfoPoint, index: number) => {
          return (
            <li className="mb-1" key={index}>
              {info?.name}
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default SummaryBox;
