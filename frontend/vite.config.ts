import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    outDir:"../backend/dist/public/dist"
  },
  server:{
    proxy:{
      '/api':"http://localhost:3000"
    }
  }
})
