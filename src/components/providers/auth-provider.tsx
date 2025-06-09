'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUIStore } from '@/lib/store';
import apiClient from '@/lib/api';
import type { AuthContextType, LoginRequest, RegisterRequest, User } from '@/types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();
  const { addNotification } = useUIStore();
  
  // Local state for auth
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = () => {
      // For now, just check if token exists
      // Later we can make an API call to validate the token
      const isAuthenticated = apiClient.isAuthenticated();
      if (!isAuthenticated) {
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const response = await apiClient.login(credentials.email, credentials.password);
      return response;
    },
    onSuccess: (data) => {
      setUser(data.user);
      setError(null);
      queryClient.setQueryData(['auth', 'me'], data.user);
      addNotification({
        type: 'success',
        title: 'Welcome back!',
        message: 'You have been successfully logged in.',
      });
    },
    onError: (error: any) => {
      const errorMessage = error.error || 'Login failed';
      setError(errorMessage);
      addNotification({
        type: 'error',
        title: 'Login Failed',
        message: errorMessage,
      });
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (credentials: RegisterRequest) => {
      const response = await apiClient.register(credentials.email, credentials.password);
      return response;
    },
    onSuccess: (data) => {
      setUser(data.user);
      setError(null);
      queryClient.setQueryData(['auth', 'me'], data.user);
      addNotification({
        type: 'success',
        title: 'Account Created!',
        message: 'Welcome to LinkShort! Your account has been created successfully.',
      });
    },
    onError: (error: any) => {
      const errorMessage = error.error || 'Registration failed';
      setError(errorMessage);
      addNotification({
        type: 'error',
        title: 'Registration Failed',
        message: errorMessage,
      });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiClient.logoutUser();
    },
    onSuccess: () => {
      setUser(null);
      setError(null);
      queryClient.clear();
      addNotification({
        type: 'info',
        title: 'Logged Out',
        message: 'You have been successfully logged out.',
      });
    },
    onError: () => {
      // Even if logout fails on server, clear local state
      setUser(null);
      setError(null);
      queryClient.clear();
      addNotification({
        type: 'warning',
        title: 'Logged Out',
        message: 'You have been logged out locally.',
      });
    },
  });

  // Update loading state based on mutation states only
  const isLoadingState = loginMutation.isPending || 
    registerMutation.isPending || 
    logoutMutation.isPending;

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading: isLoadingState,
    error,
    
    login: async (credentials: LoginRequest) => {
      setError(null);
      await loginMutation.mutateAsync(credentials);
    },
    
    register: async (credentials: RegisterRequest) => {
      setError(null);
      await registerMutation.mutateAsync(credentials);
    },
    
    logout: () => {
      logoutMutation.mutate();
    },
    
    refreshToken: async () => {
      // TODO: Implement refresh token logic
      console.log('Refresh token not implemented yet');
    },
    
    clearError: () => {
      setError(null);
    },
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}