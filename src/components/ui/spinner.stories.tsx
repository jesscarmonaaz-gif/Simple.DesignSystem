import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./spinner";

const meta: Meta<typeof Spinner> = {
  title: "Primitives/Loader/Spinner",
  component: Spinner,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "destructive", "warning", "muted"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
  },
  args: {
    variant: "default",
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: "sm" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const ExtraLarge: Story = {
  args: { size: "xl" },
};

export const Success: Story = {
  args: { variant: "success" },
};

export const Destructive: Story = {
  args: { variant: "destructive" },
};

export const Warning: Story = {
  args: { variant: "warning" },
};

export const Muted: Story = {
  args: { variant: "muted" },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner variant="default" size="lg" />
      <Spinner variant="success" size="lg" />
      <Spinner variant="destructive" size="lg" />
      <Spinner variant="warning" size="lg" />
      <Spinner variant="muted" size="lg" />
    </div>
  ),
};
