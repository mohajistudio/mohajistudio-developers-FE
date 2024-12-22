import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "Design System/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Heading: Story = {
  args: {
    variant: "heading",
    children: "모하지 스튜디오 (30pt Bold)",
  },
};

export const Title1: Story = {
  args: {
    variant: "title1",
    children: "모하지 스튜디오 (20pt Bold)",
  },
};

export const Title2: Story = {
  args: {
    variant: "title2",
    children: "모하지 스튜디오 (16pt Bold)",
  },
};

export const Body: Story = {
  args: {
    variant: "body",
    children: "모하지 스튜디오 (16pt Medium)",
  },
};

export const Caption: Story = {
  args: {
    variant: "caption",
    children: "모하지 스튜디오 (14pt Medium)",
  },
};

export const AllTypography: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="heading">Heading - 30pt Bold</Typography>
      <Typography variant="title1">Title 1 - 20pt Bold</Typography>
      <Typography variant="title2">Title 2 - 16pt Bold</Typography>
      <Typography variant="body">Body - 16pt Medium</Typography>
      <Typography variant="caption">Caption - 14pt Medium</Typography>
    </div>
  ),
};
