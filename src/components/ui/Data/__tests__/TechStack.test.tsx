import { screen } from "@testing-library/react";
import { render } from "@/tests/utils/customRender";
import userEvent from "@testing-library/user-event";
import { setupServer } from "@/tests/utils/setupServer";
import { within, waitForElementToBeRemoved } from "@testing-library/dom";

import TechStack from "../TechStack";
// Types
import { StackType } from "../TechStack";

setupServer();

// Constants
const frontendStack = [
  {
    id: "1",
    image_svg_url:
      "https://res.cloudinary.com/pholiasp/image/upload/v1629448348/tick/technologies/svg/react_svebkd.svg",
    name: "react",
    type: "frontend",
  },
];

const backendStack = [
  {
    id: "1",
    image_svg_url:
      "https://res.cloudinary.com/pholiasp/image/upload/v1629449538/tick/technologies/svg/heroku_vd8ebu.svg",
    name: "heroku",
    type: "backend",
  },
];

const frontendStack2 = [
  {
    id: "1",
    image_svg_url:
      "https://res.cloudinary.com/pholiasp/image/upload/v1629448348/tick/technologies/svg/react_svebkd.svg",
    name: "react",
    type: "frontend",
  },
  {
    id: "2",
    image_svg_url:
      "https://res.cloudinary.com/pholiasp/image/upload/v1629449533/tick/technologies/svg/typescript_iexrh5.svg",
    name: "typescript",
    type: "frontend",
  },
];

const backendStack2: StackType[] = [];

/// Tests
// 1. All received stack information through props are rendered
test("Stack props rendered correctly", () => {
  const { rerender } = render(
    <TechStack
      frontendStack={frontendStack}
      backendStack={backendStack}
      project={"1"}
      update={() => null}
    />
  );
  screen.getByText(/react/i);
  screen.getByText(/heroku/i);
  rerender(
    <TechStack
      frontendStack={frontendStack2}
      backendStack={backendStack2}
      project={"2"}
      update={() => null}
    />
  );
  screen.getByText(/react/i);
  screen.getByText(/typescript/i);
  expect(screen.queryByText(/heroku/i)).not.toBeInTheDocument();
});

// 2. Clicking on 'Add' icon opens up the corresponding dialog box
test("Edit Stack dialog box opens and closes correctly", async () => {
  render(
    <TechStack
      frontendStack={frontendStack}
      backendStack={backendStack}
      project={"3"}
      update={() => null}
    />
  );
  const frontend = screen.getByTestId(/frontend/);
  within(frontend).getByText(/Add/i, { selector: "button" }).click();
  expect(await screen.findByText(/Select Technologies/i)).toBeInTheDocument();
  await screen.findByText(/angular/i);
  (await screen.findByText(/cancel/i)).click();
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/Select Technologies/i)
  );
});

// 3. Changes made in the add stack dialog box are reflected on the stack list correctly
test("Changes in Edit stack dialog box reflected in dialog box stack list", async () => {
  render(
    <TechStack
      frontendStack={frontendStack}
      backendStack={backendStack}
      project={"3"}
      update={() => null}
    />
  );
  const frontend = screen.getByTestId(/frontend/);
  (await within(frontend).findByText(/Add/i, { selector: "button" })).click();
  const angularButton = await screen.findByText(/angular/i);
  userEvent.click(angularButton);

  expect(angularButton).toHaveClass("border-theme_green");
  userEvent.click(angularButton);
  expect(angularButton).not.toHaveClass("border-theme_green");
  (await screen.findByText(/confirm/i)).click();
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/Select Technologies/i)
  );
});
