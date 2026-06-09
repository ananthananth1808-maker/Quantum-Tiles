# Search & Filtering - Quick Start

## 🚀 What Was Added

Advanced product search and filtering system for Quantum Tiles with:
- ✅ Real-time search by name/description
- ✅ Category filtering with radio buttons
- ✅ 3 sorting options (Newest, Price Low→High, Price High→Low)
- ✅ Instant filtering (no page reload)
- ✅ Mobile responsive (collapsible filters)
- ✅ Empty state with reset button
- ✅ Fully reusable components

## 📦 Files Created

### Components (4 new files)
```
src/components/
├── SearchBar.jsx      - Search input with icon & clear button
├── FilterPanel.jsx    - Category filter with radio buttons
├── SortOptions.jsx    - Dropdown sort selector
└── EmptyState.jsx     - No results message
```

### Updated
```
src/pages/ProductListingPage.jsx  - Complete redesign with filtering
```

## 🎯 How to Use

### For Users
1. **Search** - Type in search bar to find products
2. **Filter** - Click category (desktop sidebar or toggle on mobile)
3. **Sort** - Select sorting option from dropdown
4. **Reset** - Click X in search or "Clear Filters" button

### For Developers
All components are in `src/components/` and accept props:

**SearchBar**
```jsx
<SearchBar 
  searchQuery={searchQuery}
  onSearchChange={setSearchQuery}
  placeholder="Custom placeholder..."
/>
```

**FilterPanel**
```jsx
<FilterPanel 
  categories={["tile", "marble", "ceramic"]}
  selectedCategory="tile"
  onCategoryChange={setSelectedCategory}
  resultCount={24}
/>
```

**SortOptions**
```jsx
<SortOptions 
  sortBy="newest"
  onSortChange={setSortBy}
/>
```

**EmptyState**
```jsx
<EmptyState 
  searchQuery="ceramic"
  selectedCategory="marble"
  onReset={handleReset}
/>
```

## 🧪 Quick Test

Navigate to: `http://localhost:5173/products`

Try:
1. Type "marble" in search bar → See filtered results
2. Click category → Products filter instantly
3. Change sort → Products re-order immediately
4. Type + filter + sort together → All work seamlessly
5. Click X → Search clears, products reappear
6. Search with no results → Empty state appears

## 🎨 UI Breakdown

### Desktop Layout
```
┌─────────────────────────────────────────┐
│         Search Bar (Full Width)         │
└─────────────────────────────────────────┘
┌──────────┬───────────────────────────────┐
│          │    Sort Options               │
│ Filters  │ + Product Grid (3 cols)       │
│ Sidebar  │                               │
│          │ Product Cards...              │
└──────────┴───────────────────────────────┘
```

### Mobile Layout
```
┌──────────────────────────┐
│   Search Bar             │
├──────────────────────────┤
│ [⊕ Show Filters] [Sort]  │
├──────────────────────────┤
│ Product Grid (2 cols)    │
│ ...                      │
│ ...                      │
└──────────────────────────┘
```

## 💾 State Management

ProductListingPage manages all state:
```javascript
const [searchQuery, setSearchQuery] = useState("");
const [selectedCategory, setSelectedCategory] = useState("");
const [sortBy, setSortBy] = useState("newest");
const [showMobileFilters, setShowMobileFilters] = useState(false);
```

## ⚙️ Filtering Logic

### Search
- Searches product name (case-insensitive)
- Searches product description (case-insensitive)
- Multiple keywords: Each word narrows results

### Category Filter
- Radio button (single select)
- "All Products" shows everything
- Categories auto-extracted from products

### Sort
- **newest**: Sorted by created_at (newest first)
- **price-low**: Sorted by price ascending
- **price-high**: Sorted by price descending

## 🎛️ Customization

### Add Another Sort Option
Edit `src/components/SortOptions.jsx`:
```javascript
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },  // ADD THIS
];
```

Then handle it in `ProductListingPage.jsx`:
```javascript
} else if (sortBy === "rating") {
  result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
}
```

### Search Additional Fields
Edit `ProductListingPage.jsx`:
```javascript
result = result.filter(
  (product) =>
    product.name.toLowerCase().includes(query) ||
    product.description?.toLowerCase().includes(query) ||
    product.category?.toLowerCase().includes(query)  // ADD
);
```

## 📱 Responsive Breakpoints

- **Mobile** (< 768px): Full-width, collapsible filters
- **Tablet** (768px - 1024px): Filters hidden, toggle button
- **Desktop** (> 1024px): Sidebar visible, 2-3 column grid

## ✨ Key Features

| Feature | Details |
|---------|---------|
| Real-time | No delay, instant results |
| Reusable | All components can be used elsewhere |
| Accessible | Proper labels, ARIA attributes |
| Responsive | Mobile, tablet, desktop optimized |
| Performance | Uses useMemo for efficiency |
| No Dependencies | Uses existing packages (lucide, react) |

## 📊 Component Props Reference

### SearchBar
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| searchQuery | string | required | Current search text |
| onSearchChange | function | required | Callback on input change |
| placeholder | string | "Search products..." | Input placeholder |

### FilterPanel
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| categories | array | required | List of unique categories |
| selectedCategory | string | required | Currently selected category |
| onCategoryChange | function | required | Callback on category change |
| resultCount | number | required | Number of filtered products |

### SortOptions
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| sortBy | string | required | Current sort option |
| onSortChange | function | required | Callback on sort change |

### EmptyState
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| searchQuery | string | required | Current search text |
| selectedCategory | string | required | Currently selected category |
| onReset | function | required | Callback to reset filters |

## 🚀 Performance Tips

1. **Use useMemo** - Prevents unnecessary re-filtering
2. **Client-side filtering** - No API calls needed
3. **Lazy mobile filters** - Hidden by default on mobile
4. **Optimized sorting** - Efficient algorithms for large datasets

## ❌ Troubleshooting

| Issue | Solution |
|-------|----------|
| Search not working | Check that product names/descriptions exist in data |
| Categories empty | Verify products have category field populated |
| Sort not changing | Check sortBy state is updating correctly |
| Mobile filter doesn't show | Verify showMobileFilters state toggles on click |
| Results lag | Check browser DevTools for performance bottlenecks |

## 🎉 That's It!

Advanced search and filtering is now ready to use. Try it out on `/products` page!
