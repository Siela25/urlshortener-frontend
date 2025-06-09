import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from './constants';

// UI Store (removed auth store to avoid conflicts with AuthProvider)
interface UIState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark' | 'system';
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    duration?: number;
  }>;
}

interface UIActions {
  setSidebarOpen: (open: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  toggleSidebarCollapsed: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  addNotification: (notification: Omit<UIState['notifications'][0], 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIState & UIActions>()(
  persist(
    (set, get) => ({
      // State
      sidebarOpen: false,
      sidebarCollapsed: false,
      theme: 'system',
      notifications: [],

      // Actions
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),

      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      toggleSidebarCollapsed: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      setTheme: (theme) => set({ theme }),

      addNotification: (notification) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newNotification = { ...notification, id };
        
        set((state) => ({
          notifications: [...state.notifications, newNotification],
        }));

        // Auto-remove notification after duration
        if (notification.duration !== 0) {
          setTimeout(() => {
            get().removeNotification(id);
          }, notification.duration || 4000);
        }
      },

      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: STORAGE_KEYS.USER_PREFERENCES,
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        theme: state.theme,
      }),
    }
  )
);

// Links Store (for caching and quick access)
interface LinkCache {
  [key: string]: any; // Store frequently accessed links
}

interface LinksState {
  recentLinks: string[]; // Array of link IDs
  linkCache: LinkCache;
  selectedLinks: string[]; // For bulk operations
  searchQuery: string;
  filters: {
    isActive?: boolean;
    sortBy: 'created_at' | 'updated_at' | 'total_clicks' | 'title';
    sortOrder: 'asc' | 'desc';
  };
}

interface LinksActions {
  addRecentLink: (linkId: string) => void;
  removeRecentLink: (linkId: string) => void;
  clearRecentLinks: () => void;
  setCachedLink: (linkId: string, link: any) => void;
  removeCachedLink: (linkId: string) => void;
  clearLinkCache: () => void;
  setSelectedLinks: (linkIds: string[]) => void;
  toggleSelectedLink: (linkId: string) => void;
  clearSelectedLinks: () => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<LinksState['filters']>) => void;
  resetFilters: () => void;
}

export const useLinksStore = create<LinksState & LinksActions>()(
  persist(
    (set, get) => ({
      // State
      recentLinks: [],
      linkCache: {},
      selectedLinks: [],
      searchQuery: '',
      filters: {
        sortBy: 'created_at',
        sortOrder: 'desc',
      },

      // Actions
      addRecentLink: (linkId) => {
        const { recentLinks } = get();
        const filtered = recentLinks.filter((id) => id !== linkId);
        set({
          recentLinks: [linkId, ...filtered].slice(0, 10), // Keep last 10
        });
      },

      removeRecentLink: (linkId) =>
        set((state) => ({
          recentLinks: state.recentLinks.filter((id) => id !== linkId),
        })),

      clearRecentLinks: () => set({ recentLinks: [] }),

      setCachedLink: (linkId, link) =>
        set((state) => ({
          linkCache: { ...state.linkCache, [linkId]: link },
        })),

      removeCachedLink: (linkId) => {
        const { linkCache } = get();
        const { [linkId]: removed, ...rest } = linkCache;
        set({ linkCache: rest });
      },

      clearLinkCache: () => set({ linkCache: {} }),

      setSelectedLinks: (selectedLinks) => set({ selectedLinks }),

      toggleSelectedLink: (linkId) => {
        const { selectedLinks } = get();
        const isSelected = selectedLinks.includes(linkId);
        set({
          selectedLinks: isSelected
            ? selectedLinks.filter((id) => id !== linkId)
            : [...selectedLinks, linkId],
        });
      },

      clearSelectedLinks: () => set({ selectedLinks: [] }),

      setSearchQuery: (searchQuery) => set({ searchQuery }),

      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),

      resetFilters: () =>
        set({
          searchQuery: '',
          filters: {
            sortBy: 'created_at',
            sortOrder: 'desc',
          },
        }),
    }),
    {
      name: STORAGE_KEYS.RECENT_LINKS,
      partialize: (state) => ({
        recentLinks: state.recentLinks,
        filters: state.filters,
      }),
    }
  )
);

// Analytics Store (for caching analytics data)
interface AnalyticsState {
  timeRange: '24h' | '7d' | '30d' | '90d' | 'all';
  chartType: 'line' | 'bar' | 'area';
  analyticsCache: {
    [key: string]: {
      data: any;
      timestamp: number;
      ttl: number;
    };
  };
}

interface AnalyticsActions {
  setTimeRange: (range: AnalyticsState['timeRange']) => void;
  setChartType: (type: AnalyticsState['chartType']) => void;
  setCachedAnalytics: (key: string, data: any, ttl?: number) => void;
  getCachedAnalytics: (key: string) => any | null;
  clearAnalyticsCache: () => void;
}

export const useAnalyticsStore = create<AnalyticsState & AnalyticsActions>((set, get) => ({
  // State
  timeRange: '7d',
  chartType: 'line',
  analyticsCache: {},

  // Actions
  setTimeRange: (timeRange) => set({ timeRange }),

  setChartType: (chartType) => set({ chartType }),

  setCachedAnalytics: (key, data, ttl = 5 * 60 * 1000) => {
    const timestamp = Date.now();
    set((state) => ({
      analyticsCache: {
        ...state.analyticsCache,
        [key]: { data, timestamp, ttl },
      },
    }));
  },

  getCachedAnalytics: (key) => {
    const { analyticsCache } = get();
    const cached = analyticsCache[key];
    
    if (!cached) return null;
    
    const now = Date.now();
    if (now - cached.timestamp > cached.ttl) {
      // Cache expired, remove it
      const { [key]: removed, ...rest } = analyticsCache;
      set({ analyticsCache: rest });
      return null;
    }
    
    return cached.data;
  },

  clearAnalyticsCache: () => set({ analyticsCache: {} }),
}));