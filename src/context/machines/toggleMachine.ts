import { createMachine } from "xstate";

export type ToggleEvent = {
  type: "TOGGLE";
};

const toggleMachine = createMachine<ToggleEvent>({
  id: "project",
  initial: "inactive",
  states: {
    inactive: {
      on: {
        TOGGLE: "active",
      },
    },
    active: {
      on: {
        TOGGLE: "inactive",
      },
    },
  },
});

export default toggleMachine;
