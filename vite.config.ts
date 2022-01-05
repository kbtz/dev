import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	publicDir: 'pub',
	resolve: {
		alias: [
			{ find: /^~(.*)$/, replacement: '/src/comp/$1.vue' },
			{ find: /^-(.*)$/, replacement: '/src/attr/$1.ts' },
			{ find: /^#(.*)$/, replacement: '/src/file/$1' },
			{ find: /^\+(.*)$/, replacement: '/src/util/$1.ts' }
		]
	},
	server: {
		host: 'kdev',
		port: 80,
	}
})
