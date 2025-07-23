import axios from 'axios';

// Create an Axios instance with a base URL from environment or default
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8443',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authentication
export const login = (email, password) => {
  return api.post('/login', { email, password });
};

export const logout = () => {
  return api.post('/auth/logout');
};

// Income Predictions
export const getIncomePrediction = () => {
  return api.get('/income/prediction');
};

// Jar Data
export const getJarAllocations = () => {
  return api.get('/jars');
};

// Proactive Alerts
export const getAlerts = () => {
  return api.get('/alerts');
};

// Tax Report
export const getTaxReport = () => {
  return api.get('/tax/report');
};

// Financial Advice
export const getFinancialAdvice = () => {
  return api.get('/advice');
};

// Voice Message to AI Assistant
export const sendVoiceMessage = (audioBlob) => {
  const formData = new FormData();
  formData.append('voice', audioBlob, 'message.webm');
  return api.post('/voice/message', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default api;
