'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  primaryRole: string;
  studentProfileId?: string;
  organizationId?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (userData: AuthUser) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: async () => {},
  refreshUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const normalizeUser = (u: any): AuthUser | null => {
    if (!u) return null;
    const primaryRole = u.primaryRole || (u.roles && u.roles[0]) || 'STUDENT';
    return {
      ...u,
      primaryRole,
    };
  };

  const fetchSession = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(normalizeUser(data.user));
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const login = (userData: AuthUser) => {
    setUser(normalizeUser(userData));
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      setUser(null);
      router.push('/login');
      router.refresh();
    }
  };

  const refreshUser = async () => {
    await fetchSession();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
