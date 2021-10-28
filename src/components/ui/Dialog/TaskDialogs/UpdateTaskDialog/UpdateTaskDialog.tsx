import { FormEvent, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
// Components
import toast from "react-hot-toast";
import DialogBox from "../../Dialog";
import GeneralInput from "../../../Input/GeneralInput";
import TagInput from "../../../Input/TagInput";
import ButtonWithIcon from "@/components/ui/Button/ButtonWithIcon";
// Images
import EditIcon from "@/images/icons/svg/edit-white.svg";
// Types
type UpdateTaskDialogProps = {
  id: string;
  title?: string;
  description?: string;
  tags?: string[];
  showButton?: boolean;
  isOpenProp?: boolean;
  close?: () => void;
  update: () => void;
};

// Query
const UPDATE_TASK = gql`
  mutation UpdateStack($id: uuid, $set: tasks_set_input!) {
    update_tasks(where: { id: { _eq: $id } }, _set: $set) {
      affected_rows
    }
  }
`;

function UpdateTaskDialog({
  id,
  title,
  description,
  tags,
  isOpenProp,
  close,
  showButton,
  update,
}: UpdateTaskDialogProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(isOpenProp || false);
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);
  const [taskTags, setTaskTags] = useState(tags);

  useEffect(() => {
    setIsOpen(isOpenProp as boolean);
  }, [isOpenProp]);

  function closeModal() {
    setIsOpen(false);
    if (close) {
      close();
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  const [confirmTask] = useMutation(UPDATE_TASK, {
    onCompleted: () => closeModal(),
  });

  const handleTaskConfirm = (e: FormEvent) => {
    e.preventDefault();
    toast.promise(
      confirmTask({
        variables: {
          id: id,
          set: {
            tags: taskTags,
            title: taskTitle,
            description: taskDescription,
            updated_at: new Date(),
          },
        },
      }).then(() => {
        update();
      }),
      {
        loading: "Updating Task...",
        success: <b>Task Updated!</b>,
        error: <b>Error! Task updation failed</b>,
      }
    );
  };

  return (
    <>
      {showButton && (
        <ButtonWithIcon
          onClick={openModal}
          label={"Update Task"}
          image={EditIcon}
        />
      )}

      <DialogBox title={"Update Task"} isOpen={isOpen} closeModal={closeModal}>
        <div>
          <form onSubmit={handleTaskConfirm}>
            <div className="w-full mb-2">
              <GeneralInput
                id={"title"}
                labelText="Title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
              />
            </div>
            <div className="w-full mb-2">
              <GeneralInput
                id={"description"}
                labelText="Description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>
            <div className="w-full mb-2">
              <TagInput
                id={"tags"}
                labelText="Tags"
                tagList={taskTags}
                onSubmit={(dataList) => setTaskTags(dataList)}
              />
            </div>
            <div className="w-full grid grid-cols-perc-30-2 mt-2 gap-1">
              <button
                type="button"
                onClick={closeModal}
                className="py-3 px-1 border-2 border-theme_blue rounded"
              >
                Cancel
              </button>
              <input
                value="Confirm"
                type="submit"
                className="py-3 bg-theme_blue text-white rounded"
              />
            </div>
          </form>
        </div>
      </DialogBox>
    </>
  );
}

export default UpdateTaskDialog;
