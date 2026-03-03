import * as React from "react";
import { Input, type InputProps } from "./input";

export type PasswordInputProps = Omit<InputProps, "type">;

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ placeholder = "Enter password", ...props }, ref) => (
    <Input ref={ref} type="password" placeholder={placeholder} {...props} />
  ),
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
