// config.js or constants.js
export const API_BASE_URL = process.env.REACT_APP_API_URL;
// export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-app-name.railway.app';
export const MODEL_NAME = sessionStorage.getItem('selectedModel')
export const API_KEY = sessionStorage.getItem('ApiKey')
