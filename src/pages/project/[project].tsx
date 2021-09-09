import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
// Components
import ProjectLayout from "@/components/layout/ProjectLayout";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "@/components/ui/Spinner/Spinner";
import ProjectBasicData from "@/components/ui/data/ProjectBasicData";
import ClientOnly from "@/components/utils/ClientOnly";
import SummaryBox from "@/components/ui/data/SummaryBox";
import TechStack from "@/components/ui/data/TechStack";
import Modal from "@/components/ui/modal/Modal";
import AddStackModal from "@/components/ui/modal/custom/addStackModal";
// Types
type StackType = {
  id: string;
  image_svg_url: string;
  name: string;
  type: string;
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

const Project = () => {
  // Datastore
  const [frontendStack, setFrontendStack] = useState([] as StackType[]);
  const [backendStack, setbackendStack] = useState([] as StackType[]);
  // Modal Control
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("frontend");

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

  useEffect(() => {
    if (data) {
      const frontBuffer: StackType[] = [];
      const backBuffer: StackType[] = [];
      data?.projects[0]?.project_technologies?.map((tech: any) => {
        if (tech?.technology?.type === "frontend") {
          frontBuffer.push(tech?.technology);
        } else {
          backBuffer.push(tech?.technology);
        }
      });
      setFrontendStack(frontBuffer);
      setbackendStack(backBuffer);
    }
  }, [data]);

  return (
    <div>
      <ClientOnly>
        <Toaster position="bottom-right" reverseOrder={false} />
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AddStackModal
            type={modalType}
            frontendStack={frontendStack}
            backendStack={backendStack}
            project={data?.projects[0]?.plain_id as string}
            isModalOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              refetch();
            }}
          />
        </Modal>
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
                    addFrontend={() => {
                      setModalType("frontend");
                      setIsModalOpen(true);
                    }}
                    addBackend={() => {
                      setModalType("backend");
                      setIsModalOpen(true);
                    }}
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
