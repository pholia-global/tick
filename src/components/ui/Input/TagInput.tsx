import { useState, useReducer, useEffect } from "react";
import toast from "react-hot-toast";
// Reducers
import ArrayReducer from "@/context/reducers/arrayReducer";

type TagInputProps = {
  onSubmit: (dataList: string[]) => void;
};

const TagInput = ({ onSubmit }: TagInputProps): JSX.Element => {
  const [tagBuffer, setTagBuffer] = useState("" as string);
  const [state, dispatch] = useReducer(ArrayReducer, {
    dataList: [] as string[],
  });

  // const submitDataList = (): void => onSubmit(state?.dataList as string[]);
  // const submitDataList = (): void => console.log(state?.dataList);

  useEffect(() => {
    onSubmit(state?.dataList as string[]);
  }, [state, onSubmit]);

  return (
    <div className="flex flex-col w-full bg-white-900 rounded-md mb-4 md:w-96">
      <div className="flex flex-wrap">
        {state.dataList.map((tag: unknown, index: number) => {
          return (
            <button
              type="button"
              key={index}
              onClick={() => {
                dispatch({ type: "POP", payload: tag, index: index });
              }}
              className="p-2 mr-2 mb-2 bg-theme_blue text-white rounded"
            >
              {tag as string}
            </button>
          );
        })}
      </div>
      <input
        className="w-full h-full p-3 rounded-md border border-theme_dawn_pink bg-transparent"
        type="text"
        placeholder="tags"
        value={tagBuffer}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            if (!state.dataList.includes(tagBuffer)) {
              dispatch({ type: "PUSH", payload: tagBuffer });
              setTagBuffer("");
            } else {
              toast.error("tag already in list");
            }
          }
        }}
        // onBlur={submitDataList}
        onChange={(e) => {
          setTagBuffer(e.target.value);
        }}
        required={state.dataList.length === 0}
      />
    </div>
  );
};

export default TagInput;
