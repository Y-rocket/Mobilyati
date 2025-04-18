import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';

const blogPosts = [
  {
    id: '1',
    title: 'The Rise of Sustainable Furniture in Egypt',
    slug: 'sustainable-furniture-egypt',
    excerpt: 'How local designers and manufacturers are embracing eco-friendly materials and production methods.',
    coverImage: 'https://images.pexels.com/photos/4050300/pexels-photo-4050300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'Ahmed Ibrahim',
    category: 'Sustainability',
    publishedAt: '2023-11-15T10:30:00Z',
  },
  {
    id: '2',
    title: 'Damietta: Egypt\'s Furniture Manufacturing Hub',
    slug: 'damietta-furniture-hub',
    excerpt: 'Exploring the history and current state of Damietta, the center of Egypt\'s furniture industry.',
    coverImage: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'Laila Mahmoud',
    category: 'Industry Insights',
    publishedAt: '2023-10-28T14:15:00Z',
  },
  {
    id: '3',
    title: 'Blending Traditional Craftsmanship with Modern Design',
    slug: 'traditional-meets-modern',
    excerpt: 'How Egyptian furniture designers are incorporating traditional techniques into contemporary pieces.',
    coverImage: 'https://images.pexels.com/photos/6207347/pexels-photo-6207347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'Karim Hassan',
    category: 'Design Trends',
    publishedAt: '2023-10-10T09:45:00Z',
  },
  {
    id: '4',
    title: 'Expanding Global Reach: Export Opportunities for Egyptian Furniture',
    slug: 'furniture-export-opportunities',
    excerpt: 'The growing international demand for Egyptian furniture and how local businesses can capitalize on export markets.',
    coverImage: 'https://images.pexels.com/photos/4050425/pexels-photo-4050425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'Sara Fahmy',
    category: 'Business',
    publishedAt: '2023-09-22T11:20:00Z',
  },
  {
    id: '5',
    title: 'Furniture Education in Egypt: Programs and Opportunities',
    slug: 'furniture-education-egypt',
    excerpt: 'An overview of educational pathways for aspiring furniture designers and craftspeople in Egypt.',
    coverImage: 'https://images.pexels.com/photos/8197534/pexels-photo-8197534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'Mohamed Ali',
    category: 'Education',
    publishedAt: '2023-09-15T13:50:00Z',
  },
  {
    id: '6',
    title: 'The Digital Transformation of Furniture Retail in Egypt',
    slug: 'digital-furniture-retail',
    excerpt: 'How e-commerce and digital marketing are changing the way furniture is sold in the Egyptian market.',
    coverImage: 'https://images.pexels.com/photos/5417678/pexels-photo-5417678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'Nour Adel',
    category: 'Retail',
    publishedAt: '2023-08-30T15:15:00Z',
  },
];

const categories = [
  'All',
  'Design Trends',
  'Industry Insights',
  'Sustainability',
  'Business',
  'Education',
  'Retail',
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Furniture Industry Insights</h1>
            <p className="text-xl text-primary-100">
              News, trends, and knowledge about Egypt's furniture sector
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-gray-200 bg-white sticky top-16 z-30">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-primary-100 text-primary-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <section className="py-12">
          <div className="container">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-64 lg:h-auto">
                  <img
                    src={filteredPosts[0].coverImage}
                    alt={filteredPosts[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <Tag size={16} className="text-primary-500 mr-2" />
                    <span className="text-sm font-medium text-primary-600">{filteredPosts[0].category}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{filteredPosts[0].title}</h2>
                  <p className="text-gray-600 mb-6">{filteredPosts[0].excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <User size={16} className="mr-1" />
                    <span className="mr-4">{filteredPosts[0].author}</span>
                    <Calendar size={16} className="mr-1" />
                    <span>{formatDate(filteredPosts[0].publishedAt)}</span>
                  </div>
                  <Link to={`/blog/${filteredPosts[0].slug}`}>
                    <Button className="inline-flex items-center">
                      Read Article
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts */}
      <section className="py-12">
        <div className="container">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No posts found</h3>
              <p className="text-gray-600 mb-6">
                There are no posts in the selected category at the moment.
              </p>
              <Button variant="outline" onClick={() => setActiveCategory('All')}>
                View All Posts
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post) => (
                <Card key={post.id} hover>
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <Tag size={14} className="text-primary-500 mr-2" />
                      <span className="text-xs font-medium text-primary-600">{post.category}</span>
                    </div>
                    <h3 className="font-bold text-xl mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <User size={14} className="mr-1" />
                      <span className="mr-3">{post.author}</span>
                      <Calendar size={14} className="mr-1" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-primary-600 hover:text-primary-800 font-medium inline-flex items-center text-sm"
                    >
                      Read More
                      <ArrowRight size={14} className="ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-secondary-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter for the latest news and insights from Egypt's furniture industry
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                required
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}