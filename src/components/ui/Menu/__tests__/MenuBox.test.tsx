import { screen } from "@testing-library/react";
import { render } from "@/tests/utils/customRender";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Components
import MenuBox from "../MenuBox";
// Types
interface MenuItemProps {
  content: string;
  key: string;
}

const item1Text = "item-1";
const item2Text = "item-2";
const ButtonComponent = () => <div role="menu-button">Press Here</div>;
const MenuItem = ({ content, key }: MenuItemProps) => (
  <div key={`${key}-${content}`}>{content}</div>
);
const MenuItems = [
  <MenuItem key={item1Text} content={item1Text} />,
  <MenuItem key={item2Text} content={item2Text} />,
];

test("MenuBox renders correctly", async () => {
  render(
    <MenuBox buttonComponent={<ButtonComponent />} MenuItems={MenuItems} />
  );
  const menuButton = screen.getByRole("menu-button");
  expect(screen.queryByText(item1Text)).not.toBeInTheDocument();
  userEvent.click(menuButton);
  await screen.findByText(item1Text);
  userEvent.click(menuButton);
  await waitFor(() => {
    expect(screen.queryByText(item1Text)).not.toBeInTheDocument();
  });
});
