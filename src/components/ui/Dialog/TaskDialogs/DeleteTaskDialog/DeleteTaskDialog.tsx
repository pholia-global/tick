import { FormEvent, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
// Components
import toast from "react-hot-toast";
import DialogBox from "../../Dialog";
import ButtonWithIcon from "@/components/ui/Button/ButtonWithIcon";
// Images
import EditIcon from "@/images/icons/svg/edit-white.svg";
// Types
type DeleteTaskDialogProps = {
  taskId: string;
  showButton?: boolean;
  isOpenProp?: boolean;
  close?: () => void;
  update: () => void;
};

// Query
const DELETE_TASK = gql`
  mutation DeleteTask($id: uuid) {
    delete_tasks(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

function DeleteTaskDialog({
  taskId,
  isOpenProp,
  close,
  showButton,
  update,
}: DeleteTaskDialogProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(isOpenProp || false);

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

  const [confirmTask] = useMutation(DELETE_TASK, {
    onCompleted: () => closeModal(),
  });

  const handleTaskConfirm = (e: FormEvent) => {
    e.preventDefault();
    toast.promise(
      confirmTask({
        variables: {
          id: taskId,
        },
      }).then(() => {
        update();
      }),
      {
        loading: "Deleting Task...",
        success: <b>Task Deleted!</b>,
        error: <b>Error! Task deletion failed</b>,
      }
    );
  };

  return (
    <>
      {showButton && (
        <ButtonWithIcon
          onClick={openModal}
          label={"Delete Task"}
          image={EditIcon}
        />
      )}

      <DialogBox title={"Delete Task"} isOpen={isOpen} closeModal={closeModal}>
        <div>
          <form onSubmit={handleTaskConfirm}>
            <div>Are you sure you want to delete the task?</div>
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

export default DeleteTaskDialog;
