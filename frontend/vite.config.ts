import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    outDir:"../backend/dist/public/dist"
  },
  server:{
    proxy:{
      '/api/v1':"http://localhost:3000"
    }
  },
  resolve:{
    alias:{
      '@':path.resolve(__direname,'src')
    }
  }
})
