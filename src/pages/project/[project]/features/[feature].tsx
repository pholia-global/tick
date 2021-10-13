import { useRouter } from "next/router";
// Components
import ProjectLayout from "@/components/layout/ProjectLayout";
import BackButton from "@/components/navigation/BackButton/BackButton";
import ButtonWithIcon from "@/components/ui/Button/ButtonWithIcon";
import { H3, H6 } from "@/components/ui/Typography";
// Images
import checkIcon from "@/images/icons/check.png";

const FeaturePage = (): JSX.Element => {
  const router = useRouter();
  const { project, feature } = router.query;

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
        </div>
      </ProjectLayout>
    </div>
  );
};

export default FeaturePage;
