interface Props {
  search: string;
  onSearch: (val: string) => void;
  onClear: () => void;
}

export default function SearchBar({ search, onSearch, onClear }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(search.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Search unit, number, or project"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="flex-1 p-2 border rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
      <button type="button" onClick={onClear} className="bg-gray-300 text-black px-4 py-2 rounded">
        Clear Search
      </button>
    </form>
  );
}
