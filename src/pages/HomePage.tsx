import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Users, Award, Building, GraduationCap, Heart, Star, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import { Profile, FilterOption, UserRole } from '../types';
import ProfileCard from '../components/explore/ProfileCard';
import { getMockProfiles } from '../utils/mockData';

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const [featuredProfiles, setFeaturedProfiles] = useState<Profile[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data fetching
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const profiles = getMockProfiles().filter(p => p.featured).slice(0, 4);
      setFeaturedProfiles(profiles);
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  const toggleFavorite = (profileId: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(profileId)) {
        return prevFavorites.filter(id => id !== profileId);
      } else {
        return [...prevFavorites, profileId];
      }
    });
  };

  // Stats for the platform
  const stats = [
    { id: 1, label: 'Designers', value: '120+', icon: <Award size={24} className="text-primary-500" /> },
    { id: 2, label: 'Suppliers', value: '85+', icon: <Building size={24} className="text-secondary-500" /> },
    { id: 3, label: 'Institutions', value: '30+', icon: <GraduationCap size={24} className="text-accent-500" /> },
    { id: 4, label: 'Members', value: '550+', icon: <Users size={24} className="text-success-500" /> },
  ];

  // Directory categories
  const categories: { id: UserRole; label: string; icon: JSX.Element }[] = [
    { id: 'designer', label: 'Designers', icon: <Award size={20} /> },
    { id: 'producer', label: 'Producers', icon: <Building size={20} /> },
    { id: 'supplier', label: 'Suppliers', icon: <Building size={20} /> },
    { id: 'retailer', label: 'Retailers', icon: <Building size={20} /> },
    { id: 'educational', label: 'Educational', icon: <GraduationCap size={20} /> },
    { id: 'student', label: 'Students', icon: <GraduationCap size={20} /> },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-700 to-primary-900 text-white py-24 md:py-32">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Egypt's Complete Furniture Industry Directory
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Connect with designers, producers, suppliers and more in one comprehensive platform
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/explore">
                <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100">
                  Explore Directory
                </Button>
              </Link>
              {!isAuthenticated && (
                <Link to="/auth">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-primary-800">
                    Join the Hub
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        
        {/* Abstract decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(stat => (
              <div key={stat.id} className="text-center">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <p className="text-3xl md:text-4xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Directory Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore Our Directory</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the right connections for your furniture business from our comprehensive directory
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => (
              <Link 
                key={category.id} 
                to={`/explore?type=${category.id}`}
                className="group"
              >
                <Card className="text-center h-full transition-all hover:border-primary-500 hover:shadow-md group-hover:border-primary-500">
                  <CardContent className="p-6">
                    <div className="flex justify-center items-center w-12 h-12 mx-auto mb-4 rounded-full bg-primary-50 text-primary-500 group-hover:bg-primary-100 transition-colors">
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{category.label}</h3>
                    <div className="text-primary-600 inline-flex items-center text-sm font-medium transition-colors group-hover:text-primary-700">
                      Browse <ChevronRight size={16} className="ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/explore">
              <Button size="lg">
                View Full Directory
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Profiles */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Profiles</h2>
              <p className="text-gray-600">Highlighted professionals and companies in the furniture industry</p>
            </div>
            <Link to="/explore?featured=true" className="text-primary-600 hover:text-primary-800 inline-flex items-center">
              View all <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <Card key={i} className="h-80 animate-pulse">
                  <div className="h-40 bg-gray-200"></div>
                  <CardContent className="p-4">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProfiles.map(profile => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  isFavorited={favorites.includes(profile.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary-600 to-secondary-800 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Join Egypt's Furniture Network?</h2>
            <p className="text-xl mb-8 text-secondary-100">
              Create your profile, connect with industry professionals, and grow your business.
            </p>
            
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-white text-secondary-700 hover:bg-gray-100">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button size="lg" className="bg-white text-secondary-700 hover:bg-gray-100">
                  Join Now
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}