export function FilterPanel({ categories, selectedCategory, onCategoryChange, resultCount }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
        
        <div className="space-y-3">
          {/* All Categories Option */}
          <label className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedCategory === ''}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition">
              All Products
            </span>
          </label>

          {/* Individual Categories */}
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="ml-3 text-gray-700 capitalize group-hover:text-gray-900 transition">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{resultCount}</span> product{resultCount !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}
