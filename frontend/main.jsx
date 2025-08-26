import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import useAuthStore from './store/authStore';

// Initialize auth store from localStorage
useAuthStore.getState().initialize();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
