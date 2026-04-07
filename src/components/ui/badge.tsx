import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "",
        secondary: "",
        destructive: "",
        outline: "",
        success: "",
        warning: "",
        info: "",
        cancelled: "",
        accent: "",
      },
      filled: {
        true: "",
        false: "",
      },
      borderless: {
        true: "border-transparent",
        false: "",
      },
    },
    compoundVariants: [
      // ── Outlined (default) ──
      {
        variant: "default",
        filled: false,
        className: "border-primary/40 bg-primary/10 text-primary",
      },
      {
        variant: "success",
        filled: false,
        className: "border-success/40 bg-success/10 text-success",
      },
      {
        variant: "warning",
        filled: false,
        className: "border-warning/40 bg-warning/10 text-warning",
      },
      {
        variant: "info",
        filled: false,
        className: "border-info/40 bg-info/10 text-info",
      },
      {
        variant: "cancelled",
        filled: false,
        className: "border-cancelled/40 bg-cancelled/10 text-cancelled",
      },
      {
        variant: "destructive",
        filled: false,
        className: "border-destructive/40 bg-destructive/10 text-destructive",
      },
      {
        variant: "accent",
        filled: false,
        className: "border-accent-blue/40 bg-accent-blue/10 text-accent-blue",
      },
      {
        variant: "secondary",
        filled: false,
        className:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      {
        variant: "outline",
        filled: false,
        className: "border-foreground/20 text-foreground",
      },

      // ── Filled ──
      {
        variant: "default",
        filled: true,
        className:
          "border-primary bg-primary text-white",
      },
      {
        variant: "success",
        filled: true,
        className:
          "border-success bg-success text-success-foreground",
      },
      {
        variant: "warning",
        filled: true,
        className:
          "border-warning bg-warning text-warning-foreground",
      },
      {
        variant: "info",
        filled: true,
        className: "border-info bg-info text-info-foreground",
      },
      {
        variant: "cancelled",
        filled: true,
        className:
          "border-cancelled bg-cancelled text-cancelled-foreground",
      },
      {
        variant: "destructive",
        filled: true,
        className:
          "border-destructive bg-destructive text-destructive-foreground",
      },
      {
        variant: "accent",
        filled: true,
        className:
          "border-accent-blue bg-accent-blue text-accent-blue-foreground",
      },
      {
        variant: "secondary",
        filled: true,
        className:
          "border-secondary bg-secondary text-secondary-foreground",
      },
      {
        variant: "outline",
        filled: true,
        className: "border-foreground/20 bg-foreground/5 text-foreground",
      },
    ],
    defaultVariants: {
      variant: "default",
      filled: false,
      borderless: false,
    },
  },
);

/* Indicator dot color map — tinted for outlined, translucent for filled */
const indicatorOutlinedMap: Record<string, string> = {
  default: "bg-primary/30",
  success: "bg-success/30",
  warning: "bg-warning/30",
  info: "bg-info/30",
  cancelled: "bg-cancelled/30",
  destructive: "bg-destructive/30",
  accent: "bg-accent-blue/30",
  secondary: "bg-muted-foreground/30",
  outline: "bg-foreground/15",
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  indicator?: boolean;
}

function Badge({
  className,
  variant = "default",
  filled = false,
  borderless = false,
  indicator = true,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, filled, borderless }), className)}
      {...props}
    >
      {indicator && (
        <span
          className={cn(
            "inline-block h-2.5 w-2.5 shrink-0 rounded-sm",
            filled
              ? "bg-white/40"
              : indicatorOutlinedMap[variant ?? "default"],
          )}
        />
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
