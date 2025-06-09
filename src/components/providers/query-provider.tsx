'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface QueryProviderProps {
  children: React.ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Time until data is considered stale
            staleTime: 5 * 60 * 1000, // 5 minutes
            // Time until inactive queries are garbage collected
            gcTime: 10 * 60 * 1000, // 10 minutes
            // Retry failed requests
            retry: (failureCount, error: any) => {
              // Don't retry on 4xx errors except 401 (handled by interceptor)
              if (error?.status >= 400 && error?.status < 500 && error?.status !== 401) {
                return false;
              }
              // Retry up to 3 times for other errors
              return failureCount < 3;
            },
            // Retry delay with exponential backoff
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            // Refetch on window focus in production
            refetchOnWindowFocus: process.env.NODE_ENV === 'production',
            // Don't refetch on reconnect for better UX
            refetchOnReconnect: false,
          },
          mutations: {
            // Retry mutations once on network errors
            retry: (failureCount, error: any) => {
              if (error?.status === 0) {
                return failureCount < 1;
              }
              return false;
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Show React Query DevTools in development */}
      {process.env.NODE_ENV === 'development' && 
       process.env.NEXT_PUBLIC_ENABLE_QUERY_DEVTOOLS === 'true' && (
        <ReactQueryDevtools 
          initialIsOpen={false}
          position="bottom-right"
        />
      )}
    </QueryClientProvider>
  );
}