import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { UserProfile, UserRole } from '@/backend';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (username: string, password: string, name: string, role: UserRole) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user storage interface
interface StoredUser {
  username: string;
  password: string;
  name: string;
  role: UserRole;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      const sessionUser = localStorage.getItem('currentUser');
      if (sessionUser) {
        try {
          const userData = JSON.parse(sessionUser);
          setUser({
            name: userData.name,
            email: '', // Not used in new system
            role: userData.role,
          });
          setRole(userData.role as UserRole);
        } catch (error) {
          console.error('Failed to parse session:', error);
          localStorage.removeItem('currentUser');
        }
      }
      setIsLoading(false);
    };

    checkSession();
  }, []);

  const login = async (username: string, password: string) => {
    // Get all registered users
    const usersJson = localStorage.getItem('registeredUsers');
    const users: StoredUser[] = usersJson ? JSON.parse(usersJson) : [];

    // Find matching user
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!foundUser) {
      throw new Error('Invalid username or password');
    }

    // Set session
    const userData = {
      username: foundUser.username,
      name: foundUser.name,
      role: foundUser.role,
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    setUser({
      name: foundUser.name,
      email: '',
      role: foundUser.role,
    });
    setRole(foundUser.role);
  };

  const logout = async () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setRole(null);
  };

  const register = async (username: string, password: string, name: string, userRole: UserRole) => {
    // Get existing users
    const usersJson = localStorage.getItem('registeredUsers');
    const users: StoredUser[] = usersJson ? JSON.parse(usersJson) : [];

    // Check if username already exists
    if (users.some((u) => u.username === username)) {
      throw new Error('Username already exists');
    }

    // Add new user
    const newUser: StoredUser = {
      username,
      password,
      name,
      role: userRole,
    };
    
    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));

    // Auto-login after registration
    await login(username, password);
  };

  const refreshProfile = async () => {
    // In mock mode, just reload from localStorage
    const sessionUser = localStorage.getItem('currentUser');
    if (sessionUser) {
      try {
        const userData = JSON.parse(sessionUser);
        setUser({
          name: userData.name,
          email: '',
          role: userData.role,
        });
        setRole(userData.role as UserRole);
      } catch (error) {
        console.error('Failed to refresh profile:', error);
      }
    }
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        isLoading,
        login,
        logout,
        register,
        refreshProfile,
      }}
    >
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
