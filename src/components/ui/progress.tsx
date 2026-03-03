import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ── Track (background rail) ── */
const progressTrackVariants = cva(
  "w-full overflow-hidden rounded-full bg-muted",
  {
    variants: {
      size: {
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-4",
      },
    },
    defaultVariants: { size: "md" },
  },
);

/* ── Fill (progress bar) ── */
const progressFillVariants = cva(
  "h-full rounded-full transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-primary",
        success: "bg-success",
        destructive: "bg-destructive",
        warning: "bg-warning",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressTrackVariants>,
    VariantProps<typeof progressFillVariants> {
  /** Current progress value (0–100) */
  value?: number;
  /** Show the numeric percentage to the right of the label */
  showValue?: boolean;
  /** Optional label above the bar */
  label?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      size,
      variant,
      showValue = false,
      label,
      ...props
    },
    ref,
  ) => {
    const clamped = Math.min(100, Math.max(0, value));

    return (
      <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...props}>
        {/* Label row */}
        {(label || showValue) && (
          <div className="flex items-center justify-between">
            {label && (
              <span className="text-sm font-medium text-foreground">
                {label}
              </span>
            )}
            {showValue && (
              <span className="text-sm text-muted-foreground tabular-nums">
                {clamped}%
              </span>
            )}
          </div>
        )}

        {/* Track */}
        <div
          className={progressTrackVariants({ size })}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {/* Fill */}
          <div
            className={progressFillVariants({ variant })}
            style={{ width: `${clamped}%` }}
          />
        </div>
      </div>
    );
  },
);
Progress.displayName = "Progress";

export { Progress, progressTrackVariants, progressFillVariants };
