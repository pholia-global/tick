import { useAppContext } from "src/context/state";
import { useSelector } from "@xstate/react";
// Hooks
import useFeatureData from "src/hooks/useFeatureData";
import { useQueryParams } from "src/hooks/useQueryParams";
// Components
import ProjectLayout from "@/components/layout/ProjectLayout";
import ProjectBasicData from "@/components/ui/Data/ProjectBasicData";
import Spinner from "@/components/ui/Spinner/Spinner";
import ClientOnly from "@/components/utils/ClientOnly";

const getContext = (state: any) => {
  return state?.context;
};

const FeaturesPage = (): JSX.Element => {
  const AppMachine = useAppContext();
  const activeProjectData = useSelector<any, any>(AppMachine, getContext);

  const project = useQueryParams();
  const { data, loading } = useFeatureData(project);

  return (
    <div>
      <ClientOnly>
        <ProjectLayout title={data?.projects[0]?.name ?? "Features"}>
          <div className="p-6 w-full min-h-screen md:p-8">
            <div>
              <ProjectBasicData
                id={project}
                name={activeProjectData?.projectData?.name}
                status={activeProjectData?.projectData?.status}
              />
            </div>
            {data ? (
              <div>Data is here</div>
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

export default FeaturesPage;
