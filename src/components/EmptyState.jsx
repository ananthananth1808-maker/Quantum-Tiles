import { Search } from 'lucide-react';

export function EmptyState({ searchQuery, selectedCategory, onReset }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="rounded-full bg-gray-100 p-6 mb-4">
        <Search className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
      <p className="text-gray-600 text-center mb-6 max-w-sm">
        {searchQuery
          ? `No products match "${searchQuery}"`
          : selectedCategory
          ? `No products in the "${selectedCategory}" category`
          : 'No products available'}
      </p>
      {(searchQuery || selectedCategory) && (
        <button
          onClick={onReset}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
