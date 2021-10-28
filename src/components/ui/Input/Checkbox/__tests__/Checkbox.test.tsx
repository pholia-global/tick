import { render } from "@/tests/utils/customRender";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Checkbox from "../Checkbox";

let props1 = {
  id: "test1",
  checked: false,
  labelText: "test1",
};

function onClick() {
  props1 = {
    ...props1,
    checked: !props1.checked,
  };
}

test("Checkbox renders correctly", () => {
  const { rerender } = render(
    <Checkbox {...props1} onClick={() => onClick()} />
  );
  screen.getByText(props1.labelText);
  const checkboxInput = screen.getByRole(/checkbox/i);
  expect(screen.queryByTestId(/checkbox-check-img/i)).not.toBeInTheDocument();
  userEvent.click(checkboxInput);
  rerender(<Checkbox {...props1} onClick={() => onClick()} />);
  screen.getByTestId(/checkbox-check-img/i);
  userEvent.click(checkboxInput);
  rerender(<Checkbox {...props1} onClick={() => onClick()} />);
  expect(screen.queryByTestId(/checkbox-check-img/i)).not.toBeInTheDocument();
});
