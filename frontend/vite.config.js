import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api":  {// whenever we write "/api" it will be prefixed with the 'target' value
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
