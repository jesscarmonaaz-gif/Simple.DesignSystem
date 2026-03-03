import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  House,
  ChartBar,
  UsersThree,
  GearSix,
  Bell,
  FileText,
  SignOut,
  Folder,
  Star,
} from "@phosphor-icons/react";
import { Sidebar } from "./sidebar";

/* ── Shared demo data ── */

const mainNav = [
  { label: "Home", icon: <House className="h-4 w-4" />, active: true, href: "#" },
  { label: "Analytics", icon: <ChartBar className="h-4 w-4" />, href: "#" },
  { label: "Team", icon: <UsersThree className="h-4 w-4" />, href: "#", badge: 3 },
  { label: "Documents", icon: <FileText className="h-4 w-4" />, href: "#" },
  { label: "Starred", icon: <Star className="h-4 w-4" />, href: "#" },
];

const settingsNav = [
  { label: "Notifications", icon: <Bell className="h-4 w-4" />, href: "#", badge: 12 },
  { label: "Settings", icon: <GearSix className="h-4 w-4" />, href: "#" },
];

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
      <Folder className="h-4 w-4 text-white" />
    </div>
    <span className="font-semibold text-sm">That Simple</span>
  </div>
);

const LogoIcon = () => (
  <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
    <Folder className="h-4 w-4 text-white" />
  </div>
);

const FooterUser = () => (
  <button
    type="button"
    className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-foreground/70 hover:bg-accent hover:text-foreground transition-colors"
  >
    <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center shrink-0">
      <span className="text-xs font-medium">JS</span>
    </div>
    <span className="flex-1 truncate text-left">Jess Carmona</span>
    <SignOut className="h-4 w-4 text-muted-foreground" />
  </button>
);

const FooterIcon = () => (
  <button
    type="button"
    className="flex items-center justify-center w-10 h-10 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
    title="Sign out"
  >
    <SignOut className="h-4 w-4" />
  </button>
);

/* ── Meta ── */

const meta: Meta<typeof Sidebar> = {
  title: "Primitives/Navigation/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
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
    groups: [{ items: mainNav }],
  },
};

export const WithHeader: Story = {
  args: {
    header: <Logo />,
    groups: [{ items: mainNav }],
  },
};

export const WithGroups: Story = {
  args: {
    header: <Logo />,
    groups: [
      { label: "Main", items: mainNav },
      { label: "General", items: settingsNav },
    ],
  },
};

export const WithFooter: Story = {
  args: {
    header: <Logo />,
    groups: [
      { label: "Main", items: mainNav },
      { label: "General", items: settingsNav },
    ],
    footer: <FooterUser />,
  },
};

export const WithBadges: Story = {
  args: {
    header: <Logo />,
    groups: [
      {
        label: "Main",
        items: [
          { label: "Home", icon: <House className="h-4 w-4" />, active: true, href: "#" },
          { label: "Team", icon: <UsersThree className="h-4 w-4" />, href: "#", badge: 3 },
          { label: "Notifications", icon: <Bell className="h-4 w-4" />, href: "#", badge: 12 },
          { label: "Documents", icon: <FileText className="h-4 w-4" />, href: "#" },
        ],
      },
    ],
    footer: <FooterUser />,
  },
};

export const WithDisabledItem: Story = {
  args: {
    header: <Logo />,
    groups: [
      {
        items: [
          { label: "Home", icon: <House className="h-4 w-4" />, active: true, href: "#" },
          { label: "Analytics", icon: <ChartBar className="h-4 w-4" />, href: "#", disabled: true },
          { label: "Team", icon: <UsersThree className="h-4 w-4" />, href: "#" },
          { label: "Settings", icon: <GearSix className="h-4 w-4" />, href: "#" },
        ],
      },
    ],
  },
};

export const Collapsed: Story = {
  args: {
    collapsed: true,
    header: <LogoIcon />,
    groups: [
      {
        items: mainNav.map(({ badge: _b, ...item }) => item),
      },
      {
        items: settingsNav,
      },
    ],
    footer: <FooterIcon />,
  },
};

export const CollapsedWithBadges: Story = {
  args: {
    collapsed: true,
    header: <LogoIcon />,
    groups: [
      { items: mainNav },
      { items: settingsNav },
    ],
    footer: <FooterIcon />,
  },
};

export const NoIcons: Story = {
  args: {
    header: <Logo />,
    groups: [
      {
        label: "Main",
        items: [
          { label: "Home", active: true, href: "#" },
          { label: "Analytics", href: "#" },
          { label: "Team", href: "#" },
          { label: "Documents", href: "#" },
        ],
      },
      {
        label: "Settings",
        items: [
          { label: "Notifications", href: "#" },
          { label: "Settings", href: "#" },
        ],
      },
    ],
  },
};
