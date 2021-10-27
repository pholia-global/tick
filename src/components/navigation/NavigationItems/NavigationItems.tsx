import { useSelector } from "@xstate/react";
// Components
import NavigationItem from "./NavigationItem/NavigationItem";
// Context
import { useAppContext } from "src/context/state";

const NavigationItems = (): JSX.Element => {
  const AppService = useAppContext();
  const activeProject = useSelector<any, any>(
    AppService,
    (state: any) => state?.context?.id
  );

  return (
    <div>
      <div>
        <NavigationItem
          icon="/images/icons/home.png"
          target={{
            pathname: "/project/[project]",
            query: { project: activeProject },
          }}
          text="Home"
        />
        <NavigationItem
          icon="/images/icons/features.png"
          target={{
            pathname: "/project/[project]/features",
            query: { project: activeProject },
          }}
          text="Features"
        />
        <NavigationItem
          icon="/images/icons/stages.png"
          target={{
            pathname: "/project/[project]/versions",
            query: { project: activeProject },
          }}
          text="Versions"
        />
        <NavigationItem
          icon="/images/icons/tasks.png"
          target={{
            pathname: "/project/[project]/tasks",
            query: { project: activeProject },
          }}
          text="Tasks"
        />
        <NavigationItem
          icon="/images/icons/projects.png"
          target={{
            pathname: "/projects",
            query: null,
          }}
          text="Projects"
        />
        <NavigationItem
          icon="/images/icons/logout3.png"
          target={{
            pathname: "/api/auth/logout",
            query: null,
          }}
          text="Logout"
        />
      </div>
    </div>
  );
};

export default NavigationItems;
