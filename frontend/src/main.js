import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router' // Importa o router
import './style.css'

const app = createApp(App)

app.use(createPinia()) // Usa Pinia
app.use(router)        // Usa Router
app.mount('#app')