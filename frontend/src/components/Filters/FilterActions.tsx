interface Props {
  onClearFilters: () => void;
  onApplyFilters: () => void;
}

export default function FilterActions({ onClearFilters, onApplyFilters }: Props) {
  return (
    <div className="flex justify-end gap-2">
      <button
        type="button"
        onClick={onApplyFilters}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Apply Filters
      </button>
      <button
        type="button"
        onClick={onClearFilters}
        className="bg-gray-300 text-black px-4 py-2 rounded"
      >
        Clear Filters
      </button>
    </div>
  );
}
