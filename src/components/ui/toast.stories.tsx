import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toaster, toast } from "./toast";
import { Button } from "./button";

/* ── Meta ── */

const meta: Meta<typeof Toaster> = {
  title: "Primitives/Display/Toast",
  component: Toaster,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="flex flex-col items-center gap-3 min-w-[320px]">
        <Story />
        <Toaster />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

/* ── Stories ── */

export const Default: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast({ title: "Changes saved", description: "Your settings have been updated." })
      }
    >
      Show toast
    </Button>
  ),
};

export const Success: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          variant: "success",
          title: "Upload complete",
          description: "Your file has been uploaded successfully.",
        })
      }
    >
      Show success
    </Button>
  ),
};

export const Warning: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          variant: "warning",
          title: "Storage almost full",
          description: "You've used 90% of your storage quota.",
        })
      }
    >
      Show warning
    </Button>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "We couldn't process your request. Please try again.",
        })
      }
    >
      Show error
    </Button>
  ),
};

export const Info: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          variant: "info",
          title: "New update available",
          description: "Version 2.1.0 is ready to install.",
        })
      }
    >
      Show info
    </Button>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => toast({ title: "Copied to clipboard" })}
    >
      Title only
    </Button>
  ),
};

export const DescriptionOnly: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast({ description: "Your session will expire in 5 minutes." })
      }
    >
      Description only
    </Button>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          variant: "default",
          title: "Item deleted",
          description: "The record has been removed.",
          action: { label: "Undo", onClick: () => alert("Undo triggered") },
        })
      }
    >
      With action
    </Button>
  ),
};

export const WithActionSuccess: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          variant: "success",
          title: "Payment processed",
          description: "$49.00 charged to Visa ending in 4242.",
          action: { label: "View receipt", onClick: () => alert("View receipt") },
        })
      }
    >
      Success with action
    </Button>
  ),
};

export const AllVariantsStatic: Story = {
  name: "All Variants (auto-fire)",
  render: () => {
    React.useEffect(() => {
      setTimeout(() => toast({ title: "Default", description: "Neutral notification." }), 0);
      setTimeout(() => toast({ variant: "success", title: "Upload complete", description: "File saved successfully." }), 80);
      setTimeout(() => toast({ variant: "warning", title: "Storage almost full", description: "90% of quota used." }), 160);
      setTimeout(() => toast({ variant: "destructive", title: "Something went wrong", description: "Couldn't process your request." }), 240);
      setTimeout(() => toast({ variant: "info", title: "Update available", description: "Version 2.1.0 is ready to install." }), 320);
    }, []);
    return (
      <p className="text-sm text-muted-foreground">
        All 5 variants appear at bottom-right →
      </p>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 justify-center">
      <Button
        size="sm"
        variant="outline"
        onClick={() => toast({ title: "Default toast", description: "A neutral notification." })}
      >
        Default
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => toast({ variant: "success", title: "Success!", description: "Operation completed." })}
      >
        Success
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => toast({ variant: "warning", title: "Warning", description: "Check your settings." })}
      >
        Warning
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => toast({ variant: "destructive", title: "Error", description: "Something went wrong." })}
      >
        Destructive
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => toast({ variant: "info", title: "Info", description: "Here's something to know." })}
      >
        Info
      </Button>
    </div>
  ),
};
