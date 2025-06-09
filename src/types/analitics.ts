export interface Click {
  id: string;
  link_id: string;
  ip_address: string;
  user_agent: string;
  referer: string;
  country: string;
  city: string;
  device_type: string;
  browser: string;
  os: string;
  clicked_at: string;
}

export interface ClickStats {
  total_clicks: number;
  unique_clicks: number;
  click_rate: number;
}

export interface GeographicStats {
  country: string;
  city: string;
  count: number;
}

export interface DeviceStats {
  device_type: string;
  browser: string;
  os: string;
  count: number;
}

export interface ReferrerStats {
  referer: string;
  count: number;
}

export interface TimeSeriesStats {
  date: string;
  count: number;
}

export interface AnalyticsOverview {
  total_clicks: number;
  unique_clicks: number;
  click_rate: number;
  clicks_today: number;
  clicks_this_week: number;
  clicks_this_month: number;
}

export interface AnalyticsExportData {
  overview: ClickStats;
  clicks: Click[];
  geographic: GeographicStats[];
  devices: DeviceStats[];
  referrers: ReferrerStats[];
  time_series: TimeSeriesStats[];
}

export type TimeRange = '24h' | '7d' | '30d' | '90d' | 'all';
export type ChartType = 'line' | 'bar' | 'area';
export type ExportFormat = 'json' | 'csv';