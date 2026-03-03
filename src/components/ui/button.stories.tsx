import type { Meta, StoryObj } from "@storybook/react";
import { EnvelopeSimple, CircleNotch } from "@phosphor-icons/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button/Text",
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
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: "sm", children: "Small" },
};

export const Large: Story = {
  args: { size: "lg", children: "Large" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Ghost" },
};

export const Link: Story = {
  args: { variant: "link", children: "Link" },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <EnvelopeSimple /> Login with Email
      </>
    ),
  },
};

export const Loading: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <CircleNotch className="animate-spin" /> Please wait
      </>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const SizesByVariant: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Default */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">Default</span>
        <div className="flex items-center gap-4">
          <Button variant="default" size="sm">Small</Button>
          <Button variant="default" size="default">Medium</Button>
          <Button variant="default" size="lg">Large</Button>
        </div>
      </div>
      {/* Secondary */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">Secondary</span>
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="sm">Small</Button>
          <Button variant="secondary" size="default">Medium</Button>
          <Button variant="secondary" size="lg">Large</Button>
        </div>
      </div>
      {/* Destructive */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">Destructive</span>
        <div className="flex items-center gap-4">
          <Button variant="destructive" size="sm">Small</Button>
          <Button variant="destructive" size="default">Medium</Button>
          <Button variant="destructive" size="lg">Large</Button>
        </div>
      </div>
      {/* Outline */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">Outline</span>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">Small</Button>
          <Button variant="outline" size="default">Medium</Button>
          <Button variant="outline" size="lg">Large</Button>
        </div>
      </div>
    </div>
  ),
};
