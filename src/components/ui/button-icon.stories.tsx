import type { Meta, StoryObj } from "@storybook/react";
import { CaretRight, Plus, PencilSimple, Trash, GearSix } from "@phosphor-icons/react";
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
  args: { variant: "outline", size: "icon", children: <PencilSimple /> },
};

export const OutlineSmall: Story = {
  args: { variant: "outline", size: "icon-sm", children: <PencilSimple /> },
};

export const OutlineLarge: Story = {
  args: { variant: "outline", size: "icon-lg", children: <PencilSimple /> },
};

export const Secondary: Story = {
  args: { variant: "secondary", size: "icon", children: <GearSix /> },
};

export const Destructive: Story = {
  args: { variant: "destructive", size: "icon", children: <Trash /> },
};

export const Ghost: Story = {
  args: { variant: "ghost", size: "icon", children: <CaretRight /> },
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
          <Button variant="outline" size="icon-sm"><PencilSimple /></Button>
          <Button variant="outline" size="icon"><PencilSimple /></Button>
          <Button variant="outline" size="icon-lg"><PencilSimple /></Button>
        </div>
      </div>
      {/* Secondary */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">Secondary</span>
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="icon-sm"><GearSix /></Button>
          <Button variant="secondary" size="icon"><GearSix /></Button>
          <Button variant="secondary" size="icon-lg"><GearSix /></Button>
        </div>
      </div>
      {/* Destructive */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">Destructive</span>
        <div className="flex items-center gap-4">
          <Button variant="destructive" size="icon-sm"><Trash /></Button>
          <Button variant="destructive" size="icon"><Trash /></Button>
          <Button variant="destructive" size="icon-lg"><Trash /></Button>
        </div>
      </div>
      {/* Ghost */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">Ghost</span>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon-sm"><CaretRight /></Button>
          <Button variant="ghost" size="icon"><CaretRight /></Button>
          <Button variant="ghost" size="icon-lg"><CaretRight /></Button>
        </div>
      </div>
    </div>
  ),
};
