import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface User {
  id: string;
  email: string;
  user_metadata?: {
    name?: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-3e0adeba`;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setUser(session.user as User);
          setAccessToken(session.access_token);
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user as User);
        setAccessToken(session.access_token);
      } else {
        setUser(null);
        setAccessToken(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const response = await axios.post(`${API_BASE}/auth/signup`, {
        email,
        password,
        name
      }, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      // Automatically sign in after signup
      await signIn(email, password);
    } catch (error: any) {
      console.error('Sign up error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to sign up');
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      setUser(data.user as User);
      setAccessToken(data.session.access_token);
    } catch (error: any) {
      console.error('Sign in error:', error.message);
      throw new Error(error.message || 'Failed to sign in');
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setAccessToken(null);
    } catch (error: any) {
      console.error('Sign out error:', error.message);
      throw new Error('Failed to sign out');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
