interface ISelectProps {
  arrayForOptions: string[];
  value: string;
  setValue: (e: string) => void;
}

export default function Select({
  arrayForOptions,
  value,
  setValue,
}: ISelectProps) {
  return (
    <select
      className="block px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {arrayForOptions.map((nationLabel: string, idx: number) => (
        <option key={idx} value={nationLabel}>
          {nationLabel}
        </option>
      ))}
    </select>
  );
}
