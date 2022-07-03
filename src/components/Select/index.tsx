import cn from "classnames";
import { useTranslation } from "next-i18next";
import ReactSelect, { Props as ReactSelectProps } from "react-select";

type Props = ReactSelectProps<any> & {
  icon?: any;
  label?: string;
  disabled?: boolean;
  errorMessage?: string;
  message?: string;
  size?: "sm" | "lg";
};

const Select = ({
  icon,
  message,
  size = "lg",
  errorMessage,
  disabled,
  label,
  id,
  placeholder,
  options,
  ...props
}: Props) => {
  const { t } = useTranslation();
  const error = !!errorMessage;
  return (
    <>
      <div className="flex flex-col relative _input">
        <div
          className={cn(`absolute left-[12px] top-[14px] z-10`, {
            "_icon-disabled": disabled,
            "_icon-error": error,
          })}
        >
          {icon && icon}
        </div>
        <label className="mb-1 text-xs" htmlFor={id}>
          {label}
        </label>
        <ReactSelect
          id={id}
          placeholder={
            <div className="text-gray italic text-sm">{placeholder}</div>
          }
          classNamePrefix={cn("_select")}
          noOptionsMessage={() => message || t("No options")}
          className={cn({
            _error: error,
            _sm: size === "sm",
            "with-icon": !!icon,
          })}
          options={options}
          {...props}
        />
        {(error || !!message) && (
          <div className="flex items-center mt-[5px]">
            <p
              className={cn({
                "text-red": error,
                "text-black": !error,
                "disabled:text-gray": disabled,
              })}
            >
              {error ? errorMessage : message}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Select;
