import { apiRequest } from './apiClient';

export function loginRequest({ identifier, password }) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: { identifier, password },
    skipUnauthorizedHandler: true,
  });
}

export function registerRequest({ name, username, email, password }) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: { name, username, email, password },
    skipUnauthorizedHandler: true,
  });
}

export function getMeRequest() {
  return apiRequest('/auth/me');
}

export function logoutRequest() {
  return apiRequest('/auth/logout', {
    method: 'POST',
    skipUnauthorizedHandler: true,
  });
}
