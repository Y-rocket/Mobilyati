import { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Heart, Edit, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import ProfileDashboard from './dashboard/ProfileDashboard';
import FavoritesDashboard from './dashboard/FavoritesDashboard';
import SettingsDashboard from './dashboard/SettingsDashboard';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    {
      name: 'Profile',
      path: '/dashboard',
      icon: <User size={20} />,
    },
    {
      name: 'Favorites',
      path: '/dashboard/favorites',
      icon: <Heart size={20} />,
    },
    {
      name: 'Settings',
      path: '/dashboard/settings',
      icon: <Settings size={20} />,
    },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/dashboard';
  };

  return (
    <div className="bg-gray-50">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4 lg:w-1/5">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Mobile Menu Toggle */}
              <div className="md:hidden p-4 flex justify-between items-center border-b border-gray-100">
                <h2 className="font-bold text-lg">Dashboard</h2>
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              <div className={`md:block ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                {/* User Info */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="p-2">
                  <ul className="space-y-1">
                    {navItems.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className={`flex items-center px-4 py-2 rounded-md text-sm ${
                            isActive(item.path)
                              ? 'bg-primary-50 text-primary-700 font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="mr-3">{item.icon}</span>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <span className="mr-3">
                          <LogOut size={20} />
                        </span>
                        Log Out
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4 lg:w-4/5">
            <Routes>
              <Route index element={<ProfileDashboard />} />
              <Route path="favorites" element={<FavoritesDashboard />} />
              <Route path="settings" element={<SettingsDashboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}