import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    base: './',
    root: '.',
    build: {
        outDir: 'dist',
        target: "es2020"
    },
    plugins: [
        handlebars()
    ],
    server: {
        port: 3000,
    },
    cacheDir: 'node_modules/.vite'
})
