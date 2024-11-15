import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import LogRocket from 'logrocket';
import {BrowserRouter as Router} from 'react-router-dom'

LogRocket.init('siq3a6/cubebuster');
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
        <App />
    </Router>
  
  </StrictMode>,
)
