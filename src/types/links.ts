export interface Link {
  id: string;
  user_id?: string;
  original_url: string;
  short_code: string;
  custom_domain?: string;
  title?: string;
  description?: string;
  is_active: boolean;
  expires_at?: string;
  created_at: string;
  updated_at: string;
  total_clicks?: number;
  unique_clicks?: number;
}

export interface CreateLinkRequest {
  original_url: string;
  custom_code?: string;
  title?: string;
  description?: string;
  expires_at?: string;
}

export interface UpdateLinkRequest {
  original_url?: string;
  title?: string;
  description?: string;
  is_active?: boolean;
}

export interface BulkActionRequest {
  action: 'delete' | 'activate' | 'deactivate';
  link_ids: string[];
}

export interface LinksResponse {
  links: Link[];
  total: number;
  page: number;
  limit: number;
}

export interface LinkStats {
  total_links: number;
  active_links: number;
  total_clicks: number;
  unique_clicks: number;
  click_rate: number;
}

export interface PublicShortenResponse {
  short_url: string;
  short_code: string;
  original_url: string;
}