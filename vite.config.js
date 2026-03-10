import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,  // Измените на 5174 — теперь npm run dev запустится на нём
    host: true,  // Слушать все хосты (как --host)
    hmr: {
      protocol: 'ws',  // Фикс для Upgrade
      host: 'localhost',
      port: 5174
    },
    cors: { origin: '*' }  // На всякий случай
  },
  optimizeDeps: {
    force: true  // Как --force
  }
});