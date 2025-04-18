import { Building, Users, Award, Globe, CheckCircle, Zap } from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Amira Hassan',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      name: 'Mohamed Fahmy',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      name: 'Laila Ibrahim',
      role: 'Design Director',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      name: 'Karim Ahmed',
      role: 'Business Development',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Furniture Hub</h1>
            <p className="text-xl text-primary-100">
              Connecting the Egyptian furniture industry through a comprehensive directory and knowledge platform
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600">
              To create a unified platform that empowers Egypt's furniture ecosystem by facilitating connections,
              promoting knowledge exchange, and fostering innovation in the industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect</h3>
              <p className="text-gray-600">
                Bringing together designers, producers, suppliers, retailers, educational institutions, and more in one comprehensive network.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Discover</h3>
              <p className="text-gray-600">
                Enabling stakeholders to find the right partners, resources, and information to support their furniture-related endeavors.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Grow</h3>
              <p className="text-gray-600">
                Supporting the expansion of Egypt's furniture industry through enhanced visibility, knowledge sharing, and industry connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <img 
                  src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Furniture workshop" 
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  Furniture Hub began in 2022 when a group of industry professionals recognized the fragmented nature of Egypt's furniture sector. Despite being known for high-quality craftsmanship and design, the industry lacked a centralized platform for connection and knowledge sharing.
                </p>
                <p className="text-gray-700 mb-4">
                  We set out to create a solution that would bring together all stakeholders in the furniture ecosystem – from designers and producers to educational institutions and government entities – enabling a more collaborative and efficient industry.
                </p>
                <p className="text-gray-700">
                  Today, Furniture Hub serves as Egypt's premier platform for furniture industry professionals, helping to elevate the sector both locally and internationally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Furniture Hub</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <CheckCircle size={24} className="text-primary-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-2">Comprehensive Directory</h3>
                <p className="text-gray-600">
                  The most complete listing of furniture industry stakeholders in Egypt, organized by category and specialty.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <CheckCircle size={24} className="text-primary-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-2">Industry Expertise</h3>
                <p className="text-gray-600">
                  Created by furniture professionals with deep understanding of the sector's needs and challenges.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <CheckCircle size={24} className="text-primary-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-2">Enhanced Visibility</h3>
                <p className="text-gray-600">
                  Helps businesses and professionals showcase their expertise and connect with potential clients and partners.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <CheckCircle size={24} className="text-primary-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-2">Bilingual Support</h3>
                <p className="text-gray-600">
                  Full Arabic and English language support to serve both local and international users effectively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-56 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide our platform and community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-primary-700">Inclusivity</h3>
              <p className="text-gray-700">
                We welcome all stakeholders in the furniture industry regardless of size, specialty, or experience level.
              </p>
            </div>

            <div className="bg-secondary-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-secondary-700">Quality</h3>
              <p className="text-gray-700">
                We promote excellence in craftsmanship, design, and business practices throughout the furniture ecosystem.
              </p>
            </div>

            <div className="bg-accent-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-accent-700">Innovation</h3>
              <p className="text-gray-700">
                We encourage new ideas, technologies, and approaches that can advance Egypt's furniture industry.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}