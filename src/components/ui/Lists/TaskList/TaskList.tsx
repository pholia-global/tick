// Constants
import { TASK_STATUS } from "src/constants/enums";
// Component
import TaskListItem from "./TaskListItem";

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
};

const TaskList = ({ update, tasks = [] }: TaskListProps): JSX.Element => {
  return (
    <div>
      {tasks.map((task, index) => {
        return <TaskListItem {...task} key={index} update={update} />;
      })}
    </div>
  );
};

export default TaskList;
