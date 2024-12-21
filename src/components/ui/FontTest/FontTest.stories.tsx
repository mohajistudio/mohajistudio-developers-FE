import type { Meta, StoryObj } from "@storybook/react";
import { FontTest } from "./FontTest";

const meta: Meta<typeof FontTest> = {
  title: "Design System/FontTest",
  component: FontTest,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof FontTest>;

export const Default: Story = {};
