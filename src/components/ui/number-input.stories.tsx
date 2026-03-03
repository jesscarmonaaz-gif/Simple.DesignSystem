import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NumberInput } from "./number-input";

const meta: Meta<typeof NumberInput> = {
  title: "Primitives/Input/Number",
  component: NumberInput,
  argTypes: {
    state: {
      control: "select",
      options: ["default", "error", "success"],
    },
    stepper: { control: "boolean" },
    disabled: { control: "boolean" },
    prefix: { control: "text" },
    suffix: { control: "text" },
  },
  args: {
    placeholder: "0",
    state: "default",
    stepper: false,
  },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

/* ── Basic ── */

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: "Quantity",
    placeholder: "0",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Quantity",
    placeholder: "0",
    helperText: "Enter a number between 1 and 100.",
    min: 1,
    max: 100,
  },
};

/* ── Stepper ── */

export const WithStepper: Story = {
  args: {
    label: "Quantity",
    stepper: true,
    defaultValue: 1,
    min: 0,
  },
};

export const StepperWithStep: Story = {
  args: {
    label: "Step by 5",
    stepper: true,
    step: 5,
    defaultValue: 0,
    placeholder: "0",
  },
};

/* ── Currency / Amount ── */

export const Currency: Story = {
  args: {
    label: "Amount",
    prefix: "$",
    placeholder: "0.00",
    step: 0.01,
    min: 0,
  },
};

export const CurrencyEuro: Story = {
  args: {
    label: "Amount",
    prefix: "€",
    placeholder: "0.00",
    step: 0.01,
    min: 0,
  },
};

export const CurrencyWithStepper: Story = {
  args: {
    label: "Amount",
    prefix: "$",
    stepper: true,
    defaultValue: 10,
    min: 0,
    step: 1,
    helperText: "Minimum order: $1",
  },
};

/* ── Suffix / Unit ── */

export const Percentage: Story = {
  args: {
    label: "Discount",
    suffix: "%",
    placeholder: "0",
    min: 0,
    max: 100,
  },
};

export const Weight: Story = {
  args: {
    label: "Weight",
    suffix: "kg",
    placeholder: "0.0",
    step: 0.1,
    min: 0,
  },
};

export const PrefixAndSuffix: Story = {
  args: {
    label: "Rate",
    prefix: "$",
    suffix: "/ hr",
    placeholder: "0.00",
    step: 0.5,
    min: 0,
  },
};

/* ── States ── */

export const Error: Story = {
  args: {
    label: "Quantity",
    stepper: true,
    defaultValue: -1,
    min: 0,
    state: "error",
    helperText: "Quantity must be greater than 0.",
  },
};

export const Success: Story = {
  args: {
    label: "Quantity",
    stepper: true,
    defaultValue: 5,
    min: 1,
    state: "success",
    helperText: "Looks good!",
  },
};

export const Required: Story = {
  args: {
    label: "Quantity",
    placeholder: "0",
    required: true,
    helperText: "This field is required.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Quantity",
    stepper: true,
    defaultValue: 3,
    disabled: true,
    helperText: "This field is not editable.",
  },
};

/* ── All variants overview ── */

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <NumberInput label="Plain number" placeholder="0" />
      <NumberInput
        label="With stepper"
        stepper
        defaultValue={1}
        min={0}
      />
      <NumberInput
        label="Currency (prefix)"
        prefix="$"
        placeholder="0.00"
        step={0.01}
        min={0}
      />
      <NumberInput
        label="Percentage (suffix)"
        suffix="%"
        placeholder="0"
        min={0}
        max={100}
      />
      <NumberInput
        label="Rate (prefix + suffix)"
        prefix="$"
        suffix="/ hr"
        placeholder="0.00"
        step={0.5}
        min={0}
      />
      <NumberInput
        label="Currency with stepper"
        prefix="$"
        stepper
        defaultValue={10}
        min={0}
      />
      <NumberInput
        label="Error state"
        stepper
        defaultValue={-1}
        state="error"
        helperText="Quantity must be greater than 0."
      />
      <NumberInput
        label="Success state"
        stepper
        defaultValue={5}
        state="success"
        helperText="Looks good!"
      />
      <NumberInput
        label="Disabled"
        stepper
        defaultValue={3}
        disabled
      />
    </div>
  ),
};
