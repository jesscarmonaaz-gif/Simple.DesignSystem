import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./date-picker";

const meta: Meta<typeof DatePicker> = {
  title: "Primitives/Input/DatePicker",
  component: DatePicker,
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
    placeholder: "Select a date",
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

/* ── Basic ── */

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: "Date",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Date",
    helperText: "Choose the appointment date.",
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: "Date",
    defaultValue: new Date(2026, 2, 15), // March 15, 2026
  },
};

/* ── States ── */

export const Error: Story = {
  args: {
    label: "Date",
    state: "error",
    helperText: "Please select a valid date.",
  },
};

export const Success: Story = {
  args: {
    label: "Date",
    defaultValue: new Date(2026, 2, 15),
    state: "success",
    helperText: "Date confirmed.",
  },
};

export const Required: Story = {
  args: {
    label: "Date",
    required: true,
    helperText: "This field is required.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Date",
    defaultValue: new Date(2026, 2, 15),
    helperText: "This field is not editable.",
    disabled: true,
  },
};

/* ── Constrained range ── */

export const WithMinDate: Story = {
  args: {
    label: "Appointment",
    minDate: new Date(),
    helperText: "Only future dates are available.",
  },
};

export const WithMinAndMaxDate: Story = {
  args: {
    label: "Booking window",
    minDate: new Date(2026, 2, 1),
    maxDate: new Date(2026, 2, 31),
    helperText: "Bookings available in March 2026 only.",
  },
};

/* ── All states overview ── */

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <DatePicker
        label="Default"
        helperText="Choose a date."
      />
      <DatePicker
        label="With value"
        defaultValue={new Date(2026, 2, 15)}
        helperText="March 15, 2026 pre-selected."
      />
      <DatePicker
        label="Error"
        state="error"
        helperText="Please select a valid date."
      />
      <DatePicker
        label="Success"
        defaultValue={new Date(2026, 2, 15)}
        state="success"
        helperText="Date confirmed."
      />
      <DatePicker
        label="Required"
        required
        helperText="This field is required."
      />
      <DatePicker
        label="Disabled"
        defaultValue={new Date(2026, 2, 15)}
        disabled
      />
    </div>
  ),
};
