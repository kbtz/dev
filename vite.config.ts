import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: 'kdev',
		port: 80,
	},
	publicDir: 'pub',
	resolve: {
		alias: [
			{ find: /^\|(.*)$/, replacement: '/src/$1.ts' },
			{ find: /^\+(.*)$/, replacement: '/src/util/$1.ts' },
			{ find: /^<(.*)$/, replacement: '/src/comp/$1' },
			{ find: /^-(.*)$/, replacement: '/src/attr/$1.ts' },
			{ find: /^#(.*)$/, replacement: '/src/file/$1' },
		]
	},
	plugins: [
		vue({
			template: {
				compilerOptions: {
					// treat all tags with a dash as custom elements
					isCustomElement: tag => tag.includes('-')
				}
			}
		})
	],
})
