import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { useUi } from '../../contexts/UiContext';

export default function Footer() {
  const { language } = useUi();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '#' },
        { name: 'News', href: '/blog' },
        { name: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '/blog' },
        { name: 'FAQ', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Privacy Policy', href: '#' },
      ],
    },
    {
      title: 'Directory',
      links: [
        { name: 'Designers', href: '/explore?type=designer' },
        { name: 'Suppliers', href: '/explore?type=supplier' },
        { name: 'Producers', href: '/explore?type=producer' },
        { name: 'Retailers', href: '/explore?type=retailer' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded bg-primary-500 flex items-center justify-center text-white">
                <span className="font-bold text-lg">FH</span>
              </div>
              <span className="ml-2 text-xl font-bold">Furniture Hub</span>
            </div>
            <p className="mt-4 text-gray-400 max-w-md">
              Egypt's premier furniture industry platform connecting designers, 
              producers, suppliers, retailers, and more in one comprehensive hub.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((column, i) => (
            <div key={i}>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link, j) => (
                  <li key={j}>
                    <Link 
                      to={link.href} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Furniture Hub. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <button
              className="text-gray-400 hover:text-white transition-colors text-sm"
              onClick={() => {
                // Language switch handled by UI context
              }}
            >
              {language === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}