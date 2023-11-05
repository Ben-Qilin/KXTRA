import dotenv from 'dotenv';
dotenv.config();
import ReactDom from 'react-dom/client';
import App from './components/App/App';
import { StrictMode } from 'react';

const root = ReactDom.createRoot(document.getElementById('app'));
root.render(<StrictMode><App /></StrictMode>);