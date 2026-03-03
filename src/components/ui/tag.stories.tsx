import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { X, Plus, Check } from "@phosphor-icons/react";
import { Tag } from "./tag";

const meta: Meta<typeof Tag> = {
  title: "Primitives/Display/Tag",
  component: Tag,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "info",
        "success",
        "warning",
        "destructive",
      ],
    },
  },
  args: {
    children: "Label",
    variant: "default",
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

/* ── Single stories ── */

export const Default: Story = {};

export const WithXIcon: Story = {
  args: {
    icon: <X size={12} />,
    onIconClick: () => alert("Remove clicked"),
  },
};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Info: Story = {
  args: { variant: "info" },
};

export const Success: Story = {
  args: { variant: "success", children: "Complete" },
};

export const Warning: Story = {
  args: { variant: "warning", children: "Pending" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Error" },
};

/* ── All variants – no icon ── */

export const AllVariantsNoIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Tag variant="default">Default</Tag>
      <Tag variant="secondary">Secondary</Tag>
      <Tag variant="info">Info</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="destructive">Destructive</Tag>
    </div>
  ),
};

/* ── All variants – with X icon ── */

export const AllVariantsWithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Tag variant="default" icon={<X size={12} />}>Default</Tag>
      <Tag variant="secondary" icon={<X size={12} />}>Secondary</Tag>
      <Tag variant="info" icon={<X size={12} />}>Info</Tag>
      <Tag variant="success" icon={<X size={12} />}>Success</Tag>
      <Tag variant="warning" icon={<X size={12} />}>Warning</Tag>
      <Tag variant="destructive" icon={<X size={12} />}>Destructive</Tag>
    </div>
  ),
};

/* ── Other icon examples ── */

export const WithPlusIcon: Story = {
  args: {
    icon: <Plus size={12} />,
    children: "Add tag",
  },
};

export const WithCheckIcon: Story = {
  args: {
    variant: "success",
    icon: <Check size={12} />,
    children: "Verified",
  },
};

/* ── Dismissible showcase ── */

function DismissibleExample() {
  const initialTags = [
    { id: 1, label: "Design", variant: "default" as const },
    { id: 2, label: "Development", variant: "info" as const },
    { id: 3, label: "Marketing", variant: "success" as const },
    { id: 4, label: "Pending review", variant: "warning" as const },
    { id: 5, label: "Blocked", variant: "destructive" as const },
  ];
  const [tags, setTags] = React.useState(initialTags);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <Tag
            key={tag.id}
            variant={tag.variant}
            icon={<X size={12} />}
            onIconClick={() =>
              setTags((prev) => prev.filter((t) => t.id !== tag.id))
            }
            iconLabel={`Remove ${tag.label}`}
          >
            {tag.label}
          </Tag>
        ))}
      </div>
      {tags.length === 0 && (
        <p className="text-sm text-muted-foreground">
          All tags removed. Refresh to reset.
        </p>
      )}
    </div>
  );
}

export const DismissibleTags: Story = {
  render: () => <DismissibleExample />,
};
