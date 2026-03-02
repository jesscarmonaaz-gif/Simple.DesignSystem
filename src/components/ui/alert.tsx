import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Variants ── */
const alertVariants = cva(
  "relative flex w-full overflow-hidden rounded-lg border p-4 text-sm",
  {
    variants: {
      variant: {
        default:
          "border-foreground/15 bg-foreground/[0.03] text-foreground",
        success:
          "border-success/25 bg-success/[0.06] text-foreground",
        warning:
          "border-warning/25 bg-warning/[0.06] text-foreground",
        destructive:
          "border-destructive/25 bg-destructive/[0.06] text-foreground",
        info:
          "border-info/25 bg-info/[0.06] text-foreground",
      },
      layout: {
        inline: "items-center gap-3",
        stacked: "flex-col gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
      layout: "inline",
    },
  },
);

/* ── Badge color map ── */
const badgeColorMap: Record<string, string> = {
  default:
    "bg-foreground text-background",
  success:
    "bg-success text-success-foreground",
  warning:
    "bg-warning text-warning-foreground",
  destructive:
    "bg-destructive text-destructive-foreground",
  info:
    "bg-info text-info-foreground",
};

/* ── Action button color map ── */
const actionFilledMap: Record<string, string> = {
  default:
    "bg-foreground text-background hover:bg-foreground/90",
  success:
    "bg-success text-success-foreground hover:bg-success/90",
  warning:
    "bg-warning text-warning-foreground hover:bg-warning/90",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  info:
    "bg-info text-info-foreground hover:bg-info/90",
};

const actionOutlineMap: Record<string, string> = {
  default:
    "border-foreground/25 text-foreground hover:bg-foreground/5",
  success:
    "border-success/40 text-success hover:bg-success/5",
  warning:
    "border-warning/40 text-warning hover:bg-warning/5",
  destructive:
    "border-destructive/40 text-destructive hover:bg-destructive/5",
  info:
    "border-info/40 text-info hover:bg-info/5",
};

const accentBarMap: Record<string, string> = {
  default: "bg-foreground/40",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
  info: "bg-info",
};

const closeButtonMap: Record<string, string> = {
  default: "text-foreground/60 hover:text-foreground",
  success: "text-success/60 hover:text-success",
  warning: "text-warning/60 hover:text-warning",
  destructive: "text-destructive/60 hover:text-destructive",
  info: "text-info/60 hover:text-info",
};

/* ── Types ── */
export interface AlertAction {
  label: string;
  onClick?: () => void;
  /** "filled" = solid bg, "outline" = bordered (default: first action filled, rest outline) */
  style?: "filled" | "outline";
}

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Small badge text on the left (e.g. "New", "Info") */
  badge?: string;
  /** Icon element rendered after the badge */
  icon?: React.ReactNode;
  /** Title / headline text */
  title: string;
  /** Description / body text */
  description?: string;
  /** Action buttons */
  actions?: AlertAction[];
  /** Show a close / dismiss button */
  dismissible?: boolean;
  /** Called when dismiss button is clicked */
  onDismiss?: () => void;
}

/* ── Component ── */
function Alert({
  className,
  variant = "default",
  layout = "inline",
  badge,
  icon,
  title,
  description,
  actions,
  dismissible = false,
  onDismiss,
  ...props
}: AlertProps) {
  const v = variant ?? "default";

  const renderBadge = badge && (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase leading-none",
        badgeColorMap[v],
      )}
    >
      {badge}
    </span>
  );

  const renderIcon = icon && (
    <span className="flex shrink-0 items-center justify-center h-5 w-5 rounded bg-foreground/15">
      {icon}
    </span>
  );

  const renderActions = actions && actions.length > 0 && (
    <div className="flex items-center gap-2">
      {actions.map((action, i) => {
        const style = action.style ?? (i === 0 ? "filled" : "outline");
        return (
          <button
            key={i}
            type="button"
            onClick={action.onClick}
            className={cn(
              "inline-flex items-center rounded-md px-3 py-1 text-xs font-medium transition-colors",
              style === "filled"
                ? actionFilledMap[v]
                : cn("border", actionOutlineMap[v]),
            )}
          >
            {action.label}
          </button>
        );
      })}
    </div>
  );

  const renderClose = dismissible && (
    <button
      type="button"
      onClick={onDismiss}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-sm p-0.5 transition-colors",
        closeButtonMap[v],
      )}
      aria-label="Dismiss alert"
    >
      <X className="h-4 w-4" />
    </button>
  );

  const accentBar = (
    <span
      className={cn(
        "absolute left-0 top-0 h-full w-1 rounded-l-lg",
        accentBarMap[v],
      )}
      aria-hidden="true"
    />
  );

  if (layout === "inline") {
    return (
      <div
        className={cn(alertVariants({ variant, layout }), "pl-5", className)}
        role="alert"
        {...props}
      >
        {accentBar}
        {renderBadge}
        {renderIcon}
        <div className="flex flex-1 flex-col gap-0.5 min-w-0">
          <p className="font-semibold">{title}</p>
          {description && (
            <p className="text-foreground/60 text-xs">
              {description}
            </p>
          )}
        </div>
        {renderActions}
        {renderClose}
      </div>
    );
  }

  /* Stacked layout */
  return (
    <div
      className={cn(alertVariants({ variant, layout }), "pl-5", className)}
      role="alert"
      {...props}
    >
      {accentBar}
      <div className="flex items-center gap-3">
        {renderBadge}
        {renderIcon}
        <p className="flex-1 font-semibold">{title}</p>
        {renderClose}
      </div>
      {description && (
        <p className="text-foreground/60">{description}</p>
      )}
      {renderActions}
    </div>
  );
}

export { Alert, alertVariants };
