interface Props {
  onClearFilters: () => void;
  onApplyFilters: () => void;
}

export default function FilterActions({ onClearFilters, onApplyFilters }: Props) {
  return (
    <div className="flex justify-end gap-3 mt-4">
      <button
        type="button"
        onClick={onApplyFilters}
        className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg"
      >
        Apply
      </button>
      <button
        type="button"
        onClick={onClearFilters}
        className="px-4 py-2 rounded-xl bg-gray-100 text-gray-800 hover:bg-gray-200 transition-shadow shadow-sm hover:shadow"
      >
        Clear
      </button>
    </div>
  );
}
