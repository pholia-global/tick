import { screen } from "@testing-library/react";
import { render } from "src/test/utils/customRender";
import { setupServer } from "@/tests/utils/setupServer";
// Component
import TaskListItem from "../TaskListItem";
import userEvent from "@testing-library/user-event";

setupServer();

const props1 = {
  id: "123",
  title: "steal da moon 1",
  description: "importance intensifies",
  tags: ["eins", "zwei", "drei"],
  status: 1,
  update: () => {
    null;
  },
};

const props2 = {
  id: "123",
  title: "Steal da moon 2",
  description: undefined,
  tags: [],
  status: 2,
  update: () => {
    null;
  },
};

test("Task information is displayed correctly", () => {
  const { rerender } = render(<TaskListItem {...props1} />);
  screen.getByText(props1.tags[0]);
  const taskCheck = screen.getByRole("checkbox");
  const taskInfo = screen.getByText(props1.title);
  const taskMenu = screen.getByRole("menu");
  expect(taskCheck).not.toBeChecked();
  expect(screen.queryByText(props1.description)).not.toBeInTheDocument();
  userEvent.click(taskInfo);
  screen.getByText(props1.description);
  userEvent.click(taskInfo);
  expect(screen.queryByText(props1.description)).not.toBeInTheDocument();
  userEvent.click(taskMenu);
  screen.findByText(/edit task/i);
  rerender(<TaskListItem {...props2} />);
  const taskInfo2 = screen.getByText(props2.title);
  userEvent.click(taskInfo2);
  expect(screen.queryByRole(/contentinfo/i)).not.toBeInTheDocument();
  expect(screen.queryByTestId(/checkbox-check-img/i)).toBeInTheDocument();
});
