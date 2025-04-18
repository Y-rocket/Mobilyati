import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Building, Calendar, Mail, Phone, Globe, Facebook, Instagram, Linkedin, Heart, Star, ArrowLeft, Share2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import { Profile } from '../types';
import { getMockProfiles } from '../utils/mockData';

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const profiles = getMockProfiles();
      const foundProfile = profiles.find(p => p.id === id) || null;
      setProfile(foundProfile);
      setIsLoading(false);
    };
    
    loadProfile();
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-24 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
            <p className="text-gray-600 mb-6">The profile you're looking for doesn't exist or has been removed.</p>
            <Link to="/explore">
              <Button>
                <ArrowLeft size={16} className="mr-2" />
                Back to Explore
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/explore" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft size={16} className="mr-2" />
            Back to Explore
          </Link>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div 
            className="h-64 bg-cover bg-center relative" 
            style={{ 
              backgroundImage: `url(${profile.images && profile.images.length > 0 
                ? profile.images[0] 
                : 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'})` 
            }}
          >
            {profile.featured && (
              <div className="absolute top-4 left-4 bg-accent-500 text-white text-xs font-bold uppercase px-2 py-1 rounded">
                Featured
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                <div className="flex items-center mt-2">
                  <Building size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-600">{profile.type.charAt(0).toUpperCase() + profile.type.slice(1)}</span>
                  {profile.specialty && (
                    <>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-gray-600">{profile.specialty}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex space-x-3">
                {isAuthenticated && (
                  <Button 
                    variant={isFavorited ? "primary" : "outline"} 
                    onClick={toggleFavorite}
                  >
                    <Heart size={16} className={`mr-2 ${isFavorited ? 'fill-white' : ''}`} />
                    {isFavorited ? 'Saved' : 'Save'}
                  </Button>
                )}
                <Button variant="outline">
                  <Share2 size={16} className="mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Authentication Prompt */}
            {!isAuthenticated && (
              <div className="mt-6 p-4 bg-gray-50 border border-gray-100 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <p className="text-gray-600 mb-3 sm:mb-0">
                    <Star className="inline-block mr-2 text-primary-500" size={18} />
                    Sign in to see full contact details and save this profile
                  </p>
                  <Link to="/auth">
                    <Button size="sm">Sign In</Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Description */}
            {profile.description && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-3">About</h2>
                <p className="text-gray-700">{profile.description}</p>
              </div>
            )}

            {/* Details Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location */}
              {profile.location && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <MapPin size={20} className="text-gray-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Location</h3>
                    <p className="text-gray-600">{profile.location}</p>
                  </div>
                </div>
              )}

              {/* Experience */}
              {profile.experience && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Calendar size={20} className="text-gray-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Experience</h3>
                    <p className="text-gray-600">{profile.experience} years</p>
                  </div>
                </div>
              )}

              {/* Contact Info - Only visible to authenticated users */}
              {isAuthenticated && (
                <>
                  {/* Email */}
                  {profile.email && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Mail size={20} className="text-gray-500" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">Email</h3>
                        <a href={`mailto:${profile.email}`} className="text-primary-600 hover:text-primary-800">
                          {profile.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Phone */}
                  {profile.phone && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Phone size={20} className="text-gray-500" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">Phone</h3>
                        <a href={`tel:${profile.phone}`} className="text-primary-600 hover:text-primary-800">
                          {profile.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Website */}
                  {profile.website && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Globe size={20} className="text-gray-500" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">Website</h3>
                        <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800">
                          {new URL(profile.website).hostname}
                        </a>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Social Links - Only visible to authenticated users */}
            {isAuthenticated && profile.socialLinks && Object.keys(profile.socialLinks).length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-3">Social Media</h2>
                <div className="flex space-x-4">
                  {profile.socialLinks.facebook && (
                    <a 
                      href={profile.socialLinks.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <Facebook size={24} />
                    </a>
                  )}
                  {profile.socialLinks.instagram && (
                    <a 
                      href={profile.socialLinks.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-pink-600 transition-colors"
                    >
                      <Instagram size={24} />
                    </a>
                  )}
                  {profile.socialLinks.linkedin && (
                    <a 
                      href={profile.socialLinks.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-700 transition-colors"
                    >
                      <Linkedin size={24} />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}