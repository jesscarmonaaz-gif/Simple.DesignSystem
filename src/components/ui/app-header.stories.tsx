import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  MagnifyingGlass,
  Bell,
  Plus,
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
import { AppHeader } from "./app-header";
import { Button } from "./button";
import { Input } from "./input";
import { Sidebar } from "./sidebar";

/* ── Reusable action presets ── */

const SearchBar = () => (
  <div className="relative">
    <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
    <Input
      placeholder="Search…"
      className="pl-9 h-9 w-56 text-sm"
    />
  </div>
);

const UserAvatar = () => (
  <div className="relative">
    <button
      type="button"
      className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center hover:ring-2 hover:ring-primary/30 transition-all"
      aria-label="User menu"
    >
      <span className="text-xs font-semibold text-primary">SF</span>
    </button>
    <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-success border-2 border-background" />
  </div>
);

const IconBtn = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <button
    type="button"
    aria-label={label}
    className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
  >
    {icon}
  </button>
);

/* ── Sidebar fixture (for Full-layout story) ── */

const SidebarFixture = () => {
  const navItemClass =
    "group flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-foreground/70 hover:bg-accent hover:text-foreground transition-colors w-full text-left";
  const iconClass =
    "h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors";

  return (
    <Sidebar
      header={
        <div className="flex w-full items-center justify-between">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-primary-foreground">TS</span>
          </div>
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      }
      groups={[
        {
          items: [
            { label: "Home",    icon: <House className="h-4 w-4" />,    active: true, href: "#" },
            { label: "Reports", icon: <ChartBar className="h-4 w-4" />, href: "#" },
          ],
        },
        {
          label: "Tools",
          items: [
            { label: "Messages",        icon: <ChatTeardropText className="h-4 w-4" />, href: "#" },
            { label: "Clients",         icon: <UserCircle className="h-4 w-4" />,       href: "#" },
            { label: "Projects",        icon: <Briefcase className="h-4 w-4" />,        href: "#" },
            { label: "Calendar",        icon: <CalendarBlank className="h-4 w-4" />,    href: "#" },
            { label: "Files & Library", icon: <FolderSimple className="h-4 w-4" />,     href: "#" },
            { label: "Campaign",        icon: <Megaphone className="h-4 w-4" />,        href: "#" },
          ],
        },
        {
          label: "Manage",
          items: [
            { label: "Team",         icon: <UsersThree className="h-4 w-4" />,    href: "#" },
            { label: "Integrations", icon: <PlugsConnected className="h-4 w-4" />, href: "#" },
          ],
        },
      ]}
      footer={
        <div className="flex flex-col gap-0.5">
          <button type="button" className={navItemClass}>
            <Lifebuoy className={iconClass} />
            <span>Support</span>
          </button>
          <button type="button" className={navItemClass}>
            <GearSix className={iconClass} />
            <span>Settings</span>
          </button>
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
            <button type="button" className="text-muted-foreground hover:text-foreground shrink-0">
              <SignOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      }
    />
  );
};

/* ── Meta ── */

const meta: Meta<typeof AppHeader> = {
  title: "Primitives/Navigation/App Header",
  component: AppHeader,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof AppHeader>;

/* ── Stories ── */

export const Default: Story = {
  args: {
    title: "Home",
    actions: (
      <>
        <SearchBar />
        <IconBtn icon={<Bell className="h-4 w-4" />} label="Notifications" />
        <UserAvatar />
      </>
    ),
  },
};

export const WithBreadcrumb: Story = {
  args: {
    breadcrumb: [
      { label: "Projects", href: "#" },
      { label: "Website Redesign", href: "#" },
      { label: "Design Tokens" },
    ],
    actions: (
      <>
        <SearchBar />
        <UserAvatar />
      </>
    ),
  },
};

export const WithActions: Story = {
  args: {
    title: "Projects",
    actions: (
      <>
        <SearchBar />
        <Button size="sm">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
        <IconBtn icon={<Bell className="h-4 w-4" />} label="Notifications" />
        <UserAvatar />
      </>
    ),
  },
};

export const TitleOnly: Story = {
  args: {
    title: "Settings",
  },
};

export const NoBorder: Story = {
  args: {
    title: "Dashboard",
    bordered: false,
    actions: <UserAvatar />,
  },
};

export const FullLayout: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SidebarFixture />

      {/* Main area */}
      <div className="flex flex-1 flex-col min-w-0">
        <AppHeader
          breadcrumb={[
            { label: "Projects", href: "#" },
            { label: "Website Redesign" },
          ]}
          actions={
            <>
              <SearchBar />
              <Button size="sm">
                <Plus className="h-4 w-4" />
                New
              </Button>
              <IconBtn icon={<Bell className="h-4 w-4" />} label="Notifications" />
              <UserAvatar />
            </>
          }
        />
        <main className="flex-1 overflow-y-auto p-8 bg-muted/30">
          <p className="text-sm text-muted-foreground">Page content area</p>
        </main>
      </div>
    </div>
  ),
};
