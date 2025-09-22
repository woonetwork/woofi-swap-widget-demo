import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  base: '/woofi-swap-widget-demo/',
  plugins: [
    react(),
    nodePolyfills(), // woofi-swap-widget-kit needs Buffer (from node's buffer module)
  ],
})
