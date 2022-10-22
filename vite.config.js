import {defineConfig} from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        uni(),
    ],
    build: {
        rollupOptions: {
            output: {
                chunkFileNames: `static/js/[name]-[hash]-${Date.now()}.js`,
                entryFileNames: `static/js/[name]-[hash]-${Date.now()}.js`,
                assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})


