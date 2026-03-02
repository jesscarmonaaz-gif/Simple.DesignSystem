import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./select";

const frameworkOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS" },
  { value: "next", label: "Next.js" },
  { value: "nuxt", label: "Nuxt" },
  { value: "remix", label: "Remix" },
];

const meta: Meta<typeof Select> = {
  title: "Primitives/Select",
  component: Select,
  argTypes: {
    state: {
      control: "select",
      options: ["default", "error"],
    },
    multiple: { control: "boolean" },
    searchable: { control: "boolean" },
    clearable: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    label: { control: "text" },
    helperText: { control: "text" },
    placeholder: { control: "text" },
  },
  args: {
    options: frameworkOptions,
    state: "default",
    placeholder: "Select a framework...",
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

/* ── Single Select ── */
export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: "Framework",
    placeholder: "Select a framework...",
  },
};

export const WithLabelAndHelper: Story = {
  args: {
    label: "Framework",
    placeholder: "Select a framework...",
    helperText: "Choose your preferred framework.",
  },
};

export const Searchable: Story = {
  args: {
    label: "Framework",
    searchable: true,
    placeholder: "Search and select...",
  },
};

export const Clearable: Story = {
  args: {
    label: "Framework",
    clearable: true,
    defaultValue: "react",
  },
};

export const Required: Story = {
  args: {
    label: "Framework",
    required: true,
    helperText: "This field is required.",
  },
};

export const RequiredError: Story = {
  args: {
    label: "Framework",
    required: true,
    state: "error",
    helperText: "Please select a framework.",
  },
};

export const Error: Story = {
  args: {
    label: "Framework",
    state: "error",
    helperText: "Invalid selection.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Framework",
    disabled: true,
    defaultValue: "react",
    helperText: "This field is not editable.",
  },
};

/* ── Multi Select ── */
export const Multi: Story = {
  args: {
    label: "Frameworks",
    multiple: true,
    placeholder: "Select frameworks...",
  },
};

export const MultiWithDefaults: Story = {
  args: {
    label: "Frameworks",
    multiple: true,
    defaultValue: ["react", "next", "remix"],
    helperText: "Select all that apply.",
  },
};

export const MultiSearchable: Story = {
  args: {
    label: "Frameworks",
    multiple: true,
    searchable: true,
    placeholder: "Search frameworks...",
  },
};

export const MultiClearable: Story = {
  args: {
    label: "Frameworks",
    multiple: true,
    clearable: true,
    defaultValue: ["react", "vue"],
  },
};

export const MultiError: Story = {
  args: {
    label: "Frameworks",
    multiple: true,
    state: "error",
    defaultValue: ["react"],
    helperText: "Select at least 2 frameworks.",
  },
};

/* ── Showcase ── */
export const AllSingleStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <Select
        options={frameworkOptions}
        label="Default"
        placeholder="Select..."
      />
      <Select
        options={frameworkOptions}
        label="Searchable"
        searchable
        placeholder="Search..."
      />
      <Select
        options={frameworkOptions}
        label="Error"
        state="error"
        helperText="Invalid selection."
      />
      <Select
        options={frameworkOptions}
        label="Required"
        required
        helperText="This field is required."
      />
      <Select
        options={frameworkOptions}
        label="Disabled"
        disabled
        defaultValue="react"
      />
    </div>
  ),
};

export const AllMultiStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <Select
        options={frameworkOptions}
        label="Multi Default"
        multiple
        placeholder="Select..."
      />
      <Select
        options={frameworkOptions}
        label="Multi Searchable"
        multiple
        searchable
        placeholder="Search..."
      />
      <Select
        options={frameworkOptions}
        label="Multi with Values"
        multiple
        defaultValue={["react", "vue"]}
        clearable
      />
      <Select
        options={frameworkOptions}
        label="Multi Error"
        multiple
        state="error"
        defaultValue={["react"]}
        helperText="Select at least 2."
      />
      <Select
        options={frameworkOptions}
        label="Multi Disabled"
        multiple
        disabled
        defaultValue={["react", "vue"]}
      />
    </div>
  ),
};
