import { useState } from 'react';
import { Edit, Check, X, MapPin, Award, Calendar, Link as LinkIcon, Save } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

export default function ProfileDashboard() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Mock profile data
  const [profileData, setProfileData] = useState({
    name: 'Cairo Design Studios',
    type: user?.role || 'designer',
    specialty: 'Modern Furniture Design',
    description: 'Award-winning design studio specializing in contemporary furniture for residential and commercial spaces.',
    location: 'Cairo',
    experience: 12,
    website: 'https://example.com',
    phone: '+20 10 1234 5678',
    email: user?.email || '',
    socialLinks: {
      facebook: 'https://facebook.com/example',
      instagram: 'https://instagram.com/example',
      linkedin: 'https://linkedin.com/company/example',
    },
    images: [
      'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
  });
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsEditing(false);
    setIsSaving(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profile Management</h1>
        <div>
          {isEditing ? (
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={isSaving}
              >
                <X size={16} className="mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                isLoading={isSaving}
              >
                <Save size={16} className="mr-2" />
                Save Changes
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              variant="primary"
            >
              <Edit size={16} className="mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Business/Professional Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleFormChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={profileData.type}
                    onChange={handleFormChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="designer">Designer</option>
                    <option value="producer">Producer</option>
                    <option value="supplier">Supplier</option>
                    <option value="retailer">Retailer</option>
                    <option value="educational">Educational Institution</option>
                    <option value="government">Government Entity</option>
                    <option value="student">Student</option>
                    <option value="development">Development Project</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
                    Specialty
                  </label>
                  <input
                    type="text"
                    id="specialty"
                    name="specialty"
                    value={profileData.specialty}
                    onChange={handleFormChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={profileData.location}
                    onChange={handleFormChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    value={profileData.experience}
                    onChange={handleFormChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={profileData.website}
                    onChange={handleFormChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleFormChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleFormChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={profileData.description}
                  onChange={handleFormChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Social Media Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-1">
                      Facebook
                    </label>
                    <input
                      type="url"
                      id="facebook"
                      name="socialLinks.facebook"
                      value={profileData.socialLinks.facebook}
                      onChange={handleFormChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
                      Instagram
                    </label>
                    <input
                      type="url"
                      id="instagram"
                      name="socialLinks.instagram"
                      value={profileData.socialLinks.instagram}
                      onChange={handleFormChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      id="linkedin"
                      name="socialLinks.linkedin"
                      value={profileData.socialLinks.linkedin}
                      onChange={handleFormChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Portfolio Images</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="space-y-1">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span>Upload images</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div>
              <div className="mb-8">
                <div 
                  className="h-48 bg-cover bg-center rounded-lg mb-6" 
                  style={{ 
                    backgroundImage: `url(${profileData.images[0]})` 
                  }}
                />
                
                <h2 className="text-2xl font-bold mb-2">{profileData.name}</h2>
                <div className="flex items-center text-gray-600 mb-4">
                  <Award size={18} className="mr-2" />
                  <span className="capitalize">{profileData.type}</span>
                  {profileData.specialty && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{profileData.specialty}</span>
                    </>
                  )}
                </div>
                
                <p className="text-gray-700 mb-6">{profileData.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start">
                    <MapPin size={20} className="text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Location</p>
                      <p className="text-gray-600">{profileData.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Calendar size={20} className="text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Experience</p>
                      <p className="text-gray-600">{profileData.experience} years</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <LinkIcon size={20} className="text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Website</p>
                      <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800">
                        {new URL(profileData.website).hostname}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium mb-4">Profile Status</h3>
                <div className="bg-success-50 border border-success-200 rounded-md p-4 flex items-start">
                  <Check size={20} className="text-success-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-success-800">Your profile is complete</p>
                    <p className="text-success-700 text-sm mt-1">
                      Your profile is visible to all registered users in the Furniture Hub directory.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}