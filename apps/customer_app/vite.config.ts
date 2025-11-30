import CoreAlias from '@core/alias';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, PluginOption } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), visualizer({}) as PluginOption],
    server: {
      port: 3000,
    },
    preview: {
      port: 4000,
    },
    resolve: {
      alias: [
        ...CoreAlias,
        {
          find: '@router',
          replacement: path.join(__dirname, './src/router'),
        },
        {
          find: '@pages',
          replacement: path.join(__dirname, './src/pages'),
        },
        {
          find: '@styles',
          replacement: path.join(__dirname, './src/styles'),
        },
        {
          find: '@requests',
          replacement: path.join(__dirname, './src/requests'),
        },
      ],
    },
    build: {
      manifest: true,
      outDir: 'dist',
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          // Improve caching with content-based hashing
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: (assetInfo: { name?: string }) => {
            // Separate CSS files for code splitting
            if (assetInfo.name?.endsWith('.css')) {
              return 'assets/css/[name].[hash][extname]';
            }
            return 'assets/[name].[hash][extname]';
          },
          manualChunks: {
            // Vendor chunks for better caching
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'mui-core': ['@mui/material', '@mui/system'],
            'mui-icons': ['@mui/icons-material'],
            'supabase': ['@supabase/supabase-js'],
          },
        },
      },
      // Enable CSS code splitting
      cssCodeSplit: true,
    },
  };
});
