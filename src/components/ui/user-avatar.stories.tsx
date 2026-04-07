import type { Meta, StoryObj } from "@storybook/react";
import { UserAvatar } from "./user-avatar";

const meta: Meta<typeof UserAvatar> = {
  title: "Primitives/Data Display/UserAvatar",
  component: UserAvatar,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="bg-sidebar p-4 rounded-2xl w-72">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UserAvatar>;

export const Default: Story = {
  args: { name: "Julia Egito" },
};

export const WithStatus: Story = {
  args: { name: "Julia Egito", status: "online" },
};

export const WithDetails: Story = {
  args: {
    name: "Julia Egito",
    email: "julia@simple.care",
    status: "online",
    showDetails: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <UserAvatar name="Julia Egito" size="sm" status="online" />
      <UserAvatar name="Julia Egito" size="md" status="online" />
      <UserAvatar name="Julia Egito" size="lg" status="online" />
    </div>
  ),
};

export const NonInteractive: Story = {
  args: { name: "Julia Egito", interactive: false, status: "online" },
};
