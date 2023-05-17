interface ChartFilterProps {
  text: string;
  active: boolean;
  onClick: () => void;
}

export default function ChartFilter({
  text,
  active,
  onClick,
}: ChartFilterProps) {
  return (
    <button
      onClick={onClick}
      className={`border-1 m-2 flex h-8 w-12 cursor-pointer items-center justify-center rounded-md ${
        active
          ? "border-indigo-700 bg-indigo-600 text-gray-100"
          : "border-indigo-300 text-indigo-300"
      }`}
    >
      {text}
    </button>
  );
}
