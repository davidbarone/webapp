const config = {
  development: {
    API_URL: 'http://localhost:5017/',
  },
  production: {
    API_URL: 'https://api.example.com/',
  },
};

// Automatically detect the environment
const ENV =
  window.location.hostname === 'localhost' ? 'development' : 'production';

export const API_URL = config[ENV].API_URL;
