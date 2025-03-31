
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'  // Change this line
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8080
  }
});
