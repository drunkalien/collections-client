import { forwardRef, InputHTMLAttributes } from "react";
import cn from "classnames";

type Props = InputHTMLAttributes<HTMLTextAreaElement> & {
  icon?: any;
  disabled?: boolean;
  errorMessage?: string;
  message?: string;
  label?: string;
};

const Textarea = forwardRef(
  ({ icon, message, errorMessage, disabled, label, ...props }: Props, ref) => {
    const error = !!errorMessage;

    return (
      <div className="flex flex-col relative _input">
        <div
          className={cn(`absolute left-[17px] top-[17px]`, {
            "_icon-disabled": disabled,
            "_icon-error": error,
          })}
        >
          {icon && icon}
        </div>
        <label htmlFor={label?.toLowerCase()}>{label}</label>
        <textarea
          rows={4}
          id={label?.toLowerCase()}
          ref={ref as any}
          disabled={disabled}
          style={{ paddingLeft: icon ? 43 : 16 }}
          className={cn(
            `py-[10px] text-sm px-[12px] my-[3px] border-black border-[1px] rounded-[4px] w-full `,
            {
              "border-red": error,
            }
          )}
          {...props}
        />
        {(error || !!message) && (
          <div className="flex items-center mt-[8px]">
            <p
              className={cn({
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

Textarea.displayName = "Textarea";

export default Textarea;
