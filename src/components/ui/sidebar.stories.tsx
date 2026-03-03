import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  House,
  ChartBar,
  ChatTeardropText,
  UserCircle,
  Briefcase,
  CalendarBlank,
  FolderSimple,
  Megaphone,
  UsersThree,
  PlugsConnected,
  Lifebuoy,
  GearSix,
  List,
  SignOut,
} from "@phosphor-icons/react";
import { Sidebar } from "./sidebar";

/* ── Shared nav groups ── */

const mainItems = [
  { label: "Home",    icon: <House className="h-4 w-4" />,    active: true, href: "#" },
  { label: "Reports", icon: <ChartBar className="h-4 w-4" />, href: "#" },
];

const toolsItems = [
  { label: "Messages",       icon: <ChatTeardropText className="h-4 w-4" />, href: "#" },
  { label: "Clients",        icon: <UserCircle className="h-4 w-4" />,       href: "#" },
  { label: "Projects",       icon: <Briefcase className="h-4 w-4" />,        href: "#" },
  { label: "Calendar",       icon: <CalendarBlank className="h-4 w-4" />,    href: "#" },
  { label: "Files & Library",icon: <FolderSimple className="h-4 w-4" />,     href: "#" },
  { label: "Campaign",       icon: <Megaphone className="h-4 w-4" />,        href: "#" },
];

const manageItems = [
  { label: "Team",         icon: <UsersThree className="h-4 w-4" />,    href: "#" },
  { label: "Integrations", icon: <PlugsConnected className="h-4 w-4" />, href: "#" },
];

/* ── Header ── */

const Header = () => (
  <div className="flex w-full items-center justify-between">
    <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center shrink-0">
      <span className="text-xs font-bold text-primary-foreground">TS</span>
    </div>
    <button
      type="button"
      className="text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Toggle menu"
    >
      <List className="h-4 w-4" />
    </button>
  </div>
);

const HeaderIcon = () => (
  <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center shrink-0">
    <span className="text-xs font-bold text-primary-foreground">TS</span>
  </div>
);

/* ── Footer ── */

const navItemClass =
  "group flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-foreground/70 hover:bg-accent hover:text-foreground transition-colors w-full text-left";

const iconClass =
  "h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors";

const Footer = () => (
  <div className="flex flex-col gap-0.5">
    {/* Support */}
    <button type="button" className={navItemClass}>
      <Lifebuoy className={iconClass} />
      <span>Support</span>
    </button>

    {/* Settings */}
    <button type="button" className={navItemClass}>
      <GearSix className={iconClass} />
      <span>Settings</span>
    </button>

    {/* User profile row */}
    <div className="flex items-center gap-2.5 rounded-md px-3 py-2 mt-1">
      <div className="relative shrink-0">
        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-xs font-semibold text-primary">SF</span>
        </div>
        <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-success border-2 border-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">Sofia Fabila</p>
        <p className="text-xs text-muted-foreground truncate">sofiafabila@email.com</p>
      </div>
      <button
        type="button"
        className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
        aria-label="Sign out"
      >
        <SignOut className="h-4 w-4" />
      </button>
    </div>
  </div>
);

const FooterCollapsed = () => (
  <div className="flex flex-col items-center gap-1">
    <button
      type="button"
      className="flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
      title="Support"
    >
      <Lifebuoy className="h-4 w-4" />
    </button>
    <button
      type="button"
      className="flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
      title="Settings"
    >
      <GearSix className="h-4 w-4" />
    </button>
    <div className="relative mt-1">
      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
        <span className="text-xs font-semibold text-primary">SF</span>
      </div>
      <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-success border-2 border-white" />
    </div>
  </div>
);

/* ── Meta ── */

const meta: Meta<typeof Sidebar> = {
  title: "Primitives/Navigation/Sidebar",
  component: Sidebar,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="h-screen flex">
        <Story />
        <div className="flex-1 p-8 bg-muted/30">
          <p className="text-sm text-muted-foreground">Page content area</p>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

/* ── Stories ── */

export const Default: Story = {
  args: {
    header: <Header />,
    groups: [
      { items: mainItems },
      { label: "Tools",  items: toolsItems  },
      { label: "Manage", items: manageItems },
    ],
    footer: <Footer />,
  },
};

export const Collapsed: Story = {
  args: {
    collapsed: true,
    header: <HeaderIcon />,
    groups: [
      { items: mainItems },
      { items: toolsItems  },
      { items: manageItems },
    ],
    footer: <FooterCollapsed />,
  },
};

export const WithDisabledItem: Story = {
  args: {
    header: <Header />,
    groups: [
      {
        items: [
          { label: "Home",    icon: <House className="h-4 w-4" />,    active: true, href: "#" },
          { label: "Reports", icon: <ChartBar className="h-4 w-4" />, href: "#", disabled: true },
        ],
      },
      {
        label: "Tools",
        items: [
          { label: "Messages", icon: <ChatTeardropText className="h-4 w-4" />, href: "#" },
          { label: "Clients",  icon: <UserCircle className="h-4 w-4" />,       href: "#", disabled: true },
          { label: "Projects", icon: <Briefcase className="h-4 w-4" />,        href: "#" },
        ],
      },
    ],
    footer: <Footer />,
  },
};

export const NoIcons: Story = {
  args: {
    header: <Header />,
    groups: [
      { items: [
        { label: "Home",    active: true, href: "#" },
        { label: "Reports", href: "#" },
      ]},
      { label: "Tools", items: [
        { label: "Messages",        href: "#" },
        { label: "Clients",         href: "#" },
        { label: "Projects",        href: "#" },
        { label: "Calendar",        href: "#" },
        { label: "Files & Library", href: "#" },
        { label: "Campaign",        href: "#" },
      ]},
      { label: "Manage", items: [
        { label: "Team",         href: "#" },
        { label: "Integrations", href: "#" },
      ]},
    ],
    footer: <Footer />,
  },
};
