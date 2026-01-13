import { useState, useEffect } from 'react';
import * as categoryService from '../services/categoryService';

const Sidebar = ({ onFilterChange, filters }) => {
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const result = await categoryService.getAllCategories();
      if (result.success) {
        setCategories(result.data || []);
      }
    } catch (err) {
      console.error('Failed to load categories', err);
    }
  };

  const handleCategoryToggle = (categorySlug) => {
    const newSelected = selectedCategories.includes(categorySlug)
      ? selectedCategories.filter(slug => slug !== categorySlug)
      : [...selectedCategories, categorySlug];
    setSelectedCategories(newSelected);
    onFilterChange({ ...filters, categories: newSelected });
  };

  const handlePriceChange = () => {
    onFilterChange({ 
      ...filters, 
      priceMin: priceRange.min ? Number(priceRange.min) : null,
      priceMax: priceRange.max ? Number(priceRange.max) : null
    });
    // Close mobile sidebar after applying
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onFilterChange({ ...filters, sortBy: value });
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setPriceRange({ min: '', max: '' });
    setSortBy('');
    onFilterChange({ 
      categories: [], 
      priceMin: null, 
      priceMax: null, 
      sortBy: '', 
      minRating: null, 
      inStock: false 
    });
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-4 right-4 z-50 p-3 md:p-4 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors"
        aria-label="Toggle filters"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      </button>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:sticky top-0 left-0 h-screen md:h-auto
        w-80 md:w-72 bg-white border-r md:border-r-0 md:border border-gray-200 
        rounded-none md:rounded-lg p-4 md:p-6 overflow-y-auto z-50
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">Filters</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="text-xs md:text-sm text-primary-600 hover:text-primary-700 font-semibold"
            >
              Reset
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Sort By */}
        <div className="mb-4 md:mb-6">
          <h3 className="font-semibold text-sm md:text-base text-gray-900 mb-2 md:mb-3">Sort By</h3>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full px-2 md:px-3 py-1.5 md:py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="rating-desc">Highest Rated</option>
            <option value="discount-desc">Best Discount</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="mb-4 md:mb-6">
          <h3 className="font-semibold text-sm md:text-base text-gray-900 mb-2 md:mb-3">Price Range</h3>
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              placeholder="Min"
              className="w-full px-2 md:px-3 py-1.5 md:py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              placeholder="Max"
              className="w-full px-2 md:px-3 py-1.5 md:py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>
          <button
            onClick={handlePriceChange}
            className="w-full px-3 md:px-4 py-1.5 md:py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-xs md:text-sm font-medium"
          >
            Apply Price Filter
          </button>
        </div>

        {/* Categories */}
        <div className="mb-4 md:mb-6">
          <h3 className="font-semibold text-sm md:text-base text-gray-900 mb-2 md:mb-3">Categories</h3>
          <div className="space-y-1.5 md:space-y-2 max-h-48 md:max-h-64 overflow-y-auto">
            {categories.map((category) => (
              <label key={category.slug} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1.5 md:p-2 rounded">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.slug)}
                  onChange={() => handleCategoryToggle(category.slug)}
                  className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-600"
                />
                <span className="text-xs md:text-sm text-gray-700 capitalize">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="mb-4 md:mb-6">
          <h3 className="font-semibold text-sm md:text-base text-gray-900 mb-2 md:mb-3">Minimum Rating</h3>
          <div className="space-y-1.5 md:space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1.5 md:p-2 rounded">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  onChange={(e) => onFilterChange({ ...filters, minRating: Number(e.target.value) })}
                  className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-600 border-gray-300 focus:ring-primary-600"
                />
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-3.5 h-3.5 md:w-4 md:h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1.5 md:ml-2 text-xs md:text-sm text-gray-700">& up</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* In Stock Only */}
        <div className="mb-4 md:mb-6">
          <label className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1.5 md:p-2 rounded">
            <input
              type="checkbox"
              onChange={(e) => onFilterChange({ ...filters, inStock: e.target.checked })}
              className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-600"
            />
            <span className="text-xs md:text-sm text-gray-700">In Stock Only</span>
          </label>
        </div>

        {/* Mobile Apply Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden w-full btn-primary py-2 text-sm"
        >
          Apply Filters
        </button>
      </div>
    </>
  );
};

export default Sidebar;