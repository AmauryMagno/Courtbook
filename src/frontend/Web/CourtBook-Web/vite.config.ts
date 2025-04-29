import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/authenticate' : 'http://localhost:3005',
      '/users' : 'http://localhost:3005',
      '/courts' : 'http://localhost:3005',
      '/reservations' : 'http://localhost:3005',
    }
  }
})
