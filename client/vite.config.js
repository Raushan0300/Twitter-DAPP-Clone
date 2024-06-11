import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    host:true
  },
  preview:{
    port: process.env.PORT || 3000
  },
  plugins: [react()]
})
