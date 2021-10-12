import { useEffect, useState } from "react";
import { useAppContext } from "src/context/state";
import { useSelector } from "@xstate/react";
// Hooks
import useFeatureData from "src/hooks/useFeatureData";
import { useQueryParams } from "src/hooks/useQueryParams";
// Components
import ProjectLayout from "@/components/layout/ProjectLayout";
import ProjectBasicData from "@/components/ui/Data/ProjectBasicData";
import Spinner from "@/components/ui/Spinner/Spinner";
import Heading from "@/components/ui/Heading/Heading";
import FeatureList from "@/components/ui/Lists/FeatureList/FeatureList";
import ClientOnly from "@/components/utils/ClientOnly";
import ButtonWithIcon from "@/components/ui/Button/ButtonWithIcon";
// Images
import filterImage from "@/images/icons/filter-blue.png";
import AddFeatureDialog from "@/components/ui/Dialog/AddFeatureDialog/AddFeatureDialog";

const getContext = (state: any) => {
  return state?.context;
};

const FeaturesPage = (): JSX.Element => {
  const AppMachine = useAppContext();
  const activeProjectData = useSelector<any, any>(AppMachine, getContext);
  const [listItems, setListItems] = useState([]);

  const project = useQueryParams();
  const { data, loading, refetch } = useFeatureData(project);

  useEffect(() => {
    if (data?.projects[0]?.features) {
      setListItems(data?.projects[0]?.features);
    }
  }, [data]);

  return (
    <div>
      <ClientOnly>
        <ProjectLayout title={data?.projects[0]?.name ?? "Features"}>
          <div className="p-6 w-full min-h-screen md:p-8">
            <div className="flex flex-col mb-3">
              <ProjectBasicData
                id={project}
                name={activeProjectData?.projectData?.name}
                status={activeProjectData?.projectData?.status}
              />
              <div className="flex justify-between mt-2">
                <Heading title={"Features"} />
                <div className="flex items-center">
                  <AddFeatureDialog update={refetch} />
                  <div className="w-2"></div>
                  <ButtonWithIcon
                    label={"Filter"}
                    image={filterImage}
                    onClick={() => {
                      "ta";
                    }}
                    isHollow
                  />
                </div>
              </div>
            </div>
            {data ? (
              <FeatureList features={listItems} />
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
