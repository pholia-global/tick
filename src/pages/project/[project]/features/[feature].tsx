import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
// Components
import ProjectLayout from "@/components/layout/ProjectLayout";
import BackButton from "@/components/navigation/BackButton/BackButton";
import ButtonWithIcon from "@/components/ui/Button/ButtonWithIcon";
import { H3, H6 } from "@/components/ui/Typography";
import Heading from "@/components/ui/Heading/Heading";
import TaskList from "@/components/ui/Lists/TaskList/TaskList";
import Spinner from "@/components/ui/Spinner/Spinner";
// Images
import checkIcon from "@/images/icons/check.png";

const GET_TASKS = gql`
  query GetTasks($id: uuid!) {
    tasks(where: { feature_id: { _eq: $id } }) {
      id
      status
      title
      tags
      description
    }
  }
`;

const FeaturePage = (): JSX.Element => {
  const router = useRouter();
  const { feature } = router.query;

  const [listItems, setListItems] = useState([]);

  const { data, loading, refetch } = useQuery(GET_TASKS, {
    variables: { id: feature },
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
          <BackButton pageName="Features" />
          <div className="mt-5 flex flex-col justify-between md:flex-row">
            <div className="mb-2 md:mb-0">
              <div className="mb-1">
                <H3>Test Feature</H3>
              </div>
              <H6>
                Feature detail here Feature detail here Feature detail here
              </H6>
            </div>
            <div>
              <ButtonWithIcon
                isHollow
                image={checkIcon}
                label={"Mark as completed"}
                onClick={() => "boom"}
              />
            </div>
          </div>
          <div className="mt-6">
            <div className="flex">
              <Heading title={"Tasks"} />
            </div>
            {loading ? (
              <div className="m-auto">
                <Spinner size={2} />
              </div>
            ) : (
              <TaskList tasks={listItems} update={refetch} />
            )}
          </div>
        </div>
      </ProjectLayout>
    </div>
  );
};

export default FeaturePage;
