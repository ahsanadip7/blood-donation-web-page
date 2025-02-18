import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './Router/router';
import AuthProvider from './AuthProvider/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DarkModeProvider } from './AuthProvider/DarkModeContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <DarkModeProvider> {/* Wrap the whole app */}
        <RouterProvider router={router} />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </DarkModeProvider>
    </AuthProvider>
  </StrictMode>
);

