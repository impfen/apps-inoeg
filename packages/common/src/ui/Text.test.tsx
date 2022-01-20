import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import * as stories from "./Text.stories";

const { Default } = composeStories(stories);

describe("ui/Text", () => {
  it("should render", async () => {
    expect.hasAssertions();

    render(<Default />);

    const element = screen.getAllByText("Text");
    expect(element).not.toBeNull();
  });
});
