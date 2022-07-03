import { forwardRef, InputHTMLAttributes } from "react";
import cn from "classnames";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  icon?: any;
  disabled?: boolean;
  errorMessage?: string;
  message?: string;
  className?: string;
  placeholder?: string;
  label?: string;
};

const Input = forwardRef(
  (
    {
      icon,
      message,
      errorMessage,
      disabled,
      className = "",
      label,
      placeholder,
      ...props
    }: Props,
    ref
  ) => {
    const error = !!errorMessage;
    return (
      <div className="flex flex-col relative h-full w-full">
        <div
          className={cn(`absolute left-[17px] top-[17px]`, {
            "_icon-disabled": disabled,
            "_icon-error": error,
          })}
        >
          {icon && icon}
        </div>
        <label htmlFor={label?.toLowerCase()} className="mb-1 text-xs">
          {label}
        </label>
        <input
          ref={ref as any}
          id={label?.toLowerCase()}
          disabled={disabled}
          style={{ paddingLeft: icon ? 43 : 16 }}
          placeholder={placeholder}
          className={cn(
            "py-[10px] text-sm px-[12px] border-black border-[1px] rounded-[4px] w-full placeholder:italic placeholder:text-gray",
            className,
            {
              "border-red": error,
            }
          )}
          {...props}
        />
        {(error || !!message) && (
          <div className="flex items-center mt-[8px]">
            <p className={cn("text-red")}>{error ? errorMessage : message}</p>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
