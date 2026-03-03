import type { Meta, StoryObj } from "@storybook/react";
import { EmailInput } from "./email-input";

const meta: Meta<typeof EmailInput> = {
  title: "Primitives/Input/Email",
  component: EmailInput,
  argTypes: {
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
    state: "default",
  },
};

export default meta;
type Story = StoryObj<typeof EmailInput>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: "Email address",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Email address",
    helperText: "We'll never share your email.",
  },
};

export const Error: Story = {
  args: {
    label: "Email address",
    defaultValue: "invalid-email",
    state: "error",
    helperText: "Please enter a valid email address.",
  },
};

export const Success: Story = {
  args: {
    label: "Email address",
    defaultValue: "john@example.com",
    state: "success",
    helperText: "Email is available.",
  },
};

export const Required: Story = {
  args: {
    label: "Email address",
    helperText: "This field is required.",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Email address",
    defaultValue: "john@example.com",
    helperText: "This field is not editable.",
    disabled: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <EmailInput
        label="Default"
        helperText="We'll never share your email."
      />
      <EmailInput
        label="Error"
        defaultValue="invalid-email"
        state="error"
        helperText="Please enter a valid email address."
      />
      <EmailInput
        label="Success"
        defaultValue="john@example.com"
        state="success"
        helperText="Email is available."
      />
      <EmailInput
        label="Required"
        helperText="This field is required."
        required
      />
      <EmailInput
        label="Disabled"
        defaultValue="john@example.com"
        disabled
      />
    </div>
  ),
};
