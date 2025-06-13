interface CustomMultiSelectProps {
  options: string[];
  selected: string[];
  onSelect: (selected: string[]) => void;
}

export default function CustomMultiSelect({
  options,
  selected,
  onSelect,
}: CustomMultiSelectProps) {
  const handleSelect = (option: string) => {
    if (selected.includes(option)) {
      onSelect(selected.filter((s) => s !== option));
    } else {
      onSelect([...selected, option]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <div
          key={option}
          className={`border p-2 rounded-full px-4 py-1 cursor-pointer ${
            selected.includes(option)
              ? "bg-[color:var(--color-custom-primary)] text-white"
              : ""
          }`}
          onClick={() => handleSelect(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
}
