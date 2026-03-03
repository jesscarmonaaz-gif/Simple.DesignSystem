import * as React from "react";
import { Input, type InputProps } from "./input";

export type EmailInputProps = Omit<InputProps, "type">;

const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  ({ placeholder = "name@example.com", ...props }, ref) => (
    <Input ref={ref} type="email" placeholder={placeholder} {...props} />
  ),
);
EmailInput.displayName = "EmailInput";

export { EmailInput };
