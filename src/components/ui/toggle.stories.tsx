import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./toggle";

const meta: Meta<typeof Toggle> = {
  title: "Primitives/Controls/Toggle",
  component: Toggle,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "success"],
    },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
  args: {
    variant: "default",
    label: "Enable notifications",
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Destructive: Story = {
  args: { variant: "destructive", defaultChecked: true, label: "Delete mode" },
};

export const Success: Story = {
  args: { variant: "success", defaultChecked: true, label: "Active" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
};

export const WithoutLabel: Story = {
  args: { label: undefined, defaultChecked: true },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Toggle variant="default" defaultChecked label="Default (on)" />
      <Toggle variant="destructive" defaultChecked label="Destructive (on)" />
      <Toggle variant="success" defaultChecked label="Success (on)" />
      <Toggle variant="default" label="Default (off)" />
      <Toggle variant="default" disabled label="Disabled (off)" />
      <Toggle variant="default" disabled defaultChecked label="Disabled (on)" />
    </div>
  ),
};
