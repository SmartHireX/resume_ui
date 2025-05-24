// utils/apiClient.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '', // optional: set a common base URL if needed
  withCredentials: true, // send cookies (if needed)
  headers: {
    'Content-Type': 'application/json'
  }
});

// Optional: Add interceptors for auth, logging, error handling, etc.
apiClient.interceptors.request.use(config => {
  // Modify config (e.g. add auth token)
  return config;
});

apiClient.interceptors.response.use(
  response => response.data,
  error => {
    const errorMessage =
      error.response?.data?.message || error.message || 'Unknown error';
    return Promise.reject(new Error(errorMessage));
  }
);