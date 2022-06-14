type Props = {
  label: string;
  error?: string | undefined;
};

const Input = ({ label, error }: Props) => {
  return (
    <div>
      <label htmlFor={label.toLowerCase()} className="w-max">
        {label}
      </label>
      <input
        type="text"
        id={label.toLowerCase()}
        className={`w-max border-solid border-1 rounded p-1 ${
          error ? "border-red-600" : ""
        }`}
      />
    </div>
  );
};

export default Input;
