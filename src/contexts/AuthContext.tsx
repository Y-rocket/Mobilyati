import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('furniture_hub_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user');
        localStorage.removeItem('furniture_hub_user');
      }
    }
    setIsLoading(false);
  }, []);

  // For demo purposes, we're mocking authentication
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in a real app, this would come from the backend
      const userData: User = {
        id: '1',
        name: 'Demo User',
        email,
        role: 'designer',
        status: 'active',
        createdAt: new Date().toISOString(),
        profileComplete: true
      };
      
      setUser(userData);
      localStorage.setItem('furniture_hub_user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login failed', error);
      throw new Error('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in a real app, this would come from the backend
      const userData: User = {
        id: '1',
        name,
        email,
        role,
        status: 'active',
        createdAt: new Date().toISOString(),
        profileComplete: false
      };
      
      setUser(userData);
      localStorage.setItem('furniture_hub_user', JSON.stringify(userData));
    } catch (error) {
      console.error('Signup failed', error);
      throw new Error('Signup failed. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('furniture_hub_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      signup, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}