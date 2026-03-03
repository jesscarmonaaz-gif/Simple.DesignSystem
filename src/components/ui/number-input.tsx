import * as React from "react";
import { Minus, Plus } from "@phosphor-icons/react";
import { Label } from "./label";
import { cn } from "@/lib/utils";

/* ── Ref merge helper ── */
function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (node) => {
    refs.forEach((r) => {
      if (typeof r === "function") r(node);
      else if (r && "current" in r)
        (r as React.MutableRefObject<T | null>).current = node;
    });
  };
}

export interface NumberInputProps
  extends Omit<React.ComponentProps<"input">, "type"> {
  /** Label displayed above the input */
  label?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Visual state of the input */
  state?: "default" | "error" | "success";
  /** Text or symbol shown before the input (e.g. "$", "€", "£") */
  prefix?: string;
  /** Text or symbol shown after the input (e.g. "%", "kg", "USD") */
  suffix?: string;
  /** Show −/+ stepper buttons on either side */
  stepper?: boolean;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      label,
      helperText,
      state = "default",
      prefix,
      suffix,
      stepper = false,
      disabled,
      id,
      min,
      max,
      step = 1,
      ...props
    },
    ref,
  ) => {
    const inputId = id || React.useId();

    /* Keep an internal ref so stepper buttons can call stepUp/stepDown */
    const internalRef = React.useRef<HTMLInputElement>(null);

    const fireChange = (el: HTMLInputElement) => {
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    };

    const decrement = () => {
      const el = internalRef.current;
      if (!el || disabled) return;
      el.stepDown();
      fireChange(el);
    };

    const increment = () => {
      const el = internalRef.current;
      if (!el || disabled) return;
      el.stepUp();
      fireChange(el);
    };

    const borderStateClass = cn(
      state === "error" &&
        "border-destructive focus-within:border-destructive",
      state === "success" &&
        "border-success focus-within:border-success",
      state === "default" && "border-input focus-within:border-ring",
    );

    return (
      <div className="flex flex-col gap-1.5">
        {/* Label */}
        {label && (
          <Label htmlFor={inputId} className="font-semibold">
            {label}
            {props.required && (
              <span className="text-destructive ml-0.5" aria-hidden="true">
                *
              </span>
            )}
          </Label>
        )}

        {/* Input group */}
        <div
          className={cn(
            "flex h-10 w-full items-center rounded-md border bg-white transition-colors overflow-hidden",
            borderStateClass,
            disabled && "opacity-50 cursor-not-allowed",
          )}
        >
          {/* Prefix addon */}
          {prefix && (
            <div className="flex h-full items-center border-r border-inherit bg-muted/30 px-3 text-sm text-muted-foreground shrink-0 select-none">
              {prefix}
            </div>
          )}

          {/* − stepper */}
          {stepper && (
            <button
              type="button"
              tabIndex={-1}
              onClick={decrement}
              disabled={disabled}
              aria-label="Decrease value"
              className="flex h-full w-10 shrink-0 items-center justify-center border-r border-inherit text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground disabled:pointer-events-none"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Native number input (spin buttons hidden) */}
          <input
            ref={mergeRefs(ref, internalRef)}
            type="number"
            id={inputId}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            className={cn(
              "h-full flex-1 min-w-0 bg-transparent px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed",
              // Hide native browser spin buttons
              "[appearance:textfield]",
              "[&::-webkit-inner-spin-button]:appearance-none",
              "[&::-webkit-outer-spin-button]:appearance-none",
              className,
            )}
            {...props}
          />

          {/* Suffix addon */}
          {suffix && (
            <div className="flex h-full items-center border-l border-inherit bg-muted/30 px-3 text-sm text-muted-foreground shrink-0 select-none">
              {suffix}
            </div>
          )}

          {/* + stepper */}
          {stepper && (
            <button
              type="button"
              tabIndex={-1}
              onClick={increment}
              disabled={disabled}
              aria-label="Increase value"
              className="flex h-full w-10 shrink-0 items-center justify-center border-l border-inherit text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground disabled:pointer-events-none"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Helper text */}
        {helperText && (
          <p
            className={cn(
              "text-sm",
              state === "error" && "text-destructive",
              state === "success" && "text-success",
              state === "default" && "text-muted-foreground",
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
NumberInput.displayName = "NumberInput";

export { NumberInput };
