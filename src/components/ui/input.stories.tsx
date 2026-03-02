import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Primitives/Input/Text",
  component: Input,
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
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

export const Email: Story = {
  args: {
    type: "email",
    label: "Email",
    placeholder: "name@example.com",
    helperText: "We'll never share your email.",
  },
};

export const EmailError: Story = {
  args: {
    type: "email",
    label: "Email",
    placeholder: "name@example.com",
    defaultValue: "invalid-email",
    state: "error",
    helperText: "Please enter a valid email address.",
  },
};

export const EmailSuccess: Story = {
  args: {
    type: "email",
    label: "Email",
    placeholder: "name@example.com",
    defaultValue: "john@example.com",
    state: "success",
    helperText: "Email is available.",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    label: "Password",
    placeholder: "Enter password",
    helperText: "Must be at least 8 characters.",
  },
};

export const PasswordError: Story = {
  args: {
    type: "password",
    label: "Password",
    placeholder: "Enter password",
    defaultValue: "123",
    state: "error",
    helperText: "Password must be at least 8 characters.",
  },
};

export const PasswordSuccess: Story = {
  args: {
    type: "password",
    label: "Password",
    placeholder: "Enter password",
    defaultValue: "mySecurePassword123",
    state: "success",
    helperText: "Strong password.",
  },
};

export const File: Story = {
  args: {
    type: "file",
    label: "Upload file",
    helperText: "PNG, JPG up to 10MB.",
  },
};

export const FileError: Story = {
  args: {
    type: "file",
    label: "Upload file",
    state: "error",
    helperText: "File exceeds the 10MB limit.",
  },
};

export const FileSuccess: Story = {
  args: {
    type: "file",
    label: "Upload file",
    state: "success",
    helperText: "File uploaded successfully.",
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
      <Input
        type="email"
        label="Email — Default"
        placeholder="name@example.com"
        helperText="We'll never share your email."
      />
      <Input
        type="email"
        label="Email — Error"
        defaultValue="invalid-email"
        state="error"
        helperText="Please enter a valid email address."
      />
      <Input
        type="email"
        label="Email — Success"
        defaultValue="john@example.com"
        state="success"
        helperText="Email is available."
      />
      <Input
        type="password"
        label="Password — Error"
        defaultValue="123"
        state="error"
        helperText="Password must be at least 8 characters."
      />
      <Input
        type="password"
        label="Password — Success"
        defaultValue="mySecurePassword123"
        state="success"
        helperText="Strong password."
      />
      <Input
        type="file"
        label="File — Error"
        state="error"
        helperText="File exceeds the 10MB limit."
      />
      <Input
        type="file"
        label="File — Success"
        state="success"
        helperText="File uploaded successfully."
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
