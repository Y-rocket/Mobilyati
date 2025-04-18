import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useUi } from '../../contexts/UiContext';
import Button from '../ui/Button';
import { cn } from '../../utils/cn';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Explore', path: '/explore' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Blog', path: '/blog' },
];

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const { language, setLanguage, isDarkMode, toggleDarkMode, isMobileMenuOpen, setMobileMenuOpen } = useUi();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        {
          'bg-white shadow-sm': isScrolled,
          'bg-transparent': !isScrolled && location.pathname === '/',
          'bg-white': !isScrolled && location.pathname !== '/',
        }
      )}
    >
      <div className="container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="h-8 w-8 rounded bg-primary-600 flex items-center justify-center text-white">
              <span className="font-bold">FH</span>
            </div>
            <span className="ml-2 text-lg font-bold text-gray-900">Furniture Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary-600',
                  {
                    'text-primary-600': location.pathname === item.path,
                    'text-gray-600': location.pathname !== item.path,
                  }
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle language"
            >
              <Globe size={20} />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAuthenticated ? (
              <div className="relative ml-3">
                <div className="flex items-center space-x-4">
                  <Link to="/dashboard">
                    <Button size="sm" variant="outline">Dashboard</Button>
                  </Link>
                  <Button size="sm" variant="ghost" onClick={logout}>Logout</Button>
                </div>
              </div>
            ) : (
              <Link to="/auth">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-slide-down">
          <div className="container py-3 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'block py-2 px-3 rounded-md text-base font-medium',
                  {
                    'text-primary-600 bg-primary-50': location.pathname === item.path,
                    'text-gray-900 hover:bg-gray-50': location.pathname !== item.path,
                  }
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-4 pb-2 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Language Toggle */}
                  <button
                    onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                    className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none"
                    aria-label="Toggle language"
                  >
                    <Globe size={20} />
                    <span className="ml-2 text-sm font-medium">
                      {language === 'en' ? 'العربية' : 'English'}
                    </span>
                  </button>

                  {/* Theme Toggle */}
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none"
                    aria-label="Toggle dark mode"
                  >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    <span className="ml-2 text-sm font-medium">
                      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {isAuthenticated ? (
              <div className="pt-2 space-y-2">
                <div className="py-2">
                  <p className="text-sm text-gray-500">Signed in as:</p>
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                </div>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" fullWidth>Dashboard</Button>
                </Link>
                <Button size="sm" variant="outline" fullWidth onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="pt-2">
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                  <Button fullWidth>Sign In</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}