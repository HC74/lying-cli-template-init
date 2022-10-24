import {defineConfig} from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

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
    server: {
        port: 4500, // 设置服务启动端口号
        // open: true, // 设置服务启动时是否自动打开浏览器
        cors: true, // 允许跨域
        proxy: {
            '/apiDev': {
                target: 'https://api.uomg.com/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/apiDev/, 'api/')
            }
        }
    }

})


