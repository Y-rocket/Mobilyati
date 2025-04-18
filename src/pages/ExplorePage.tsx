import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import Button from '../components/ui/Button';
import FilterSystem from '../components/explore/FilterSystem';
import ProfileCard from '../components/explore/ProfileCard';
import { Profile, FilterOption, UserRole } from '../types';
import { getMockProfiles } from '../utils/mockData';

export default function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<UserRole[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Initialize from URL params
  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam) {
      setSelectedFilters([typeParam as UserRole]);
    }

    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  // Mock data fetching
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockProfiles = getMockProfiles();
      setProfiles(mockProfiles);

      // Create filter options with counts
      const options: FilterOption[] = [
        { id: 'designer', label: 'Designers', count: mockProfiles.filter(p => p.type === 'designer').length },
        { id: 'producer', label: 'Producers', count: mockProfiles.filter(p => p.type === 'producer').length },
        { id: 'supplier', label: 'Suppliers', count: mockProfiles.filter(p => p.type === 'supplier').length },
        { id: 'retailer', label: 'Retailers', count: mockProfiles.filter(p => p.type === 'retailer').length },
        { id: 'educational', label: 'Educational', count: mockProfiles.filter(p => p.type === 'educational').length },
        { id: 'government', label: 'Government', count: mockProfiles.filter(p => p.type === 'government').length },
        { id: 'student', label: 'Students', count: mockProfiles.filter(p => p.type === 'student').length },
        { id: 'development', label: 'Development', count: mockProfiles.filter(p => p.type === 'development').length },
      ];
      setFilterOptions(options);
      
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...profiles];
    
    // Apply type filters
    if (selectedFilters.length > 0) {
      result = result.filter(profile => selectedFilters.includes(profile.type));
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(profile => 
        profile.name.toLowerCase().includes(query) || 
        (profile.description && profile.description.toLowerCase().includes(query)) ||
        (profile.specialty && profile.specialty.toLowerCase().includes(query))
      );
    }
    
    setFilteredProfiles(result);
    
    // Update URL params
    const params = new URLSearchParams();
    if (selectedFilters.length === 1) {
      params.set('type', selectedFilters[0]);
    }
    if (searchQuery) {
      params.set('q', searchQuery);
    }
    setSearchParams(params, { replace: true });
    
  }, [profiles, selectedFilters, searchQuery, setSearchParams]);

  const handleFilterChange = (filters: UserRole[]) => {
    setSelectedFilters(filters);
  };

  const toggleFavorite = (profileId: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(profileId)) {
        return prevFavorites.filter(id => id !== profileId);
      } else {
        return [...prevFavorites, profileId];
      }
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already applied via the useEffect
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="bg-gray-50 py-8 min-h-screen">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Explore Directory</h1>
          <p className="text-gray-600">
            Discover the best designers, producers, suppliers, and more in Egypt's furniture industry
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <form onSubmit={handleSearch} className="relative">
            <div className="flex">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Search by name, specialty, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={clearSearch}
                  >
                    <X className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                  </button>
                )}
              </div>
              <div className="ml-4 hidden md:block">
                <Button type="submit">
                  Search
                </Button>
              </div>
              <div className="ml-4 md:hidden">
                <Button 
                  type="button"
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                  variant="outline"
                >
                  <SlidersHorizontal size={20} />
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters */}
          <div className={`md:w-1/4 lg:w-1/5 transition-all ${isMobileFilterOpen ? 'block' : 'hidden md:block'}`}>
            <FilterSystem
              options={filterOptions}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Results */}
          <div className="md:w-3/4 lg:w-4/5">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow animate-pulse h-72">
                    <div className="h-32 bg-gray-200 rounded-t-lg"></div>
                    <div className="p-4">
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProfiles.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
                <Button variant="outline" onClick={() => {
                  setSelectedFilters([]);
                  setSearchQuery('');
                }}>
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div>
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-gray-600">
                    Showing <span className="font-semibold">{filteredProfiles.length}</span> results
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProfiles.map((profile) => (
                    <ProfileCard
                      key={profile.id}
                      profile={profile}
                      isFavorited={favorites.includes(profile.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}