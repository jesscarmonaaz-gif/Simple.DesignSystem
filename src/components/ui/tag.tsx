import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ── Variants ── */
const tagVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-3 py-1 text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-primary/40 bg-primary/10 text-primary",
        secondary:
          "border-foreground/20 bg-foreground/5 text-foreground/55",
        info:
          "border-info/40 bg-info/10 text-info",
        success:
          "border-success/40 bg-success/10 text-success",
        warning:
          "border-warning/40 bg-warning/10 text-warning",
        destructive:
          "border-destructive/40 bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/* ── Icon button color map ── */
const iconColorMap: Record<string, string> = {
  default: "text-primary/75 hover:text-primary",
  secondary: "text-foreground/50 hover:text-foreground/80",
  info: "text-info/75 hover:text-info",
  success: "text-success/75 hover:text-success",
  warning: "text-warning/75 hover:text-warning",
  destructive: "text-destructive/75 hover:text-destructive",
};

/* ── Types ── */
export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  /** Icon rendered on the right (e.g. <X size={12} />) */
  icon?: React.ReactNode;
  /** Called when the right icon is clicked — makes it a button */
  onIconClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Accessible label for the icon button (default: "Remove") */
  iconLabel?: string;
}

/* ── Component ── */
function Tag({
  className,
  variant = "default",
  icon,
  onIconClick,
  iconLabel = "Remove",
  children,
  ...props
}: TagProps) {
  const v = variant ?? "default";

  return (
    <span
      className={cn(tagVariants({ variant }), className)}
      {...props}
    >
      {children}
      {icon && (
        onIconClick ? (
          <button
            type="button"
            onClick={onIconClick}
            className={cn(
              "flex shrink-0 items-center justify-center rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              iconColorMap[v],
            )}
            aria-label={iconLabel}
          >
            {icon}
          </button>
        ) : (
          <span
            className={cn(
              "flex shrink-0 items-center justify-center",
              iconColorMap[v],
            )}
            aria-hidden="true"
          >
            {icon}
          </span>
        )
      )}
    </span>
  );
}

export { Tag, tagVariants };
