import React, { useState } from 'react';

interface FilterComponentProps {
  onApplyFilters: (filters: {
    category: string;
    minPrice: number | null;
    maxPrice: number | null;
    tags: string[];
    date: string | null;
  }) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ onApplyFilters }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [minPriceFilter, setMinPriceFilter] = useState<number | null>(null);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number | null>(null);
  const [tagsFilter, setTagsFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string | null>(null);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      category: categoryFilter,
      minPrice: minPriceFilter,
      maxPrice: maxPriceFilter,
      tags: tagsFilter.split(',').map(tag => tag.trim()),
      date: dateFilter,
    });
  };

  return (
    <div className="max-w-[30%] mx-auto p-4 bg-white shadow-md rounded-lg">
      <button
        onClick={toggleFilters}
        className="mt-4 bg-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-400 transition-colors">
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      {showFilters && (
        <div className="mt-4 border-t pt-4">
          <h2 className="text-lg font-semibold mb-2">Filters</h2>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          >
            <option value="">Category</option>
         
          </select>

          <div className="flex space-x-2 mb-2">
            <input
              type="number"
              value={minPriceFilter || ''}
              onChange={(e) => setMinPriceFilter(e.target.value ? parseFloat(e.target.value) : null)}
              placeholder="Min Price"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              value={maxPriceFilter || ''}
              onChange={(e) => setMaxPriceFilter(e.target.value ? parseFloat(e.target.value) : null)}
              placeholder="Max Price"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <input
            type="text"
            value={tagsFilter}
            onChange={(e) => setTagsFilter(e.target.value)}
            placeholder="Tags (comma-separated)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          />

          <input
            type="date"
            value={dateFilter || ''}
            onChange={(e) => setDateFilter(e.target.value ? e.target.value : null)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          />

          <button
            onClick={handleApplyFilters}
            className="mt-4 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;

