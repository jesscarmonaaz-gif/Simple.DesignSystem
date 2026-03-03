import * as React from "react";
import { CaretRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

/* ── Types ── */

export interface BreadcrumbItem {
  /** Display text */
  label: string;
  /** Makes this item a clickable link */
  href?: string;
}

export interface AppHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Page title — shown when no breadcrumb is provided */
  title?: string;
  /** Breadcrumb trail; last item is treated as the current page */
  breadcrumb?: BreadcrumbItem[];
  /** Right-side slot: search, buttons, user avatar, etc. */
  actions?: React.ReactNode;
  /** Render a bottom border (default: true) */
  bordered?: boolean;
}

/* ── Component ── */

const AppHeader = React.forwardRef<HTMLElement, AppHeaderProps>(
  (
    { className, title, breadcrumb, actions, bordered = true, children, ...props },
    ref,
  ) => (
    <header
      ref={ref}
      className={cn(
        "flex h-14 w-full items-center justify-between gap-4 bg-background px-6 shrink-0",
        bordered && "border-b border-border",
        className,
      )}
      {...props}
    >
      {/* ── Left: title or breadcrumb ── */}
      <div className="flex items-center gap-1.5 min-w-0">
        {breadcrumb && breadcrumb.length > 0 ? (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
            {breadcrumb.map((item, i) => {
              const isLast = i === breadcrumb.length - 1;
              return (
                <React.Fragment key={i}>
                  {i > 0 && (
                    <CaretRight
                      className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
                      aria-hidden
                    />
                  )}
                  {item.href && !isLast ? (
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors truncate"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span
                      className={cn(
                        "text-sm truncate",
                        isLast
                          ? "font-semibold text-foreground"
                          : "text-muted-foreground",
                      )}
                      aria-current={isLast ? "page" : undefined}
                    >
                      {item.label}
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        ) : title ? (
          <h1 className="text-lg font-semibold truncate">{title}</h1>
        ) : null}

        {/* Extra left-side content passed as children */}
        {children}
      </div>

      {/* ── Right: actions ── */}
      {actions && (
        <div className="flex items-center gap-2 shrink-0">{actions}</div>
      )}
    </header>
  ),
);
AppHeader.displayName = "AppHeader";

export { AppHeader };
