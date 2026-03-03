import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./alert";

const defaultActions = [
  { label: "Action", style: "filled" as const },
  { label: "Action", style: "outline" as const },
];

const meta: Meta<typeof Alert> = {
  title: "Primitives/Display/Alert",
  component: Alert,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "destructive", "info"],
    },
    layout: {
      control: "select",
      options: ["inline", "stacked"],
    },
    dismissible: { control: "boolean" },
    badge: { control: "text" },
    title: { control: "text" },
    description: { control: "text" },
  },
  args: {
    variant: "default",
    layout: "inline",
    badge: "New",
    title: "Alert line which displays the main function or reason of the alert.",
    description:
      "Great solutions start with a simple design.",
    actions: defaultActions,
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

/* ── Inline variants ── */
export const DefaultInline: Story = {};

export const SuccessInline: Story = {
  args: { variant: "success" },
};

export const WarningInline: Story = {
  args: { variant: "warning" },
};

export const DestructiveInline: Story = {
  args: { variant: "destructive" },
};

export const InfoInline: Story = {
  args: { variant: "info" },
};

/* ── Stacked variants ── */
export const DefaultStacked: Story = {
  args: { layout: "stacked", dismissible: true },
};

export const SuccessStacked: Story = {
  args: { variant: "success", layout: "stacked", dismissible: true },
};

export const WarningStacked: Story = {
  args: { variant: "warning", layout: "stacked", dismissible: true },
};

export const DestructiveStacked: Story = {
  args: { variant: "destructive", layout: "stacked", dismissible: true },
};

export const InfoStacked: Story = {
  args: { variant: "info", layout: "stacked", dismissible: true },
};

/* ── Without actions ── */
export const TitleOnly: Story = {
  args: {
    description: undefined,
    actions: undefined,
    badge: undefined,
  },
};

export const WithDescription: Story = {
  args: {
    actions: undefined,
    badge: undefined,
  },
};

/* ── All variants overview ── */
export const AllInline: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-2xl">
      <Alert
        variant="default"
        badge="New"
        title="Alert line which displays the main function or reason of the alert."
        description="Great solutions start with a simple design."
        actions={defaultActions}
      />
      <Alert
        variant="success"
        badge="New"
        title="Alert line which displays the main function or reason of the alert."
        description="Great solutions start with a simple design."
        actions={defaultActions}
      />
      <Alert
        variant="warning"
        badge="New"
        title="Alert line which displays the main function or reason of the alert."
        description="Great solutions start with a simple design."
        actions={defaultActions}
      />
      <Alert
        variant="destructive"
        badge="New"
        title="Alert line which displays the main function or reason of the alert."
        description="Great solutions start with a simple design."
        actions={defaultActions}
      />
      <Alert
        variant="info"
        badge="New"
        title="Alert line which displays the main function or reason of the alert."
        description="Great solutions start with a simple design."
        actions={defaultActions}
      />
    </div>
  ),
};

export const AllStacked: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-2xl">
      <Alert
        variant="default"
        layout="stacked"
        badge="New"
        title="Alert line which displays the main function or reason of the alert."
        description="Great solutions start with a simple design."
        actions={defaultActions}
        dismissible
      />
      <Alert
        variant="success"
        layout="stacked"
        badge="New"
        title="Alert line which displays the main function or reason of the alert."
        description="Great solutions start with a simple design."
        actions={defaultActions}
        dismissible
      />
      <Alert
        variant="warning"
        layout="stacked"
        badge="New"
        title="Alert line which displays the main function or reason of the alert."
        description="Great solutions start with a simple design."
        actions={defaultActions}
        dismissible
      />
      <Alert
        variant="destructive"
        layout="stacked"
        badge="New"
        title="Alert line which displays the main function or reason of the alert."
        description="Great solutions start with a simple design."
        actions={defaultActions}
        dismissible
      />
      <Alert
        variant="info"
        layout="stacked"
        badge="New"
        title="Alert line which displays the main function or reason of the alert."
        description="Great solutions start with a simple design."
        actions={defaultActions}
        dismissible
      />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-2xl">
      {(["default", "success", "warning", "destructive", "info"] as const).map(
        (v) => (
          <div key={v} className="flex flex-col gap-3">
            <Alert
              variant={v}
              badge="New"
              title="Alert line which displays the main function or reason of the alert."
              description="Great solutions start with a simple design."
              actions={defaultActions}
            />
            <Alert
              variant={v}
              layout="stacked"
              badge="New"
              title="Alert line which displays the main function or reason of the alert."
              description="Great solutions start with a simple design."
              actions={defaultActions}
              dismissible
            />
          </div>
        ),
      )}
    </div>
  ),
};
