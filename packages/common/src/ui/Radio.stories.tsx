import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Radio } from "./Radio";

export default {
  component: Radio,
} as ComponentMeta<typeof Radio>;

export const Default: ComponentStory<typeof Radio> = (args) => (
  <Radio {...args} />
);
