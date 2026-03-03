import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./progress";

const meta: Meta<typeof Progress> = {
  title: "Primitives/Loader/Progress",
  component: Progress,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "destructive", "warning"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    showValue: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    value: 60,
    variant: "default",
    size: "md",
    showValue: false,
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

/* ── Basic ── */

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: "Uploading…",
    value: 60,
  },
};

export const WithValue: Story = {
  args: {
    label: "Storage used",
    value: 72,
    showValue: true,
  },
};

export const Empty: Story = {
  args: { value: 0 },
};

export const Full: Story = {
  args: { value: 100 },
};

/* ── Sizes ── */

export const Small: Story = {
  args: { size: "sm", value: 60 },
};

export const Medium: Story = {
  args: { size: "md", value: 60 },
};

export const Large: Story = {
  args: { size: "lg", value: 60 },
};

/* ── Variants ── */

export const Success: Story = {
  args: {
    variant: "success",
    value: 100,
    label: "Upload complete",
    showValue: true,
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    value: 85,
    label: "Storage critical",
    showValue: true,
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    value: 65,
    label: "Storage high",
    showValue: true,
  },
};

/* ── Overview ── */

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-5 max-w-sm">
      <Progress variant="default" value={60} label="Default" showValue />
      <Progress variant="success" value={100} label="Success" showValue />
      <Progress variant="warning" value={65} label="Warning" showValue />
      <Progress variant="destructive" value={85} label="Destructive" showValue />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-5 max-w-sm">
      <Progress size="sm" value={60} label="Small" showValue />
      <Progress size="md" value={60} label="Medium" showValue />
      <Progress size="lg" value={60} label="Large" showValue />
    </div>
  ),
};
