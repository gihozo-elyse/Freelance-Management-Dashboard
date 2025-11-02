import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { DashboardProvider } from './context/DashboardContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Router>
      <DashboardProvider>
        <App />
      </DashboardProvider>
    </Router>
  </React.StrictMode>
);