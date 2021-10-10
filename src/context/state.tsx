import { createContext, useContext, useState } from "react";
import { Interpreter } from "xstate";
import { useInterpret } from "@xstate/react";
import projectMachine from "./machines/projectMachine";
// Types
import { ProjectContext, ProjectEvent } from "./machines/projectMachine";

export const AppContext = createContext({
  // activeProject: "",
  // setActiveProject: (projectId: string) => {},
});

export function AppWrapper({ children }: any): JSX.Element {
  const projectService: Interpreter<
    ProjectContext,
    any,
    ProjectEvent,
    { value: any; context: ProjectContext }
  > = useInterpret(projectMachine);
  // const [activeProject, setActiveProj] = useState("" as string);

  // const setActiveProject = (projectId: string) => {
  //   setActiveProj(projectId);
  // };

  // const sharedState = {
  //   activeProject: activeProject,
  //   setActiveProject: setActiveProject,
  // };

  return (
    // <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
    <AppContext.Provider value={projectService}>{children}</AppContext.Provider>
  );
}

export function useAppContext(): any {
  return useContext(AppContext);
}
