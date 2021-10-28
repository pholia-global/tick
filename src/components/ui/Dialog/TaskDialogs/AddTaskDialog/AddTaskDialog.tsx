import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Image from "next/image";
// Components
import toast from "react-hot-toast";
import DialogBox from "../../Dialog";
import GeneralInput from "../../../Input/GeneralInput";
import TagInput from "../../../Input/TagInput";
// Types
type AddTaskDialogProps = {
  showButton?: boolean;
  feature_id?: string;
  feature_plain_id?: string;
  version_id?: string;
  isOpenProp?: boolean;
  close?: () => void;
  update: () => void;
};

// Query
const INSERT_TASK = gql`
  mutation InsertStack($object: tasks_insert_input!) {
    insert_tasks_one(object: $object) {
      id
    }
  }
`;

function AddTaskDialog({
  showButton,
  feature_id,
  feature_plain_id,
  version_id,
  isOpenProp,
  close,
  update,
}: AddTaskDialogProps): JSX.Element {
  const { user } = useUser();
  const router = useRouter();
  const { project } = router.query;

  const [isOpen, setIsOpen] = useState(isOpenProp || false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskTags, setTaskTags] = useState([] as string[]);

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

  const [confirmTask] = useMutation(INSERT_TASK, {
    onCompleted: () => {
      setTaskDescription("");
      closeModal();
    },
  });

  const handleTaskConfirm = (e: FormEvent) => {
    e.preventDefault();
    toast.promise(
      confirmTask({
        variables: {
          object: {
            project_id: project,
            feature_id: feature_id ?? null,
            feature_plain_id: feature_plain_id ?? null,
            version_id: version_id ?? null,
            tags: taskTags,
            title: taskTitle,
            description: taskDescription,
            owner_github_id: user?.sub,
          },
        },
      }).then(() => {
        update();
      }),
      {
        loading: "Adding Task...",
        success: <b>Task Added!</b>,
        error: <b>Error! Task insertion failed</b>,
      }
    );
  };

  return (
    <>
      {showButton && (
        <button onClick={openModal} className="flex flex-col items-center mr-3">
          <div className="flex items-center mb-1 p-4 rounded-full border border-theme_eagle">
            <Image
              src="/images/icons/add_item.png"
              alt={`Add tech icon`}
              height={24}
              width={24}
            />
          </div>
          Add Task
        </button>
      )}

      <DialogBox
        title={"Enter task details"}
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <div>
          <form onSubmit={handleTaskConfirm}>
            <div className="w-full mb-2">
              <GeneralInput
                id={"title"}
                labelText="Title"
                onChange={(e) => setTaskTitle(e.target.value)}
                required
              />
            </div>
            <div className="w-full mb-2">
              <GeneralInput
                id={"description"}
                labelText="Description"
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>
            <div className="w-full mb-2">
              <TagInput
                id={"tags"}
                labelText="Tags"
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

export default AddTaskDialog;
