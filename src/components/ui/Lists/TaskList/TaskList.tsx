import { useState } from "react";
// Constants
import { TASK_STATUS } from "src/constants/enums";
// Component
import AddTaskDialog from "../../Dialog/TaskDialogs/AddTaskDialog/AddTaskDialog";
import TaskListItem from "./TaskListItem";
import ListItemButton from "@/components/ui/Button/ListItemButton";

type TaskListItemProps = {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  status: TASK_STATUS;
  update: () => void;
};

type TaskListProps = {
  tasks: TaskListItemProps[];
  update: () => void;
  feature_id?: string;
  version_id?: string;
};

const TaskList = ({
  feature_id,
  version_id,
  update,
  tasks = [],
}: TaskListProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <AddTaskDialog
        isOpenProp={isOpen}
        update={update}
        close={() => setIsOpen(false)}
        version_id={version_id ?? undefined}
        feature_id={feature_id ?? undefined}
      />
      {tasks.map((task, index) => {
        return (
          <TaskListItem
            {...task}
            key={`${task?.title}-${index}`}
            update={update}
          />
        );
      })}
      <div className="mt-2">
        <ListItemButton label={"Add Task"} onClick={() => setIsOpen(!isOpen)} />
      </div>
    </div>
  );
};

export default TaskList;
