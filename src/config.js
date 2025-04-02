// Determine API base URL dynamically
export const API_BASE_URL = import.meta.env.PROD
  ? 'https://mern-i8eg.onrender.com/'
  : 'http://localhost:5000';

export const API_ENDPOINTS = {
  MESSAGES: '/api/data'
};