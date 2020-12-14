import { render } from "@testing-library/react";
import Button from "./button";

test("our first test", () => {
  const wrapper = render(<Button>Nice</Button>);
  const element = wrapper.queryByText("Nice");
  expect(element).toBeTruthy();
  expect(element).toBeInTheDocument();
});
