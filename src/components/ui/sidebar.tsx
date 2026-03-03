import * as React from "react";
import { cn } from "@/lib/utils";

/* ── Types ── */

export interface SidebarItem {
  /** Display label */
  label: string;
  /** Optional icon rendered at 16×16 */
  icon?: React.ReactNode;
  /** Navigates to this URL when clicked */
  href?: string;
  /** Called on click (works alongside href) */
  onClick?: (e: React.MouseEvent) => void;
  /** Marks this item as the current/active page */
  active?: boolean;
  /** Prevents interaction */
  disabled?: boolean;
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
}

/* ── Sidebar ── */

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    { className, groups, header, footer, collapsed = false, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col h-full bg-white border-r border-border transition-[width] duration-200",
        collapsed ? "w-16" : "w-60",
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
      <nav className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-4">
        {groups.map((group, gi) => (
          <div key={gi} className="flex flex-col gap-0.5">
            {/* Section heading — hidden when collapsed */}
            {group.label && !collapsed && (
              <p className="px-3 mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider select-none">
                {group.label}
              </p>
            )}

            {group.items.map((item, ii) => {
              const itemClass = cn(
                "group flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors w-full text-left",
                collapsed && "justify-center px-0 w-10 mx-auto",
                item.active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground/70 hover:bg-accent hover:text-foreground",
                item.disabled && "pointer-events-none opacity-40",
              );

              const inner = (
                <>
                  {item.icon && (
                    <span
                      className={cn(
                        "h-4 w-4 shrink-0 flex items-center justify-center",
                        item.active
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-foreground transition-colors",
                      )}
                    >
                      {item.icon}
                    </span>
                  )}
                  {!collapsed && (
                    <span className="flex-1 truncate">{item.label}</span>
                  )}
                </>
              );

              if (item.href) {
                return (
                  <a
                    key={ii}
                    href={item.href}
                    onClick={item.disabled ? (e) => e.preventDefault() : item.onClick}
                    className={itemClass}
                    title={collapsed ? item.label : undefined}
                    aria-current={item.active ? "page" : undefined}
                  >
                    {inner}
                  </a>
                );
              }

              return (
                <button
                  key={ii}
                  type="button"
                  disabled={item.disabled}
                  onClick={item.onClick}
                  className={itemClass}
                  title={collapsed ? item.label : undefined}
                  aria-current={item.active ? "page" : undefined}
                >
                  {inner}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer slot */}
      {footer && (
        <div
          className={cn(
            "shrink-0 border-t border-border px-2 py-3",
            collapsed && "flex justify-center",
          )}
        >
          {footer}
        </div>
      )}
    </div>
  ),
);
Sidebar.displayName = "Sidebar";

export { Sidebar };
