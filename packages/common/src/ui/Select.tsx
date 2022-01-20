import clsx from "clsx";
import { forwardRef } from "react";

interface Option {
  value: string | number;
  label: string;
}

export interface SelectProps extends React.ComponentPropsWithoutRef<"select"> {
  options: Option[];
  defaultOption?: string;
  label?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, defaultOption, className, ...props }, ref) => {
    const id = !props.id ? props.name : props.id;

    return (
      <select
        id={id}
        className={clsx("select", className)}
        {...props}
        ref={ref}
      >
        {defaultOption && <option disabled>{defaultOption}</option>}

        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={false}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = "Select";
