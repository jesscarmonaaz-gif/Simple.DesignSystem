import * as React from "react";
import { cn } from "@/lib/utils";
import { SidebarMenuItem, type SidebarMenuItemProps } from "./sidebar-menu-item";

/* ── Types ── */

export interface SidebarItem {
  /** Display label */
  label: string;
  /** Optional icon rendered at 20×20 */
  icon?: React.ReactNode;
  /** Navigates to this URL when clicked (used with default <a> or LinkComponent) */
  href?: string;
  /** Called on click (works alongside href) */
  onClick?: (e: React.MouseEvent) => void;
  /** Marks this item as the current/active page */
  active?: boolean;
  /** Prevents interaction */
  disabled?: boolean;
  /** Optional nested items — renders as an expandable subgroup */
  items?: SidebarMenuItemProps[];
  /** Whether a subgroup is open by default */
  defaultOpen?: boolean;
}

export interface SidebarGroup {
  /** Optional section heading rendered above the items */
  label?: string;
  items: SidebarItem[];
}

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Navigation groups */
  groups: SidebarGroup[];
  /** Slot for logo / brand at the very top */
  header?: React.ReactNode;
  /** Slot for content pinned to the bottom (user info, logout…) */
  footer?: React.ReactNode;
  /** Collapse to icon-only mode */
  collapsed?: boolean;
  /**
   * Custom link component for client-side routing (e.g. React Router's Link).
   * It receives `to` and `className` props. Defaults to a standard <a> tag.
   * @example linkComponent={Link} // from react-router-dom
   */
  linkComponent?: React.ComponentType<any>;
}

/* ── Sidebar ── */

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    { className, groups, header, footer, collapsed = false, linkComponent, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-[width] duration-200",
          collapsed ? "w-20" : "w-64",
          className,
        )}
        {...props}
      >
        {/* Header slot */}
        {header && (
          <div
            className={cn(
              "flex items-center px-4 py-3 shrink-0",
              collapsed && "justify-center px-0",
            )}
          >
            {header}
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-6">
          {groups.map((group, gi) => (
            <div key={gi} className="flex flex-col gap-1.5">
              {/* Section heading — hidden when collapsed */}
              {group.label && !collapsed && (
                <p className="px-3 mb-1 text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider select-none">
                  {group.label}
                </p>
              )}

              {group.items.map((item, ii) => (
                <SidebarMenuItem
                  key={ii}
                  {...item}
                  collapsed={collapsed}
                  linkComponent={linkComponent}
                />
              ))}
            </div>
          ))}
        </nav>

        {/* Footer slot */}
        {footer && (
          <div
            className={cn(
              "shrink-0 border-t border-sidebar-border px-2 py-3",
              collapsed && "flex justify-center",
            )}
          >
            {footer}
          </div>
        )}
      </div>
    );
  },
);
Sidebar.displayName = "Sidebar";

export { Sidebar };
