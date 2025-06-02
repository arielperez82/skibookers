export interface HTTPRequest {
  params?: Record<string, string>;
  query?: Record<string, string>;
  body?: unknown;
  headers?: Record<string, string>;
}

export interface HTTPResponse {
  status: number;
  body?: unknown;
  headers?: Record<string, string>;
}
