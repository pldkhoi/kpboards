/// <reference types="vitest" />

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ReactCompilerConfig = {
  target: '19',
};

export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      },
    }),
    tsconfigPaths(),
    // Type-check in separate process; disable during build for faster CI (run `yarn type-check` separately)
    checker({
      typescript: true,
      overlay: { initialIsOpen: false },
    }),
    // Run with `bun run build:analyze` to generate dist/stats.html
    process.env.ANALYZE === 'true' &&
      visualizer({ filename: 'dist/stats.html', open: false, gzipSize: true }),
  ].filter(Boolean),

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },

  optimizeDeps: {
    // Pre-bundle heavy deps for faster dev cold start
    include: [
      'react',
      'react-dom',
      'react-router',
      '@tanstack/react-query',
      'recharts',
      'framer-motion',
    ],
  },

  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1100,
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        // Heavy libs split for parallel loading; pages use React.lazy for route-level code-split
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return;
          if (id.includes('react-router')) return 'vendor-router';
          if (id.includes('@tanstack/react-query')) return 'vendor-query';
          if (id.includes('framer-motion')) return 'vendor-motion';
          if (id.includes('recharts')) return 'vendor-recharts';
          if (id.includes('@tanstack/react-table')) return 'vendor-table';
          return 'vendor';
        },
      },
    },
  },

  server: {
    port: 3000,
    host: true,
    open: true,
  },

  preview: {
    port: 8080,
    open: true,
  },

  css: {
    devSourcemap: command === 'serve',
  },

  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', 'e2e/**', '**/*.e2e.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 75,
        branches: 65,
      },
    },
    globals: true,
  },
}));
