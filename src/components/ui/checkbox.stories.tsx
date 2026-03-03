import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Primitives/Controls/Checkbox",
  component: Checkbox,
  argTypes: {
    state: { control: "select", options: ["default", "error"] },
    checked: {
      control: "select",
      options: [false, true, "indeterminate"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Accept terms and conditions",
    state: "default",
    checked: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  args: { checked: false },
};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { checked: "indeterminate" },
};

export const WithHelperText: Story = {
  args: {
    checked: false,
    helperText: "You must accept to continue.",
  },
};

export const Error: Story = {
  args: {
    checked: false,
    state: "error",
    helperText: "This field is required.",
  },
};

export const Required: Story = {
  args: {
    checked: false,
    required: true,
    label: "I agree to the privacy policy",
  },
};

export const Disabled: Story = {
  args: { checked: false, disabled: true },
};

export const DisabledChecked: Story = {
  args: { checked: true, disabled: true },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Unchecked" checked={false} />
      <Checkbox label="Checked" checked={true} />
      <Checkbox label="Indeterminate" checked="indeterminate" />
      <Checkbox
        label="Error state"
        checked={false}
        state="error"
        helperText="This field is required."
      />
      <Checkbox label="Disabled" checked={false} disabled />
      <Checkbox label="Disabled checked" checked={true} disabled />
    </div>
  ),
};
