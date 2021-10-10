import { useAppContext } from "src/context/state";
import { useSelector } from "@xstate/react";
// Constants
import { FEATURE_STATUS } from "src/constants/enums";
// Component
import FeatureListItem from "./FeatureListItem";

type FeatureListItemProps = {
  id: string;
  name: string;
  status: FEATURE_STATUS;
  tags: string[];
};

type FeatureListProps = {
  features: FeatureListItemProps[];
};

const getContext = (state: any) => {
  return state?.context;
};

const FeatureList = ({ features = [] }: FeatureListProps): JSX.Element => {
  const AppMachine = useAppContext();
  const activeProjectData = useSelector<any, any>(AppMachine, getContext);

  return (
    <div>
      {features.map((feature, index) => {
        return (
          <FeatureListItem
            {...feature}
            project={activeProjectData?.id}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default FeatureList;
