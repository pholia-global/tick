import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
// Components
import ProjectLayout from "@/components/layout/ProjectLayout";
import TaskList from "@/components/ui/Lists/TaskList/TaskList";
import Spinner from "@/components/ui/Spinner/Spinner";

const GET_TASKS = gql`
  query GetTasks($id: uuid!) {
    tasks(where: { project_id: { _eq: $id } }) {
      id
      status
      title
      tags
      description
    }
  }
`;

const Tasks = (): JSX.Element => {
  const router = useRouter();
  const { project } = router.query;

  const [listItems, setListItems] = useState([]);

  const { data, loading, refetch } = useQuery(GET_TASKS, {
    variables: { id: project },
    onError: (error) => {
      toast.error("Something went wrong 😭");
      console.log(error?.message);
    },
  });

  useEffect(() => {
    if (data?.tasks) {
      setListItems(data?.tasks);
    }
  }, [data]);

  return (
    <div>
      <ProjectLayout title="Features">
        <div className="p-6 w-full min-h-screen md:p-8">
          <h1>Tasks Page</h1>
          {data ? (
            <TaskList tasks={listItems} update={refetch} />
          ) : loading ? (
            <div className="m-auto">
              <Spinner size={2} />
            </div>
          ) : (
            <div className="m-auto">Something went wrong :(</div>
          )}
        </div>
      </ProjectLayout>
    </div>
  );
};

export default Tasks;
