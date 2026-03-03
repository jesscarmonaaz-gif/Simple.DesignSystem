import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Label } from "./label";
import { cn } from "@/lib/utils";

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
    "orientation"
  > {
  /** Radio options */
  options: RadioOption[];
  /** Group label displayed above */
  label?: string;
  /** Helper / error text displayed below */
  helperText?: string;
  /** Visual state */
  state?: "default" | "error";
  /** Layout direction (default: vertical) */
  orientation?: "horizontal" | "vertical";
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(
  (
    {
      className,
      options,
      label,
      helperText,
      state = "default",
      orientation = "vertical",
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <Label className="font-semibold">
            {label}
          </Label>
        )}

        <RadioGroupPrimitive.Root
          ref={ref}
          disabled={disabled}
          className={cn(
            "flex gap-3",
            orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
            className,
          )}
          {...props}
        >
          {options.map((option) => {
            const itemId = `radio-${option.value}`;
            return (
              <div key={option.value} className="flex items-center gap-2.5">
                <RadioGroupPrimitive.Item
                  id={itemId}
                  value={option.value}
                  disabled={option.disabled}
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    "border-border",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "data-[state=checked]:border-success",
                  )}
                >
                  <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-success" />
                  </RadioGroupPrimitive.Indicator>
                </RadioGroupPrimitive.Item>

                <Label
                  htmlFor={itemId}
                  className={cn(
                    "cursor-pointer leading-snug",
                    (disabled || option.disabled) &&
                      "cursor-not-allowed opacity-50",
                  )}
                >
                  {option.label}
                </Label>
              </div>
            );
          })}
        </RadioGroupPrimitive.Root>

        {helperText && (
          <p
            className={cn(
              "text-sm",
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
RadioGroup.displayName = "RadioGroup";

export { RadioGroup };
