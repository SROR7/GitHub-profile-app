import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      'k8s-gitdevap-githubpr-3695d52823-543529870.eu-north-1.elb.amazonaws.com'
    ],
  },
})