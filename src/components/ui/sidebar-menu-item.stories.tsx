import type { Meta, StoryObj } from "@storybook/react";
import {
  House,
  ChartBar,
  Briefcase,
  CalendarBlank,
  FolderSimple,
  UserCircle,
  Gear,
  FileText,
  Receipt,
} from "@phosphor-icons/react";
import { SidebarMenuItem } from "./sidebar-menu-item";

const meta: Meta<typeof SidebarMenuItem> = {
  title: "Primitives/Navigation/SidebarMenuItem",
  component: SidebarMenuItem,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-72 bg-sidebar text-sidebar-foreground border border-sidebar-border rounded-2xl p-3">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    items: { control: false },
    icon: { control: false },
    linkComponent: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof SidebarMenuItem>;

/* ── States ── */

export const Default: Story = {
  args: {
    label: "Painel",
    icon: <House className="h-5 w-5" />,
    href: "#",
  },
};

export const Active: Story = {
  args: {
    label: "Painel",
    icon: <House className="h-5 w-5" />,
    href: "#",
    active: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Relatórios",
    icon: <ChartBar className="h-5 w-5" />,
    href: "#",
    disabled: true,
  },
};

export const WithoutIcon: Story = {
  args: {
    label: "Configurações",
    href: "#",
  },
};

export const Collapsed: Story = {
  decorators: [
    (Story) => (
      <div className="w-20 bg-sidebar text-sidebar-foreground border border-sidebar-border rounded-2xl p-3">
        <Story />
      </div>
    ),
  ],
  args: {
    label: "Painel",
    icon: <House className="h-5 w-5" />,
    href: "#",
    collapsed: true,
    active: true,
  },
};

/* ── Subgroup ── */

export const WithSubgroup: Story = {
  args: {
    label: "Financeiro",
    icon: <Briefcase className="h-5 w-5" />,
    defaultOpen: true,
    items: [
      { label: "Pagamentos", icon: <Receipt className="h-5 w-5" />, href: "#" },
      { label: "Despesas", icon: <FileText className="h-5 w-5" />, href: "#", active: true },
      { label: "Relatório", icon: <ChartBar className="h-5 w-5" />, href: "#" },
    ],
  },
};

export const SubgroupCollapsedByDefault: Story = {
  args: {
    label: "Consultório",
    icon: <CalendarBlank className="h-5 w-5" />,
    items: [
      { label: "Agenda", icon: <CalendarBlank className="h-5 w-5" />, href: "#" },
      { label: "Clientes", icon: <UserCircle className="h-5 w-5" />, href: "#" },
      { label: "Arquivos", icon: <FolderSimple className="h-5 w-5" />, href: "#" },
    ],
  },
};

/* ── Gallery — all variants at once ── */

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      <p className="px-3 mb-1 text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider">
        States
      </p>
      <SidebarMenuItem label="Default" icon={<House className="h-5 w-5" />} href="#" />
      <SidebarMenuItem label="Active" icon={<ChartBar className="h-5 w-5" />} href="#" active />
      <SidebarMenuItem label="Disabled" icon={<Gear className="h-5 w-5" />} href="#" disabled />
      <SidebarMenuItem label="No icon" href="#" />

      <p className="px-3 mt-3 mb-1 text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider">
        Subgroup
      </p>
      <SidebarMenuItem
        label="Financeiro"
        icon={<Briefcase className="h-5 w-5" />}
        defaultOpen
        items={[
          { label: "Pagamentos", icon: <Receipt className="h-5 w-5" />, href: "#" },
          { label: "Despesas", icon: <FileText className="h-5 w-5" />, href: "#", active: true },
          { label: "Relatório", icon: <ChartBar className="h-5 w-5" />, href: "#" },
        ]}
      />
    </div>
  ),
};
