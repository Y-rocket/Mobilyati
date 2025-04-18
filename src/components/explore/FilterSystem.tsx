import { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { FilterOption, UserRole } from '../../types';

interface FilterSystemProps {
  options: FilterOption[];
  selectedFilters: UserRole[];
  onFilterChange: (filters: UserRole[]) => void;
}

export default function FilterSystem({ 
  options, 
  selectedFilters, 
  onFilterChange 
}: FilterSystemProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterToggle = (filterId: UserRole) => {
    if (selectedFilters.includes(filterId)) {
      onFilterChange(selectedFilters.filter(id => id !== filterId));
    } else {
      onFilterChange([...selectedFilters, filterId]);
    }
  };

  const clearAllFilters = () => {
    onFilterChange([]);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      {/* Mobile Filter Button */}
      <div className="md:hidden p-4 border-b border-gray-100">
        <button
          className="w-full px-4 py-2 bg-gray-100 rounded-lg flex justify-between items-center"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <span className="font-medium">Filters</span>
          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {selectedFilters.length}
          </span>
        </button>
      </div>

      {/* Filter Container */}
      <div
        className={cn(
          'md:block transition-all duration-300 ease-in-out',
          {
            'block': isFilterOpen,
            'hidden': !isFilterOpen && window.innerWidth < 768
          }
        )}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Filter By</h3>
            {selectedFilters.length > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-primary-600 hover:text-primary-800"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              {options.map((option) => (
                <div key={option.id} className="flex items-center">
                  <input
                    id={`filter-${option.id}`}
                    type="checkbox"
                    checked={selectedFilters.includes(option.id)}
                    onChange={() => handleFilterToggle(option.id)}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label
                    htmlFor={`filter-${option.id}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {option.label} <span className="text-gray-500">({option.count})</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Filters */}
      {selectedFilters.length > 0 && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((filterId) => {
              const option = options.find((o) => o.id === filterId);
              return (
                <span
                  key={filterId}
                  className="inline-flex items-center bg-white rounded-full px-3 py-1 text-sm border border-gray-200"
                >
                  {option?.label}
                  <button
                    onClick={() => handleFilterToggle(filterId)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    <X size={14} />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}