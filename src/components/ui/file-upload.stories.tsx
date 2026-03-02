import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload } from "./file-upload";

const meta: Meta<typeof FileUpload> = {
  title: "Primitives/Input/File",
  component: FileUpload,
  argTypes: {
    variant: {
      control: "select",
      options: ["compact", "full"],
    },
    state: {
      control: "select",
      options: ["default", "error", "success"],
    },
    disabled: { control: "boolean" },
    label: { control: "text" },
    helperText: { control: "text" },
    acceptLabel: { control: "text" },
    maxSizeLabel: { control: "text" },
  },
  args: {
    variant: "compact",
    state: "default",
    acceptLabel: "PNG, JPG, GIF",
    maxSizeLabel: "up to 5MB",
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Compact: Story = {
  args: { variant: "compact" },
};

export const Full: Story = {
  args: { variant: "full" },
};

export const CompactWithLabel: Story = {
  args: {
    variant: "compact",
    label: "Profile Photo",
    helperText: "Upload a square image for best results.",
  },
};

export const FullWithLabel: Story = {
  args: {
    variant: "full",
    label: "Document",
    helperText: "Upload your signed document.",
  },
};

export const CompactError: Story = {
  args: {
    variant: "compact",
    label: "Profile Photo",
    state: "error",
    helperText: "File exceeds the 5MB limit.",
  },
};

export const FullError: Story = {
  args: {
    variant: "full",
    label: "Document",
    state: "error",
    helperText: "Unsupported file format.",
  },
};

export const CompactSuccess: Story = {
  args: {
    variant: "compact",
    label: "Profile Photo",
    state: "success",
    helperText: "File uploaded successfully.",
  },
};

export const FullSuccess: Story = {
  args: {
    variant: "full",
    label: "Document",
    state: "success",
    helperText: "File uploaded successfully.",
  },
};

export const Required: Story = {
  args: {
    variant: "compact",
    label: "Attachment",
    helperText: "This field is required.",
    required: true,
  },
};

export const RequiredError: Story = {
  args: {
    variant: "compact",
    label: "Attachment",
    state: "error",
    helperText: "This field is required.",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    variant: "compact",
    label: "Upload",
    helperText: "Uploads are disabled.",
    disabled: true,
  },
};

export const CustomAccept: Story = {
  args: {
    variant: "full",
    label: "Spreadsheet",
    acceptLabel: "CSV, XLSX",
    maxSizeLabel: "up to 10MB",
    accept: ".csv,.xlsx",
  },
};

export const BothVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 max-w-sm">
      <FileUpload variant="compact" />
      <FileUpload variant="full" />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-8 max-w-sm">
      <FileUpload
        variant="compact"
        label="Compact — Default"
        helperText="Upload a square image for best results."
      />
      <FileUpload
        variant="compact"
        label="Compact — Error"
        state="error"
        helperText="File exceeds the 5MB limit."
      />
      <FileUpload
        variant="compact"
        label="Compact — Success"
        state="success"
        helperText="File uploaded successfully."
      />
      <FileUpload
        variant="full"
        label="Full — Default"
        helperText="Upload your signed document."
      />
      <FileUpload
        variant="full"
        label="Full — Error"
        state="error"
        helperText="Unsupported file format."
      />
      <FileUpload
        variant="full"
        label="Full — Success"
        state="success"
        helperText="File uploaded successfully."
      />
    </div>
  ),
};
