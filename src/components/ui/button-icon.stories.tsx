import type { Meta, StoryObj } from "@storybook/react";
import { ChevronRight, Plus, Pencil, Trash2, Settings } from "lucide-react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button/Icon",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
      ],
    },
    size: {
      control: "select",
      options: ["icon-sm", "icon", "icon-lg"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    children: <Plus />,
    variant: "default",
    size: "icon",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: "icon-sm", children: <Plus /> },
};

export const Large: Story = {
  args: { size: "icon-lg", children: <Plus /> },
};

export const Outline: Story = {
  args: { variant: "outline", size: "icon", children: <Pencil /> },
};

export const OutlineSmall: Story = {
  args: { variant: "outline", size: "icon-sm", children: <Pencil /> },
};

export const OutlineLarge: Story = {
  args: { variant: "outline", size: "icon-lg", children: <Pencil /> },
};

export const Secondary: Story = {
  args: { variant: "secondary", size: "icon", children: <Settings /> },
};

export const Destructive: Story = {
  args: { variant: "destructive", size: "icon", children: <Trash2 /> },
};

export const Ghost: Story = {
  args: { variant: "ghost", size: "icon", children: <ChevronRight /> },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Default (filled) */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">Default</span>
        <div className="flex items-center gap-4">
          <Button variant="default" size="icon-sm"><Plus /></Button>
          <Button variant="default" size="icon"><Plus /></Button>
          <Button variant="default" size="icon-lg"><Plus /></Button>
        </div>
      </div>
      {/* Outline */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">Outline</span>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon-sm"><Pencil /></Button>
          <Button variant="outline" size="icon"><Pencil /></Button>
          <Button variant="outline" size="icon-lg"><Pencil /></Button>
        </div>
      </div>
      {/* Secondary */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">Secondary</span>
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="icon-sm"><Settings /></Button>
          <Button variant="secondary" size="icon"><Settings /></Button>
          <Button variant="secondary" size="icon-lg"><Settings /></Button>
        </div>
      </div>
      {/* Destructive */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">Destructive</span>
        <div className="flex items-center gap-4">
          <Button variant="destructive" size="icon-sm"><Trash2 /></Button>
          <Button variant="destructive" size="icon"><Trash2 /></Button>
          <Button variant="destructive" size="icon-lg"><Trash2 /></Button>
        </div>
      </div>
      {/* Ghost */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">Ghost</span>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon-sm"><ChevronRight /></Button>
          <Button variant="ghost" size="icon"><ChevronRight /></Button>
          <Button variant="ghost" size="icon-lg"><ChevronRight /></Button>
        </div>
      </div>
    </div>
  ),
};
