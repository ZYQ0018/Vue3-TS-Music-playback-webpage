import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import './components/msg/msg.scss'
import { createPinia } from 'pinia'
import router from './router/index.ts'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(pinia)
app.mount('#app')

