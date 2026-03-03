import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./radio";

const basicOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const meta: Meta<typeof RadioGroup> = {
  title: "Primitives/Controls/Radio",
  component: RadioGroup,
  argTypes: {
    state: { control: "select", options: ["default", "error"] },
    orientation: { control: "select", options: ["vertical", "horizontal"] },
    disabled: { control: "boolean" },
  },
  args: {
    options: basicOptions,
    label: "Select an option",
    state: "default",
    orientation: "vertical",
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {};

export const WithDefaultValue: Story = {
  args: { defaultValue: "option2" },
};

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    defaultValue: "option1",
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: "Choose the option that best applies.",
    defaultValue: "option1",
  },
};

export const Error: Story = {
  args: {
    state: "error",
    helperText: "Please select an option to continue.",
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "option1" },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: "opt1", label: "Available" },
      { value: "opt2", label: "Disabled option", disabled: true },
      { value: "opt3", label: "Also available" },
    ],
    defaultValue: "opt1",
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <RadioGroup
        label="Default"
        options={basicOptions}
        defaultValue="option2"
      />
      <RadioGroup
        label="Error"
        options={basicOptions}
        state="error"
        helperText="Please select one."
      />
      <RadioGroup
        label="Disabled"
        options={basicOptions}
        defaultValue="option1"
        disabled
      />
      <RadioGroup
        label="Horizontal"
        options={basicOptions}
        defaultValue="option1"
        orientation="horizontal"
      />
    </div>
  ),
};
