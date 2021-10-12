import { createMachine, assign } from "xstate";
import getProjectData from "./utils/getProjectData";

export interface ProjectContext {
  id: string;
  projectData: any;
}

export type ProjectEvent =
  | {
      type: "RESET";
      id: string;
      projectData: any;
    }
  | {
      type: "UPDATE_ID";
      id: string;
    };

const differentProjects = (
  context: ProjectContext,
  event: ProjectEvent
): boolean => {
  return context.id !== "" || context.id !== event.id;
};

const projectMachine = createMachine<ProjectContext, ProjectEvent>({
  id: "project",
  initial: "idle",
  context: {
    id: "",
    projectData: {},
  },
  states: {
    idle: {},
    selected: {
      initial: "loading",
      states: {
        loading: {
          invoke: {
            id: "fetch-project-data",
            src: getProjectData,
            onDone: {
              target: "loaded",
              actions: assign({
                projectData: (context, event) => event.data,
              }),
            },
            onError: "failed",
          },
        },
        loaded: {},
        failed: {},
      },
    },
  },
  on: {
    UPDATE_ID: {
      target: "selected",
      cond: differentProjects,
      actions: assign((context, event) => ({
        id: event.id,
      })),
    },
    RESET: {
      target: "idle",
      actions: assign({
        id: "",
        projectData: {},
      }),
    },
  },
});

export default projectMachine;
