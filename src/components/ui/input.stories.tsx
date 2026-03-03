import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Primitives/Input/Text",
  component: Input,
  argTypes: {
    type: {
      control: "select",
      options: ["text", "number", "search", "tel", "url"],
    },
    state: {
      control: "select",
      options: ["default", "error", "success"],
    },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    label: { control: "text" },
    helperText: { control: "text" },
  },
  args: {
    placeholder: "Placeholder",
    type: "text",
    state: "default",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
  },
};

export const WithHelperText: Story = {
  args: {
    placeholder: "Placeholder",
    helperText: "Helper text",
  },
};

export const WithLabelAndHelper: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    helperText: "Helper text",
  },
};

export const Required: Story = {
  args: {
    label: "Full Name",
    placeholder: "Enter your full name",
    helperText: "This field is required.",
    required: true,
  },
};

export const RequiredError: Story = {
  args: {
    label: "Full Name",
    placeholder: "Enter your full name",
    state: "error",
    helperText: "This field is required.",
    required: true,
  },
};

export const DefaultError: Story = {
  args: {
    label: "Company Name",
    placeholder: "Enter company name",
    defaultValue: "",
    state: "error",
    helperText: "Please fill out this field.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: "Disabled",
    placeholder: "Disabled input",
    helperText: "This field is not editable.",
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <Input
        label="Full Name — Required"
        placeholder="Enter your full name"
        helperText="This field is required."
        required
      />
      <Input
        label="Full Name — Required Error"
        placeholder="Enter your full name"
        state="error"
        helperText="This field is required."
        required
      />
    </div>
  ),
};

export const AllVariations: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <Input placeholder="Input only" />
      <Input label="With label" placeholder="Placeholder" />
      <Input placeholder="Placeholder" helperText="With helper text only" />
      <Input
        label="Label"
        placeholder="Placeholder"
        helperText="Helper text"
      />
      <Input
        label="Disabled"
        placeholder="Placeholder"
        helperText="This field is not editable."
        disabled
      />
    </div>
  ),
};
