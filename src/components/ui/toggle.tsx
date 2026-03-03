import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Label } from "./label";
import { cn } from "@/lib/utils";

/* ── Track color map (when checked) ── */
const trackCheckedMap: Record<string, string> = {
  default: "data-[state=checked]:bg-primary",
  destructive: "data-[state=checked]:bg-destructive",
  success: "data-[state=checked]:bg-success",
};

export interface ToggleProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    "children"
  > {
  /** Color of the track when checked */
  variant?: "default" | "destructive" | "success";
  /** Label displayed beside the toggle */
  label?: string;
}

const Toggle = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  ToggleProps
>(({ className, variant = "default", label, disabled, id, ...props }, ref) => {
  const inputId = id || React.useId();

  return (
    <div className="flex items-center gap-2.5">
      <SwitchPrimitive.Root
        ref={ref}
        id={inputId}
        disabled={disabled}
        className={cn(
          // Base track
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
          // Off state
          "bg-input",
          // On state — colored by variant
          trackCheckedMap[variant],
          // Focus + disabled
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform",
            "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
          )}
        />
      </SwitchPrimitive.Root>

      {label && (
        <Label
          htmlFor={inputId}
          className={cn(
            "cursor-pointer",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          {label}
        </Label>
      )}
    </div>
  );
});
Toggle.displayName = "Toggle";

export { Toggle };
