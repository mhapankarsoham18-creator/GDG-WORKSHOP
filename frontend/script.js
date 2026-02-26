// Custom frontend script
console.log('Frontend script loaded');

// PASTE YOUR RENDER URL HERE for API_URL if not using .env
// If using Vite, it picks up VITE_API_URL from .env automatically
const API_URL = import.meta.env.VITE_API_URL || 'https://your-backend-on-render.com';

console.log('API URL:', API_URL);

// Add your frontend logic here
