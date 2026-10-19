import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  demoLogin: (role: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('oceanova_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('oceanova_token'));

  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('oceanova_token', newToken);
    localStorage.setItem('oceanova_user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('oceanova_token');
    localStorage.removeItem('oceanova_user');
  };

  const demoLogin = (role: string) => {
    const demoUsers: Record<string, User> = {
      FOUNDER: { id: 'u-founder', name: 'Dr. OceaNova Founder', email: 'founder@oceanova.org', role: 'FOUNDER', department: 'Executive Office' },
      RESEARCHER: { id: 'u-researcher', name: 'Dr. Ananya Rao', email: 'ananya@oceanova.org', role: 'RESEARCHER', department: 'Blue Carbon Science' },
      FIELD_STAFF: { id: 'u-field', name: 'Ravi Kumar', email: 'field@oceanova.org', role: 'FIELD_STAFF', department: 'Mangrove Operations' },
      FINANCE: { id: 'u-finance', name: 'S. K. Murthy', email: 'finance@oceanova.org', role: 'FINANCE', department: 'Financial Operations' },
    };

    const targetUser = demoUsers[role] || demoUsers.FOUNDER;
    const mockToken = `demo_jwt_token_${role.toLowerCase()}`;
    login(mockToken, targetUser);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, demoLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
