import clsx from "clsx";
import { forwardRef } from "react";

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    const id = !props.id ? props.name : props.id;

    return (
      <input
        id={id}
        className={clsx("checkbox", className)}
        type="checkbox"
        {...props}
        ref={ref}
      />
    );
  }
);

Checkbox.displayName = "Checkbox";
