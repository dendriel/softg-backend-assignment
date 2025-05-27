import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const env = {};

console.log('Injected environment:', env);

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
  },
  plugins: [react()],
  define: {
    __APP_ENV__: JSON.stringify(env),
  },
  // Forward requests to the Firebase Functions API. In production we should have a proxy with this kind of rules.
  // Allows to execute in stand-alone mode (without firebase-emulator)
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:5004/demo-project/europe-west3/',
  //       changeOrigin: true,
  //     },
  //   },
  // },
});
