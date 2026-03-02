import type { Meta, StoryObj } from "@storybook/react";
import { PhoneInput } from "./phone-input";

const meta: Meta<typeof PhoneInput> = {
  title: "Primitives/Input/Phone",
  component: PhoneInput,
  argTypes: {
    state: {
      control: "select",
      options: ["default", "error", "success"],
    },
    defaultCountry: {
      control: "select",
      options: ["US", "MX", "GB", "ES", "FR", "DE", "BR", "CA"],
    },
    disabled: { control: "boolean" },
    label: { control: "text" },
    helperText: { control: "text" },
  },
  args: {
    placeholder: "(555) 123-4567",
    defaultCountry: "US",
    state: "default",
  },
};

export default meta;
type Story = StoryObj<typeof PhoneInput>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: "Phone Number",
    placeholder: "(555) 123-4567",
  },
};

export const WithLabelAndHelper: Story = {
  args: {
    label: "Phone Number",
    placeholder: "(555) 123-4567",
    helperText: "Include area code.",
  },
};

export const Required: Story = {
  args: {
    label: "Phone Number",
    placeholder: "(555) 123-4567",
    helperText: "This field is required.",
    required: true,
  },
};

export const RequiredError: Story = {
  args: {
    label: "Phone Number",
    placeholder: "(555) 123-4567",
    state: "error",
    helperText: "This field is required.",
    required: true,
  },
};

export const Error: Story = {
  args: {
    label: "Phone Number",
    placeholder: "(555) 123-4567",
    state: "error",
    helperText: "Please enter a valid phone number.",
  },
};

export const Success: Story = {
  args: {
    label: "Phone Number",
    placeholder: "(555) 123-4567",
    state: "success",
    helperText: "Phone number verified.",
  },
};

export const Mexico: Story = {
  args: {
    label: "Teléfono",
    placeholder: "55 1234 5678",
    defaultCountry: "MX",
    helperText: "Incluye tu lada.",
  },
};

export const Spain: Story = {
  args: {
    label: "Teléfono",
    placeholder: "612 345 678",
    defaultCountry: "ES",
  },
};

export const Disabled: Story = {
  args: {
    label: "Phone Number",
    placeholder: "(555) 123-4567",
    helperText: "This field is not editable.",
    disabled: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <PhoneInput
        label="Phone — Default"
        placeholder="(555) 123-4567"
        helperText="Include area code."
      />
      <PhoneInput
        label="Phone — Required"
        placeholder="(555) 123-4567"
        helperText="This field is required."
        required
      />
      <PhoneInput
        label="Phone — Error"
        placeholder="(555) 123-4567"
        state="error"
        helperText="Please enter a valid phone number."
      />
      <PhoneInput
        label="Phone — Success"
        placeholder="(555) 123-4567"
        state="success"
        helperText="Phone number verified."
      />
      <PhoneInput
        label="Phone — Disabled"
        placeholder="(555) 123-4567"
        helperText="This field is not editable."
        disabled
      />
    </div>
  ),
};
