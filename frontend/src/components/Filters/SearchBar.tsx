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
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 items-stretch">
      <input
        type="text"
        placeholder="Search unit, number, or project"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Search
        </button>
        <button
          type="button"
          onClick={onClear}
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg shadow hover:bg-gray-200 transition"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
