import { buildApiUrl } from './config';

// Helper for GET requests
export async function apiGet(endpoint, token) {
  const res = await fetch(buildApiUrl(endpoint), {
    headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    credentials: 'include',
  });
  return res.json();
}

// Helper for POST requests
export async function apiPost(endpoint, data, token) {
  const res = await fetch(buildApiUrl(endpoint), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  return res.json();
}

// Helper for PUT requests
export async function apiPut(endpoint, data, token) {
  const res = await fetch(buildApiUrl(endpoint), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  return res.json();
}

// Helper for DELETE requests
export async function apiDelete(endpoint, token) {
  const res = await fetch(buildApiUrl(endpoint), {
    method: 'DELETE',
    headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    credentials: 'include',
  });
  return res.json();
}

// Auth helpers
export async function login(email, password) {
  return apiPost('/api/login', { email, password });
}

export async function register(userData) {
  return apiPost('/api/register', userData);
}

export async function logout() {
  return apiPost('/api/logout', {});
}