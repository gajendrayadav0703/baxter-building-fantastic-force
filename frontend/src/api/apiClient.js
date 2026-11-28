const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

export const TOKEN_STORAGE_KEY = 'nexus_auth_token';

let unauthorizedHandler = null;

export function setUnauthorizedHandler(handler) {
  unauthorizedHandler = handler;
}

export class ApiError extends Error {
  constructor(message, status, errors = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

/**
 * Shared fetch wrapper configured with VITE_API_URL, JSON headers,
 * Bearer JWT injection, and 401 session-expiry handling.
 */
export async function apiRequest(path, options = {}) {
  const { method = 'GET', body, headers = {}, skipUnauthorizedHandler = false } = options;
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  const requestHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: requestHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(
      'Unable to reach the Nexus API server. Please ensure the backend is running.',
      0
    );
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    if (response.status === 401 && !skipUnauthorizedHandler && unauthorizedHandler) {
      unauthorizedHandler(data?.message);
    }

    throw new ApiError(
      data?.message || `Request failed with status ${response.status}`,
      response.status,
      data?.errors || null
    );
  }

  return data;
}
