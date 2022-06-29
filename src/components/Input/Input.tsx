import { forwardRef, InputHTMLAttributes } from "react";
import cn from "classnames";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  icon?: any;
  disabled?: boolean;
  errorMessage?: string;
  message?: string;
  customClassName?: string;
  label: string;
};

const Input = forwardRef(
  (
    {
      icon,
      message,
      errorMessage,
      disabled,
      customClassName = "",
      label,
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
        <label htmlFor={label.toLowerCase()}>{label}</label>
        <input
          ref={ref as any}
          id={label.toLowerCase()}
          disabled={disabled}
          style={{ paddingLeft: icon ? 43 : 16 }}
          className={cn(
            `py-[3px]
        pr-[16px]
        my-[3px]
        border-black
        text-primary-text
        placeholder:text-secondary-text
        border-[1px]
        border-disabled-text
        rounded-[4px]
        w-full
        focus:border-primary-text
        focus:outline-2
        focus:laceholder:text-disabled-text
        disabled:border-disabled-text
        disabled:text-disabled-text
        disabled:placeholder-disabled-text
        disabled:bg-divider-l
        _outline-effect
      `,
            customClassName,
            {
              "bg-error-secondary": error,
              "placeholder:text-error": error,
              "placeholder:text-opacity-70": error,
              "text-error": error,
              "border-error": error,
              "focus:border-error": error,
              "_outline-effect-error": error,
            }
          )}
          {...props}
        />
        {(error || !!message) && (
          <div className="flex items-center mt-[8px]">
            <p
              className={cn("text-red", {
                "text-error": error,
                "text-secondary-text": !error,
                "disabled:text-disabled-text": disabled,
              })}
            >
              {error ? errorMessage : message}
            </p>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
