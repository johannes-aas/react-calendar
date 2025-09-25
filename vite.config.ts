import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, // makes Vite listen on 0.0.0.0
    allowedHosts: [
      'eb82ffb88c59.ngrok-free.app' // <— your ngrok hostname
    ]
  }
});
