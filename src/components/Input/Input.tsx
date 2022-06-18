import { HTMLProps, forwardRef } from "react";

type Props = HTMLProps<HTMLInputElement> & {
  label: string;
  error?: string | undefined;
};

const Input = forwardRef<any, Props>(({ label, error, ...otherProps }, ref) => {
  return (
    <div className="m-3 flex flex-col items-start">
      <label htmlFor={label.toLowerCase()} className="my-1">
        {label}
      </label>
      <input
        id={label.toLowerCase()}
        ref={ref}
        className={`w-max border-solid border-2 rounded p-1  ${
          error ? "border-red-600" : "border-black"
        }`}
        {...otherProps}
      />
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
