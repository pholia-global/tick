import { screen } from "@testing-library/react";
import { render } from "@/tests/utils/customRender";
// Constans
import { FEATURE_STATUS as STATUS } from "src/constants/enums";
// Component
import FeatureListItem from "@/components/ui/Lists/FeatureList/FeatureListItem";

const props1 = {
  id: "123",
  name: "test name",
  status: STATUS.INCOMPLETE,
  project: "test",
  tags: ["frontend"],
};

const props2 = {
  id: "123",
  name: "test name",
  status: STATUS.COMPLETE,
  project: "test",
  tags: ["backend"],
};

test("FeatureListItem renders correctly", () => {
  const { rerender } = render(<FeatureListItem {...props1} />);
  screen.getByText(props1.name);
  screen.getByText(props1.tags[0]);
  expect(screen.queryByRole("image")).not.toBeInTheDocument();
  rerender(<FeatureListItem {...props2} />);
  expect(screen.queryByRole("image")).toBeInTheDocument();
  screen.getByText(props2.tags[0]);
});
