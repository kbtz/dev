import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	publicDir: 'pub',
	resolve: {
		alias: [
			{ find: /^~(.*)$/, replacement: '/src/components/$1.vue' },
			{ find: /^-(.*)$/, replacement: '/src/directives/$1.ts' },
			{ find: /^#(.*)$/, replacement: '/src/assets/$1' },
			{ find: /^\+(.*)$/, replacement: '/src/helpers/$1.ts' }
		]
	},
	server: {
		host: 'kdev',
		port: 80,
	}
})
