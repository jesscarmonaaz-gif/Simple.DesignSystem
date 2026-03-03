import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Primitives/Display/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "success",
        "warning",
        "info",
        "cancelled",
      ],
    },
    filled: { control: "boolean" },
    indicator: { control: "boolean" },
  },
  args: {
    children: "Badge",
    variant: "default",
    filled: false,
    indicator: true,
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Archived" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Error" },
};

export const Cancelled: Story = {
  args: { variant: "cancelled", children: "Cancelled" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
};

export const Success: Story = {
  args: { variant: "success", children: "Complete" },
};

export const Warning: Story = {
  args: { variant: "warning", children: "Pending" },
};

export const Info: Story = {
  args: { variant: "info", children: "Active" },
};

export const FilledDefault: Story = {
  args: { variant: "default", filled: true, children: "Default" },
};

export const FilledSuccess: Story = {
  args: { variant: "success", filled: true, children: "Complete" },
};

export const FilledWarning: Story = {
  args: { variant: "warning", filled: true, children: "Pending" },
};

export const FilledCancelled: Story = {
  args: { variant: "cancelled", filled: true, children: "Cancelled" },
};

export const FilledInfo: Story = {
  args: { variant: "info", filled: true, children: "Active" },
};

export const FilledDestructive: Story = {
  args: { variant: "destructive", filled: true, children: "Error" },
};

export const WithoutIndicator: Story = {
  args: { variant: "success", children: "No indicator", indicator: false },
};

export const AllFilled: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success" filled>Confirmed</Badge>
      <Badge variant="default" filled>Default</Badge>
      <Badge variant="warning" filled>Warning</Badge>
      <Badge variant="cancelled" filled>Cancelled</Badge>
      <Badge variant="info" filled>Active</Badge>
    </div>
  ),
};

export const AllOutlined: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success">Confirmed</Badge>
      <Badge variant="default">Default</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="cancelled">Cancelled</Badge>
      <Badge variant="info">Active</Badge>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="success" filled>Confirmed</Badge>
        <Badge variant="default" filled>Default</Badge>
        <Badge variant="warning" filled>Warning</Badge>
        <Badge variant="cancelled" filled>Cancelled</Badge>
        <Badge variant="info" filled>Active</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="success">Confirmed</Badge>
        <Badge variant="default">Default</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="cancelled">Cancelled</Badge>
        <Badge variant="info">Active</Badge>
      </div>
    </div>
  ),
};
