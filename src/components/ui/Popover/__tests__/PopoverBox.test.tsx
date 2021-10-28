import { act, screen } from "@testing-library/react";
import { render } from "@/tests/utils/customRender";
import { waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Components
import Popoverbox from "../PopoverBox";
// Types
interface MenuItemProps {
  content: string;
}

const item1Text = "item-1";
const item2Text = "item-2";
const ButtonComponent = () => <div role="menu-button">Press Here</div>;
const MenuItem = ({ content }: MenuItemProps) => <div>{content}</div>;
const MenuItems = [
  <MenuItem key={item1Text} content={item1Text} />,
  <MenuItem key={item2Text} content={item2Text} />,
];

test("PopoverBox renders correctly", async () => {
  render(
    <Popoverbox ButtonComponent={<ButtonComponent />}>{MenuItems}</Popoverbox>
  );
  const menuButton = screen.getByRole("menu-button");
  expect(screen.queryByRole(/popover-content/i)).not.toBeInTheDocument();
  userEvent.click(menuButton);
  await screen.findByText(item1Text);
  userEvent.click(menuButton);
  await waitForElementToBeRemoved(() => screen.queryByRole(/popover-content/i));
});
