import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import ProfileCard from '../../components/explore/ProfileCard';
import { Profile } from '../../types';
import { getMockProfiles } from '../../utils/mockData';

export default function FavoritesDashboard() {
  const [favorites, setFavorites] = useState<string[]>(['1', '2', '4']);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Load mock data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const allProfiles = getMockProfiles();
      const favoriteProfiles = allProfiles.filter(profile => favorites.includes(profile.id));
      setProfiles(favoriteProfiles);
      setIsLoading(false);
    };
    
    loadData();
  }, [favorites]);

  const toggleFavorite = (profileId: string) => {
    setFavorites(prevFavorites => prevFavorites.filter(id => id !== profileId));
  };

  // Filter profiles based on search query
  const filteredProfiles = profiles.filter(profile => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      profile.name.toLowerCase().includes(query) ||
      (profile.description && profile.description.toLowerCase().includes(query)) ||
      (profile.specialty && profile.specialty.toLowerCase().includes(query))
    );
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Saved Favorites</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            placeholder="Search your saved profiles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setSearchQuery('')}
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
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
          {searchQuery ? (
            <>
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No matching favorites found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any saved profiles matching "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-primary-600 hover:text-primary-800 font-medium"
              >
                Clear search
              </button>
            </>
          ) : (
            <>
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
              <p className="text-gray-600">
                Start exploring the directory and save profiles you're interested in.
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              isFavorited={true}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}