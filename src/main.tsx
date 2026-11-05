
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './features/auth/AuthProvider.tsx';

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    const hadController = Boolean(
      navigator.serviceWorker.controller
    );

    let refreshing = false;

    navigator.serviceWorker.addEventListener(
      'controllerchange',
      () => {
        if (!hadController || refreshing) return;

        refreshing = true;
        window.location.reload();
      }
    );

    try {
      const registration =
        await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none',
        });

      await registration.update();

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          registration.update().catch((error) => {
            console.error('SW update check failed:', error);
          });
        }
      });

      window.setInterval(() => {
        if (document.visibilityState === 'visible') {
          registration.update().catch((error) => {
            console.error('SW update check failed:', error);
          });
        }
      }, 60 * 60 * 1000);

    } catch (error) {
      console.error(
        'Service worker registration failed:',
        error
      );
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
