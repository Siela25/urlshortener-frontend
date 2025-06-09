import { z } from 'zod';
import { VALIDATION } from './constants';

// URL validation helper
const urlSchema = z
  .string()
  .min(VALIDATION.URL.MIN_LENGTH, 'URL is too short')
  .max(VALIDATION.URL.MAX_LENGTH, 'URL is too long')
  .refine(
    (url) => {
      try {
        new URL(url.startsWith('http') ? url : `https://${url}`);
        return true;
      } catch {
        return false;
      }
    },
    { message: 'Please enter a valid URL' }
  );

// Custom code validation
const customCodeSchema = z
  .string()
  .min(VALIDATION.SHORT_CODE.MIN_LENGTH, `Custom code must be at least ${VALIDATION.SHORT_CODE.MIN_LENGTH} characters`)
  .max(VALIDATION.SHORT_CODE.MAX_LENGTH, `Custom code must be no more than ${VALIDATION.SHORT_CODE.MAX_LENGTH} characters`)
  .regex(VALIDATION.SHORT_CODE.REGEX, 'Custom code can only contain letters, numbers, hyphens, and underscores')
  .refine(
    (code) => !['api', 'www', 'admin', 'dashboard', 'analytics', 'auth', 'login', 'register'].includes(code.toLowerCase()),
    { message: 'This custom code is reserved' }
  );

// Auth Schemas
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(VALIDATION.PASSWORD.MIN_LENGTH, `Password must be at least ${VALIDATION.PASSWORD.MIN_LENGTH} characters`),
});

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(VALIDATION.PASSWORD.MIN_LENGTH, `Password must be at least ${VALIDATION.PASSWORD.MIN_LENGTH} characters`)
    .max(VALIDATION.PASSWORD.MAX_LENGTH, `Password must be no more than ${VALIDATION.PASSWORD.MAX_LENGTH} characters`)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Link Schemas
export const createLinkSchema = z.object({
  original_url: urlSchema,
  custom_code: z
    .string()
    .optional()
    .refine((code) => !code || customCodeSchema.safeParse(code).success, {
      message: 'Invalid custom code format',
    }),
  title: z
    .string()
    .max(255, 'Title must be no more than 255 characters')
    .optional(),
  description: z
    .string()
    .max(1000, 'Description must be no more than 1000 characters')
    .optional(),
  expires_at: z
    .string()
    .datetime()
    .optional()
    .refine((date) => !date || new Date(date) > new Date(), {
      message: 'Expiration date must be in the future',
    }),
});

export const updateLinkSchema = z.object({
  original_url: urlSchema.optional(),
  title: z
    .string()
    .max(255, 'Title must be no more than 255 characters')
    .optional(),
  description: z
    .string()
    .max(1000, 'Description must be no more than 1000 characters')
    .optional(),
  is_active: z.boolean().optional(),
});

export const bulkActionSchema = z.object({
  action: z.enum(['delete', 'activate', 'deactivate']),
  link_ids: z
    .array(z.string().uuid('Invalid link ID'))
    .min(1, 'Please select at least one link')
    .max(100, 'Cannot perform bulk action on more than 100 links at once'),
});

// Public API Schema
export const publicShortenSchema = z.object({
  original_url: urlSchema,
  custom_code: z
    .string()
    .optional()
    .refine((code) => !code || customCodeSchema.safeParse(code).success, {
      message: 'Invalid custom code format',
    }),
  title: z
    .string()
    .max(255, 'Title must be no more than 255 characters')
    .optional(),
  description: z
    .string()
    .max(500, 'Description must be no more than 500 characters')
    .optional(),
});

// Analytics Schemas
export const analyticsParamsSchema = z.object({
  time_range: z.enum(['24h', '7d', '30d', '90d', 'all']).default('7d'),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(50),
});

export const exportDataSchema = z.object({
  format: z.enum(['json', 'csv']).default('json'),
  time_range: z.enum(['24h', '7d', '30d', '90d', 'all']).default('all'),
});

// Search and Filter Schemas
export const linkSearchSchema = z.object({
  query: z.string().optional(),
  is_active: z.boolean().optional(),
  sort_by: z.enum(['created_at', 'updated_at', 'total_clicks', 'title']).default('created_at'),
  sort_order: z.enum(['asc', 'desc']).default('desc'),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});

// Settings Schemas
export const userPreferencesSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).default('system'),
  timezone: z.string().default('UTC'),
  email_notifications: z.boolean().default(true),
  analytics_retention: z.number().min(30).max(365).default(90),
  default_link_privacy: z.enum(['public', 'private']).default('public'),
});

// QR Code Schema
export const qrCodeSchema = z.object({
  size: z.number().min(64).max(1024).default(256),
  format: z.enum(['png', 'svg']).default('png'),
  foreground_color: z.string().regex(/^#[0-9A-F]{6}$/i).default('#000000'),
  background_color: z.string().regex(/^#[0-9A-F]{6}$/i).default('#FFFFFF'),
  margin: z.number().min(0).max(10).default(4),
});

// Contact/Support Schema
export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject is too long'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long'),
});

// Type exports for TypeScript
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type CreateLinkFormData = z.infer<typeof createLinkSchema>;
export type UpdateLinkFormData = z.infer<typeof updateLinkSchema>;
export type BulkActionFormData = z.infer<typeof bulkActionSchema>;
export type PublicShortenFormData = z.infer<typeof publicShortenSchema>;
export type AnalyticsParams = z.infer<typeof analyticsParamsSchema>;
export type ExportDataParams = z.infer<typeof exportDataSchema>;
export type LinkSearchParams = z.infer<typeof linkSearchSchema>;
export type UserPreferences = z.infer<typeof userPreferencesSchema>;
export type QRCodeOptions = z.infer<typeof qrCodeSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;