// API Configuration with fallback
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

// Helper function to build API URLs
export const buildApiUrl = (endpoint) => {
    return `${API_BASE_URL}${endpoint}`;
}; 