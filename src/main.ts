import '#main.css'
import '+base'
import '|state'

import { createApp } from 'vue'
import App from '<App.vue'

const app = createApp(App)
app.config.globalProperties = { state }
app.mount('body')