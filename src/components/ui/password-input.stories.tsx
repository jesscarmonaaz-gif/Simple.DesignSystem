import type { Meta, StoryObj } from "@storybook/react";
import { PasswordInput } from "./password-input";

const meta: Meta<typeof PasswordInput> = {
  title: "Primitives/Input/Password",
  component: PasswordInput,
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
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: "Password",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Password",
    helperText: "Must be at least 8 characters.",
  },
};

export const Error: Story = {
  args: {
    label: "Password",
    defaultValue: "123",
    state: "error",
    helperText: "Password must be at least 8 characters.",
  },
};

export const Success: Story = {
  args: {
    label: "Password",
    defaultValue: "mySecurePassword123",
    state: "success",
    helperText: "Strong password.",
  },
};

export const Required: Story = {
  args: {
    label: "Password",
    helperText: "This field is required.",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Password",
    defaultValue: "mySecurePassword123",
    helperText: "This field is not editable.",
    disabled: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <PasswordInput
        label="Default"
        helperText="Must be at least 8 characters."
      />
      <PasswordInput
        label="Error"
        defaultValue="123"
        state="error"
        helperText="Password must be at least 8 characters."
      />
      <PasswordInput
        label="Success"
        defaultValue="mySecurePassword123"
        state="success"
        helperText="Strong password."
      />
      <PasswordInput
        label="Required"
        helperText="This field is required."
        required
      />
      <PasswordInput
        label="Disabled"
        defaultValue="mySecurePassword123"
        disabled
      />
    </div>
  ),
};
