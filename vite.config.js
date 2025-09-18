import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/khata-frontend/',  // Set base if serving from subdir
  plugins: [react()],
})
