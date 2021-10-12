import { useState, useReducer, useEffect } from "react";
import toast from "react-hot-toast";
// Reducers
import ArrayReducer from "@/context/reducers/arrayReducer";

type TagInputProps = {
  labelText: string;
  id: string;
  onSubmit: (dataList: string[]) => void;
};

const TagInput = ({ labelText, id, onSubmit }: TagInputProps): JSX.Element => {
  const [tagBuffer, setTagBuffer] = useState("" as string);
  const [state, dispatch] = useReducer(ArrayReducer, {
    dataList: [] as string[],
  });

  useEffect(() => {
    onSubmit(state?.dataList as string[]);
  }, [state, onSubmit]);

  return (
    <div className="flex flex-col w-full bg-white-900 rounded-md">
      {labelText && (
        <label className="font-bold mb-1" htmlFor={id}>
          {labelText}
        </label>
      )}
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
        id={id}
        className="w-full h-full p-3 rounded-md border border-theme_dawn_pink bg-transparent"
        type="text"
        placeholder="Type in tag and press Enter"
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
        onChange={(e) => {
          setTagBuffer(e.target.value);
        }}
        required={state.dataList.length === 0}
      />
    </div>
  );
};

export default TagInput;
