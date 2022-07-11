type Props = {
  label: string;
  value: string;
};

const Chip = ({ label, value }: Props) => {
  const CUT_TRESHOLD = 20;

  return (
    <div
      className="bg-lightGray px-2 py-1 my-1 rounded dark:text-black"
      title={value}
    >
      {label}:{" "}
      {value.length < CUT_TRESHOLD
        ? value
        : value.slice(0, CUT_TRESHOLD) + "..."}
    </div>
  );
};

export default Chip;
