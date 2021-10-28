import TagInput from "@/components/ui/Input/TagInput";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ArrayReducer from "@/context/reducers/arrayReducer";

jest.mock("@/context/reducers/arrayReducer", () =>
  jest
    .fn()
    .mockReturnValueOnce({ dataList: ["test1"] })
    .mockReturnValueOnce({ dataList: [] })
    .mockReturnValueOnce({ dataList: ["test1"] })
    .mockReturnValueOnce({ dataList: ["test1", "test2"] })
    .mockReturnValueOnce({ dataList: ["test1"] })
);

afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

const onSubmit = jest.fn(() => null);

function renderTagInput() {
  const tagInput = render(
    <TagInput labelText="Tags" id="tags" onSubmit={onSubmit} />
  );

  const inputBox = screen.getByLabelText(/tags/i) as HTMLInputElement;

  return {
    ...tagInput,
    inputBox,
  };
}

test("TagInput: Add, remove, and submit works for the tag list", async () => {
  const { inputBox } = renderTagInput();
  userEvent.type(inputBox, "test1");
  expect(ArrayReducer).not.toHaveBeenCalled();
  userEvent.keyboard("{Enter}");
  const tag = await screen.findByText("test1");
  userEvent.click(tag);
  await waitFor(() => {
    expect(screen.queryByText("test1")).not.toBeInTheDocument();
  });
  userEvent.type(inputBox, "test1");
  userEvent.keyboard("{Enter}");
  userEvent.type(inputBox, "test2");
  userEvent.keyboard("{Enter}");
  expect(ArrayReducer).toHaveBeenCalledTimes(4);
  const tag2 = await screen.findByText("test2");
  userEvent.click(tag2);
  await waitFor(() => {
    expect(screen.queryByText("test2")).not.toBeInTheDocument();
  });
  expect(onSubmit).toHaveBeenLastCalledWith(["test1"]);
});
