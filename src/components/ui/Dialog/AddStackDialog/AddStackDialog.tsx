import { useState, useReducer, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import Image from "next/image";
// Components
import Spinner from "../../Spinner/Spinner";
import toast from "react-hot-toast";
import DialogBox from "../Dialog";
// Reducers
import ArrayReducer from "src/context/reducers/arrayReducer";
// Types
type StackType = {
  id: string;
  image_svg_url: string;
  name: string;
  type: string;
};

type AddStackDialogProps = {
  type: string;
  stack: StackType[];
  project: string;
  update: () => void;
};
// Query
const GET_STACKS = gql`
  query GetStacks($type: String!) {
    technologies(where: { type: { _eq: $type } }) {
      id
      image_svg_url
      name
    }
  }
`;

const RESET_STACK = gql`
  mutation ResetStack($project_id: bigint!, $type: String!) {
    delete_project_technology(
      where: {
        project_id: { _eq: $project_id }
        technology: { type: { _eq: $type } }
      }
    ) {
      affected_rows
    }
  }
`;

const INSERT_STACK = gql`
  mutation InsertStack($stack: [project_technology_insert_input!]!) {
    insert_project_technology(objects: $stack) {
      affected_rows
    }
  }
`;

function AddStackDialog({
  type,
  stack,
  project,
  update,
}: AddStackDialogProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [state, dispatch] = useReducer(ArrayReducer, {
    dataList: [] as StackType[],
  });

  const { loading, data } = useQuery(GET_STACKS, {
    variables: { type: type },
  });

  const [resetStack] = useMutation(RESET_STACK);
  const [confirmStack] = useMutation(INSERT_STACK, {
    onCompleted: () => closeModal(),
  });

  useEffect(() => {
    dispatch({ type: "SET", payload: stack });
  }, [stack]);

  const isInStack = (tech: StackType) => {
    const stackArrayLen = state.dataList.length;
    let posInArray = -1;

    for (let i = 0; i < stackArrayLen; i++) {
      if ("name" in (state.dataList[i] as StackType)) {
        const arrayEl = state.dataList[i] as StackType;
        if (arrayEl.name === tech.name) {
          posInArray = i;
          break;
        }
      }
    }

    return posInArray;
  };

  const handleClick = (tech: StackType) => {
    const elPos = isInStack(tech);
    if (elPos !== -1) {
      dispatch({ type: "POP", payload: tech, index: elPos });
    } else {
      dispatch({ type: "PUSH", payload: tech });
    }
  };

  const handleStackConfirm = () => {
    toast.promise(
      resetStack({
        variables: { project_id: parseInt(project), type: type },
      })
        .then(() => {
          if (state?.dataList) {
            const newList = state.dataList.map((tech: any) => {
              return {
                project_id: project,
                technology_id: tech.id,
              };
            });
            confirmStack({
              variables: { stack: newList },
            });
          }
        })
        .then(() => {
          update();
        }),
      {
        loading: "Updating Stack...",
        success: <b>Stack Updated!</b>,
        error: <b>Error! Stack Updation failed</b>,
      }
    );
  };

  return (
    <>
      <button onClick={openModal} className="flex flex-col items-center">
        <div className="flex items-center mb-1 p-4 rounded-full border border-theme_eagle">
          <Image
            src="/images/icons/add_item.png"
            alt={`Add tech icon`}
            height={24}
            width={24}
          />
        </div>
        Add
      </button>

      <DialogBox
        title={"Select Technologies"}
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <div className="flex flex-col">
          <div className="flex flex-col max-h-96 overflow-y-auto">
            {loading ? (
              <div className="mt-2">
                <Spinner size={1} />
              </div>
            ) : (
              data?.technologies?.map((tech: StackType, index: number) => {
                const isInList = isInStack(tech) !== -1;
                return (
                  <button
                    onClick={() => handleClick(tech)}
                    className={`${
                      isInList
                        ? "border-2 border-theme_green"
                        : "border border-black-fifteen_op"
                    } flex justify-between py-2 px-3 mb-1 rounded`}
                    key={index}
                  >
                    {tech.name}
                  </button>
                );
              })
            )}
          </div>
          <div className="grid grid-cols-perc-30-2 mt-2 gap-1">
            <button
              type="button"
              onClick={closeModal}
              className="py-3 px-1 border-2 border-theme_blue rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleStackConfirm}
              className="py-3 bg-theme_blue text-white rounded"
            >
              Confirm
            </button>
          </div>
        </div>
      </DialogBox>
    </>
  );
}

export default AddStackDialog;
