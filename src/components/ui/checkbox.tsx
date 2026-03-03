import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "@phosphor-icons/react";
import { Label } from "./label";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    "checked" | "onCheckedChange"
  > {
  /** Label text displayed beside the checkbox */
  label?: string;
  /** Helper / error text displayed below */
  helperText?: string;
  /** Visual state */
  state?: "default" | "error";
  /** Controlled checked value */
  checked?: boolean | "indeterminate";
  /** Called when checked state changes */
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      className,
      label,
      helperText,
      state = "default",
      checked,
      onCheckedChange,
      disabled,
      required,
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id || React.useId();
    const isIndeterminate = checked === "indeterminate";
    const isChecked = checked === true;

    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-2.5">
          <CheckboxPrimitive.Root
            ref={ref}
            id={inputId}
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
            required={required}
            className={cn(
              "peer mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              // Unchecked
              !isChecked && !isIndeterminate && state === "error" &&
                "border-destructive",
              !isChecked && !isIndeterminate && state !== "error" &&
                "border-border",
              // Checked
              isChecked && "border-success bg-success",
              // Indeterminate
              isIndeterminate && "border-foreground/25 bg-foreground/15",
              className,
            )}
            {...props}
          >
            <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
              {isIndeterminate ? (
                <Minus size={12} weight="bold" />
              ) : (
                <Check size={12} weight="bold" />
              )}
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>

          {label && (
            <Label
              htmlFor={inputId}
              className={cn(
                "cursor-pointer leading-snug",
                disabled && "cursor-not-allowed opacity-50",
              )}
            >
              {label}
              {required && (
                <span className="text-destructive ml-0.5" aria-hidden="true">
                  *
                </span>
              )}
            </Label>
          )}
        </div>

        {helperText && (
          <p
            className={cn(
              "text-sm pl-7",
              state === "error" ? "text-destructive" : "text-muted-foreground",
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
