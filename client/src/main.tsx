import { createRoot } from 'react-dom/client';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';

const CLIENT_ID = "96789859859-758dvali3lse4jvg4q8ovou488c6i4vj.apps.googleusercontent.com";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </BrowserRouter>
);