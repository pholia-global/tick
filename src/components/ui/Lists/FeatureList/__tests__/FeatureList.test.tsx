import { screen } from "@testing-library/react";
import { render } from "@/tests/utils/customRender";
// Constans
import { FEATURE_STATUS as STATUS } from "src/constants/enums";
// Component
import FeatureList from "../FeatureList";

const props1 = {
  features: [
    {
      id: "123",
      name: "test name",
      status: STATUS.INCOMPLETE,
      project: "test",
      tags: ["frontend"],
    },
    {
      id: "124",
      name: "test name 2",
      status: STATUS.COMPLETE,
      project: "test",
      tags: ["backend"],
    },
  ],
};

// useless test. make better
test("FeatureList renders correctly", () => {
  render(<FeatureList {...props1} />);
  screen.getByText(props1.features[0].name);
  screen.getByText(props1.features[1].name);
});
