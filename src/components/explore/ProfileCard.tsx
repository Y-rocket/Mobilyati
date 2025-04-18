import { useState } from 'react';
import { MapPin, Award, Calendar, Bookmark, Building, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Card, { CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { Profile } from '../../types';

interface ProfileCardProps {
  profile: Profile;
  isFavorited: boolean;
  onToggleFavorite: (profileId: string) => void;
}

export default function ProfileCard({ profile, isFavorited, onToggleFavorite }: ProfileCardProps) {
  const { isAuthenticated } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  // Get background image based on profile type or use default
  const getCardBackground = () => {
    // This would use a more sophisticated method with actual images
    return profile.images && profile.images.length > 0
      ? profile.images[0]
      : 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
  };

  const getTypeIcon = () => {
    switch (profile.type) {
      case 'designer':
        return <Award className="mr-1" size={16} />;
      case 'supplier':
      case 'producer':
        return <Building className="mr-1" size={16} />;
      case 'retailer':
        return <ExternalLink className="mr-1" size={16} />;
      default:
        return <Building className="mr-1" size={16} />;
    }
  };

  const roleLabel = () => {
    switch (profile.type) {
      case 'designer':
        return 'Designer';
      case 'producer':
        return 'Producer';
      case 'supplier':
        return 'Supplier';
      case 'retailer':
        return 'Retailer';
      case 'educational':
        return 'Educational';
      case 'government':
        return 'Government';
      case 'student':
        return 'Student';
      case 'development':
        return 'Development';
      default:
        return profile.type;
    }
  };

  return (
    <Card 
      className="h-full transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="h-44 bg-cover bg-center relative" 
        style={{ backgroundImage: `url(${getCardBackground()})` }}
      >
        {profile.featured && (
          <div className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-bold uppercase px-2 py-1 rounded">
            Featured
          </div>
        )}
        {isAuthenticated && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(profile.id);
            }}
            className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-sm hover:shadow transition-all"
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Bookmark 
              size={16} 
              className={isFavorited ? "fill-primary-500 text-primary-500" : "text-gray-500"} 
            />
          </button>
        )}
      </div>

      <CardContent className="pt-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-lg">{profile.name}</h3>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              {getTypeIcon()}
              <span>{roleLabel()}</span>
            </div>
          </div>
        </div>

        {profile.specialty && (
          <p className="mt-2 text-sm text-gray-600">
            <span className="font-medium">Specialty:</span> {profile.specialty}
          </p>
        )}

        {profile.location && (
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <MapPin size={16} className="mr-1" />
            <span>{profile.location}</span>
          </div>
        )}

        {profile.experience && (
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <Calendar size={16} className="mr-1" />
            <span>{profile.experience} years experience</span>
          </div>
        )}

        {profile.description && (
          <p className="mt-3 text-sm text-gray-700 line-clamp-2">
            {profile.description}
          </p>
        )}
      </CardContent>

      <CardFooter className="pt-2 pb-4">
        <Link 
          to={`/profile/${profile.id}`} 
          className="w-full"
        >
          <Button 
            variant={isHovered ? "primary" : "outline"} 
            fullWidth
            className="transition-all duration-300"
          >
            {isAuthenticated ? "View Profile" : "Preview Profile"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}