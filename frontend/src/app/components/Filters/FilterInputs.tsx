interface Props {
  filters: Record<string, string>;
  onChange: (filters: Record<string, string>) => void;
}

export default function FilterInputs({ filters, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(filters).map(([key, value]) => (
        <input
          key={key}
          name={key}
          value={value}
          onChange={handleChange}
          placeholder={`Filter by ${key.replace(/_/g, ' ')}`}
          className="p-2 border rounded"
        />
      ))}
    </div>
  );
}
