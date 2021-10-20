import { useEffect, useState } from "react";
import Image from "next/image";
import { useMachine } from "@xstate/react";
import toggleMachine from "@/context/machines/toggleMachine";
import { gql, useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { TASK_STATUS } from "src/constants/enums";
// Components
import Checkbox from "@/components/ui/Input/Checkbox/Checkbox";
import MenuBox from "../../Menu/MenuBox";
import Spinner from "@/components/ui/Spinner/Spinner";
// Images
import MenuIconSVG from "@/images/icons/svg/menu.svg";

const UPDATE_TASK = gql`
  mutation UpdateTask($id: uuid!, $status: Int) {
    update_tasks(where: { id: { _eq: $id } }, _set: { status: $status }) {
      affected_rows
    }
  }
`;

interface TaskListItemProps {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  status: TASK_STATUS;
  update: () => void;
}

function TaskListItem({
  id,
  title,
  description,
  tags,
  status,
  update,
}: TaskListItemProps): JSX.Element {
  const [current, send] = useMachine(toggleMachine);

  const [updateTask, { loading }] = useMutation(UPDATE_TASK, {
    onCompleted: () => {
      update();
    },
    onError: (error) => {
      toast.error("Something went wrong 😭");
      console.log(error?.message);
    },
  });

  return (
    <div className="flex flex-col ">
      <div className="grid grid-cols-tasklist-item bg-white py-3 my-1 rounded border border-theme_eagle">
        <div className="ml-5 flex items-center">
          {loading ? (
            <Spinner size={1} />
          ) : (
            <Checkbox
              id="yes"
              checked={status === TASK_STATUS.COMPLETE ? true : false}
              onClick={() =>
                updateTask({
                  variables: {
                    id: id,
                    status:
                      status === TASK_STATUS.COMPLETE
                        ? TASK_STATUS.INCOMPLETE
                        : TASK_STATUS.COMPLETE,
                  },
                })
              }
            />
          )}
        </div>
        <button
          className="flex flex-col sm:flex-row sm:items-center"
          onClick={() => send("TOGGLE")}
        >
          <div className="ml-1 mb-1 text-left text-lg sm:mb-0 sm:ml-0 ">
            {title}
          </div>
          <div className="flex items-center">
            {tags?.map((tag, index) => {
              return (
                <div
                  className="mx-1 px-2 py-0.5 text-sm text-white rounded bg-theme_green"
                  key={index}
                >
                  {tag}
                </div>
              );
            })}
          </div>
        </button>
        <div className="mr-4 flex items-center justify-center">
          <MenuBox
            role="menu"
            buttonComponent={
              <div>
                <Image
                  src={MenuIconSVG}
                  alt={title}
                  height={7}
                  width={27}
                  layout={"fixed"}
                />
              </div>
            }
            MenuItems={[{ label: "new task" }, { label: "edit task" }]}
          />
        </div>
      </div>
      {current.matches("active") && (
        <div
          className={`-mt-1 px-5 py-3 bg-white border border-t-0 border-dashed border-theme_eagle`}
        >
          {description}
        </div>
      )}
    </div>
  );
}

export default TaskListItem;
