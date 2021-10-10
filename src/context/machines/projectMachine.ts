import { createMachine, assign } from "xstate";

import { PROJECT_STATUS } from "src/constants/enums";

export type ProjectContext = {
  id: string;
  name: string;
  status: PROJECT_STATUS;
  description: string;
};

export type ProjectEvent =
  | {
      type: "SET";
      id: string;
      name: string;
      status: PROJECT_STATUS;
      description: string;
    }
  | {
      type: "RESET";
      id: string;
      name: string;
      status: PROJECT_STATUS;
      description: string;
    }
  | {
      type: "UPDATE_ID";
      id: string;
    };

const differentProjects = (
  context: ProjectContext,
  event: ProjectContext
): boolean => {
  return (
    (context.id !== "" || context.id !== event.id) && event.id !== undefined
  );
};

const projectMachine = createMachine<ProjectContext, ProjectEvent>({
  id: "project",
  initial: "idle",
  context: {
    id: "",
    name: "",
    status: PROJECT_STATUS.INACTIVE,
    description: "",
  },
  states: {
    idle: {},
    loaded: {
      on: {
        RESET: {
          target: "idle",
          actions: assign({
            id: (_) => "",
            name: (_) => "",
            description: (_) => "",
            status: (_) => PROJECT_STATUS.INACTIVE,
          }),
        },
      },
    },
  },
  on: {
    SET: {
      target: "loaded",
      cond: differentProjects,
      actions: assign((context, event) => ({
        id: event.id,
        name: event.name,
        description: event.description,
        status: event.status,
      })),
    },
    UPDATE_ID: {
      target: "loaded",
      cond: (context, event) => context.id !== "" || context.id !== event.id,
      actions: assign((context, event) => ({
        id: event.id,
      })),
    },
  },
});

export default projectMachine;
