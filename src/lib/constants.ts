// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// App Configuration
export const APP_CONFIG = {
  NAME: 'LinkShort',
  DESCRIPTION: 'Professional URL shortening with advanced analytics',
  URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  VERSION: '1.0.0',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  ANALYTICS: '/analytics',
  SETTINGS: '/settings',
  API_DOCS: '/docs',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  REFRESH: '/api/auth/refresh',
  
  // Links
  LINKS: '/api/links',
  LINK_BY_ID: (id: string) => `/api/links/${id}`,
  BULK_ACTIONS: '/api/links/bulk',
  
  // Analytics
  ANALYTICS_OVERVIEW: (id: string) => `/api/analytics/${id}/overview`,
  ANALYTICS_CLICKS: (id: string) => `/api/analytics/${id}/clicks`,
  ANALYTICS_GEOGRAPHIC: (id: string) => `/api/analytics/${id}/geographic`,
  ANALYTICS_DEVICES: (id: string) => `/api/analytics/${id}/devices`,
  ANALYTICS_REFERRERS: (id: string) => `/api/analytics/${id}/referrers`,
  ANALYTICS_EXPORT: (id: string) => `/api/analytics/${id}/export`,
  
  // Public
  PUBLIC_SHORTEN: '/api/v1/shorten',
  REDIRECT: (code: string) => `/${code}`,
} as const;

// Validation Rules
export const VALIDATION = {
  URL: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 2048,
    REGEX: /^https?:\/\/.+/,
  },
  SHORT_CODE: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
    REGEX: /^[a-zA-Z0-9\-_]+$/,
  },
  EMAIL: {
    REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
  },
} as const;

// UI Constants
export const UI = {
  DEBOUNCE_DELAY: 300,
  ANIMATION_DURATION: 200,
  TOAST_DURATION: 4000,
  SIDEBAR_WIDTH: 256,
  HEADER_HEIGHT: 64,
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1,
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
  RECENT_LINKS: 'recent_links',
} as const;

// Feature Flags
export const FEATURES = {
  QR_CODES: process.env.NEXT_PUBLIC_ENABLE_QR_CODES === 'true',
  CUSTOM_DOMAINS: process.env.NEXT_PUBLIC_ENABLE_CUSTOM_DOMAINS === 'true',
  ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== 'false',
  DARK_MODE: true,
  BULK_OPERATIONS: true,
  EXPORT: true,
} as const;

// Time Ranges for Analytics
export const TIME_RANGES = [
  { value: '24h', label: 'Last 24 Hours' },
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: 'all', label: 'All Time' },
] as const;

// Chart Colors
export const CHART_COLORS = {
  PRIMARY: 'hsl(var(--primary))',
  SECONDARY: 'hsl(var(--secondary))',
  ACCENT: 'hsl(var(--accent))',
  MUTED: 'hsl(var(--muted))',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#3b82f6',
} as const;

// Device Types
export const DEVICE_TYPES = {
  DESKTOP: 'desktop',
  MOBILE: 'mobile',
  TABLET: 'tablet',
} as const;

// Subscription Tiers
export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  PREMIUM: 'premium',
  ENTERPRISE: 'enterprise',
} as const;

// Limits by Subscription
export const SUBSCRIPTION_LIMITS = {
  [SUBSCRIPTION_TIERS.FREE]: {
    LINKS_PER_MONTH: 100,
    CUSTOM_CODES: false,
    ANALYTICS_RETENTION_DAYS: 30,
    API_CALLS_PER_DAY: 1000,
  },
  [SUBSCRIPTION_TIERS.PREMIUM]: {
    LINKS_PER_MONTH: 10000,
    CUSTOM_CODES: true,
    ANALYTICS_RETENTION_DAYS: 365,
    API_CALLS_PER_DAY: 50000,
  },
  [SUBSCRIPTION_TIERS.ENTERPRISE]: {
    LINKS_PER_MONTH: -1, // Unlimited
    CUSTOM_CODES: true,
    ANALYTICS_RETENTION_DAYS: -1, // Unlimited
    API_CALLS_PER_DAY: -1, // Unlimited
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_URL: 'Please enter a valid URL.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION.PASSWORD.MIN_LENGTH} characters.`,
  CUSTOM_CODE_TAKEN: 'This custom code is already taken.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  RATE_LIMITED: 'Too many requests. Please try again later.',
  SERVER_ERROR: 'Server error. Please try again later.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LINK_CREATED: 'Link created successfully!',
  LINK_UPDATED: 'Link updated successfully!',
  LINK_DELETED: 'Link deleted successfully!',
  COPIED_TO_CLIPBOARD: 'Copied to clipboard!',
  LOGIN_SUCCESS: 'Welcome back!',
  REGISTER_SUCCESS: 'Account created successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
} as const;