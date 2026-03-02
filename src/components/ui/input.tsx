import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "./label";

import { cn } from "@/lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  helperText?: string;
  state?: "default" | "error" | "success";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, label, helperText, state = "default", id, ...props },
    ref,
  ) => {
    const inputId = id || React.useId();
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";

    return (
      <div className="flex flex-col gap-1.5">
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
        <div className="relative">
          <input
            type={isPassword && showPassword ? "text" : type}
            id={inputId}
            className={cn(
              "flex h-10 w-full rounded-md border bg-white px-3 py-2 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              state === "error" &&
                "border-destructive focus-visible:border-destructive",
              state === "success" &&
                "border-success focus-visible:border-success",
              state === "default" &&
                "border-input focus-visible:border-ring",
              isPassword && "pr-10",
              className,
            )}
            ref={ref}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
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
Input.displayName = "Input";

export { Input };
