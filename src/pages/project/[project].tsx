import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
// Components
import ProjectLayout from "@/components/layout/ProjectLayout";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "@/components/ui/Spinner/Spinner";
import ProjectBasicData from "@/components/ui/Data/ProjectBasicData";
import ClientOnly from "@/components/utils/ClientOnly";
import SummaryBox from "@/components/ui/Data/SummaryBox";
import TechStack from "@/components/ui/Data/TechStack";
// Types
type StackType = {
  id: string;
  image_svg_url: string;
  name: string;
  type: string;
};

type Technology = {
  id: string;
  name: string;
  image_svg_url: string;
  type: string;
};

type ProjectTechnologyType = {
  id: string;
  project_id: string;
  technology_id: string;
  technology: Technology;
};
// Query
const GET_PROJECT = gql`
  query GetProject($id: uuid!) {
    projects(where: { id: { _eq: $id } }) {
      plain_id
      name
      status
      tags
      tech_stack
      description
      created_at
      updated_at
      features(limit: 5) {
        name
      }
      stages(limit: 5) {
        name
        status
      }
      project_technologies {
        technology {
          id
          name
          image_svg_url
          type
        }
      }
    }
  }
`;

const Project = (): JSX.Element => {
  // Datastore
  const [frontendStack, setFrontendStack] = useState([] as StackType[]);
  const [backendStack, setbackendStack] = useState([] as StackType[]);

  const router = useRouter();
  const { project } = router.query;

  const { data, loading, refetch } = useQuery(GET_PROJECT, {
    variables: { id: project },
    onError: (error) => {
      toast.error("Redirecting...");
      console.log(error?.message);
      setTimeout(() => {
        router.push("/projects");
      }, 2000);
    },
  });

  const updateTechStack = () => {
    refetch();
  };

  useEffect(() => {
    if (data) {
      const frontBuffer: StackType[] = [];
      const backBuffer: StackType[] = [];
      data?.projects[0]?.project_technologies?.map(
        (tech: ProjectTechnologyType) => {
          if (tech?.technology?.type === "frontend") {
            frontBuffer.push(tech?.technology);
          } else {
            backBuffer.push(tech?.technology);
          }
        }
      );
      setFrontendStack(frontBuffer);
      setbackendStack(backBuffer);
    }
  }, [data]);

  return (
    <div>
      <ClientOnly>
        <Toaster position="bottom-right" reverseOrder={false} />
        <ProjectLayout title={data?.projects[0]?.name ?? "Project"}>
          <div className="p-6 w-full min-h-screen md:p-8">
            {data ? (
              <div>
                <div className="mb-6">
                  <ProjectBasicData
                    id={project as string}
                    name={data?.projects[0]?.name}
                    status={data?.projects[0]?.status}
                    description={data?.projects[0]?.description}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-perc-50-2 mb-4">
                  <SummaryBox
                    boxName="Features"
                    infoPoints={data?.projects[0]?.features}
                    callbackLabel="manage"
                    callback={() => router.push(`/project/${project}/features`)}
                  />
                  <SummaryBox
                    boxName="Stages"
                    infoPoints={data?.projects[0]?.stages}
                    callbackLabel="manage"
                    callback={() => router.push(`/project/${project}/stages`)}
                  />
                </div>
                <div>
                  <TechStack
                    frontendStack={frontendStack}
                    backendStack={backendStack}
                    project={data?.projects[0]?.plain_id as string}
                    update={updateTechStack}
                  />
                </div>
              </div>
            ) : loading ? (
              <div className="m-auto">
                <Spinner size={2} />
              </div>
            ) : (
              <div className="m-auto">Something went wrong :(</div>
            )}
          </div>
        </ProjectLayout>
      </ClientOnly>
    </div>
  );
};

export default Project;
