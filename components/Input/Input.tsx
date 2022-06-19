import { HTMLProps, forwardRef } from "react";

type Props = HTMLProps<HTMLInputElement> & {
  label: string;
  error: string | undefined;
};

const Input = forwardRef<any, Props>(({ label, error, ...otherProps }, ref) => {
  return (
    <div>
      <label htmlFor={label.toLowerCase()} className="w-max">
        {label}
      </label>
      <input
        id={label.toLowerCase()}
        ref={ref}
        className={`w-max border-solid border-1 rounded p-1 border-blue-400 ${
          error ? "border-red-600" : ""
        }`}
        {...otherProps}
      />
      {error && <p>{error}</p>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
