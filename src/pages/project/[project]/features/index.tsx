import useFeatureData from "src/hooks/useFeatureData";
import { useQueryParams } from "src/hooks/useQueryParams";
// Components
import ProjectLayout from "@/components/layout/ProjectLayout";
import ProjectBasicData from "@/components/ui/Data/ProjectBasicData";
import { Toaster } from "react-hot-toast";
import Spinner from "@/components/ui/Spinner/Spinner";
import ClientOnly from "@/components/utils/ClientOnly";

const FeaturesPage = (): JSX.Element => {
  const project = useQueryParams();
  const { data, loading } = useFeatureData(project);

  return (
    <div>
      <ProjectLayout title="Features">
        <h1>Features Page</h1>
      </ProjectLayout>
    </div>
  );
};

export default FeaturesPage;
