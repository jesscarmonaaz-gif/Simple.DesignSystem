import * as React from "react";
import { CaretRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

/* ── Types ── */

export interface SidebarMenuItemProps {
  className?: string;
  /** Display label */
  label: string;
  /** Optional icon rendered at 20×20 */
  icon?: React.ReactNode;
  /** Navigates to this URL when clicked */
  href?: string;
  /** Called on click (works alongside href) */
  onClick?: (e: React.MouseEvent) => void;
  /** Marks this item as the current/active page */
  active?: boolean;
  /** Prevents interaction */
  disabled?: boolean;
  /** Collapse to icon-only mode */
  collapsed?: boolean;
  /** Optional child items — when provided, renders as an expandable subgroup */
  items?: SidebarMenuItemProps[];
  /** Controls whether a subgroup is open by default */
  defaultOpen?: boolean;
  /**
   * Custom link component for client-side routing (e.g. React Router's Link).
   * Receives `to` and `className` props. Defaults to a standard <a> tag.
   */
  linkComponent?: React.ComponentType<any>;
}

/* ── Component ── */

const SidebarMenuItem = React.forwardRef<HTMLElement, SidebarMenuItemProps>(
  (
    {
      label,
      icon,
      href,
      onClick,
      active = false,
      disabled = false,
      collapsed = false,
      items,
      defaultOpen = false,
      linkComponent,
      className,
    },
    ref,
  ) => {
    const hasChildren = !!items && items.length > 0;
    const [open, setOpen] = React.useState(defaultOpen || active);
    const LinkEl = linkComponent ?? "a";

    const itemClass = cn(
      "group flex items-center gap-3 rounded-full px-4 py-2 text-sm transition-colors w-full text-left",
      collapsed && "justify-center px-0 w-11 h-11 mx-auto",
      active
        ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      disabled && "pointer-events-none opacity-40",
      className,
    );

    const iconEl = icon && (
      <span
        className={cn(
          "h-5 w-5 shrink-0 flex items-center justify-center",
          active
            ? "text-sidebar-accent-foreground"
            : "text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground transition-colors",
        )}
      >
        {icon}
      </span>
    );

    const labelEl = !collapsed && <span className="flex-1 truncate">{label}</span>;

    const caretEl = hasChildren && !collapsed && (
      <CaretRight
        className={cn(
          "h-4 w-4 shrink-0 transition-transform",
          open && "rotate-90",
        )}
      />
    );

    /* Subgroup (parent with children) */
    if (hasChildren) {
      return (
        <div className="flex flex-col">
          <button
            ref={ref as React.Ref<HTMLButtonElement>}
            type="button"
            disabled={disabled}
            onClick={(e) => {
              setOpen((o) => !o);
              onClick?.(e);
            }}
            className={itemClass}
            title={collapsed ? label : undefined}
            aria-expanded={open}
            aria-current={active ? "page" : undefined}
            
          >
            {iconEl}
            {labelEl}
            {caretEl}
          </button>

          {open && !collapsed && (
            <div className="mt-0.5 ml-6 flex flex-col gap-0.5 border-l border-sidebar-border pl-2">
              {items!.map((child, i) => (
                <SidebarMenuItem
                  key={i}
                  {...child}
                  collapsed={false}
                  linkComponent={child.linkComponent ?? linkComponent}
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    /* Leaf with href → link */
    if (href) {
      const linkProps = linkComponent ? { to: href } : { href };
      return (
        <LinkEl
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...linkProps}
          onClick={disabled ? (e: React.MouseEvent) => e.preventDefault() : onClick}
          className={itemClass}
          title={collapsed ? label : undefined}
          aria-current={active ? "page" : undefined}
          
        >
          {iconEl}
          {labelEl}
        </LinkEl>
      );
    }

    /* Leaf button */
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={itemClass}
        title={collapsed ? label : undefined}
        aria-current={active ? "page" : undefined}
        
      >
        {iconEl}
        {labelEl}
      </button>
    );
  },
);
SidebarMenuItem.displayName = "SidebarMenuItem";

export { SidebarMenuItem };
