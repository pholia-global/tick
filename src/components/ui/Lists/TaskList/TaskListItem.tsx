import { useState } from "react";
import Image from "next/image";
import { useMachine } from "@xstate/react";
import toggleMachine from "@/context/machines/toggleMachine";
import { gql, useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { TASK_STATUS } from "src/constants/enums";
// Components
import Checkbox from "@/components/ui/Input/Checkbox/Checkbox";
import PopoverBox from "../../Popover/PopoverBox";
import Spinner from "@/components/ui/Spinner/Spinner";
import UpdateTaskDialog from "../../Dialog/TaskDialogs/UpdateTaskDialog/UpdateTaskDialog";
import DeleteTaskDialog from "../../Dialog/TaskDialogs/DeleteTaskDialog/DeleteTaskDialog";
import ButtonWithIcon, { BUTTON_TYPE } from "../../Button/ButtonWithIcon";
// Images
import MenuIconSVG from "@/images/icons/svg/menu.svg";
import EditIcon from "@/images/icons/svg/edit-blue.svg";
import TrashIcon from "@/images/icons/svg/trash-red.svg";

const UPDATE_TASK = gql`
  mutation UpdateTask($id: uuid!, $status: Int, $updated_at: timestamptz) {
    update_tasks(
      where: { id: { _eq: $id } }
      _set: { status: $status, updated_at: $updated_at }
    ) {
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
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

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
                    updated_at: new Date(),
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
          <UpdateTaskDialog
            isOpenProp={isOpen}
            update={update}
            close={() => setIsOpen(false)}
            id={id}
            title={title}
            description={description}
            tags={tags}
          />
          <DeleteTaskDialog
            isOpenProp={isOpen2}
            update={update}
            close={() => setIsOpen2(false)}
            taskId={id}
          />
          <PopoverBox
            role="menu"
            ButtonComponent={
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
          >
            <div className="m-1">
              <div className="mb-1">
                <ButtonWithIcon
                  onClick={() => setIsOpen(!isOpen)}
                  label={"Update Task"}
                  image={EditIcon}
                  isHollow
                />
              </div>
              <div>
                <ButtonWithIcon
                  type={BUTTON_TYPE.DANGER}
                  onClick={() => setIsOpen2(!isOpen2)}
                  label={"Delete Task"}
                  image={TrashIcon}
                  isHollow
                />
              </div>
            </div>
          </PopoverBox>
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
