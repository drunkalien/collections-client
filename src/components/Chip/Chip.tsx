type Props = {
  label: string;
  value: string;
};

const Chip = ({ label, value }: Props) => {
  return (
    <div className="bg-gray px-2 py-1 my-1 rounded">
      {label}: {value.length < 11 ? value : value.slice(0, 11) + "..."}
    </div>
  );
};

export default Chip;
