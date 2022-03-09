import '+base'
import '|state'
import '|store'
import '|style'

import { createApp } from 'vue'
import App from '<App.vue'

import.meta?.hot?.on(
	'vite:beforeUpdate',
	() => console.clear())

const app = createApp(App)
app.config.globalProperties = { state }
app.mount('body')