import { createApp } from "vue"
import router from './router'
import App from "./App.vue"
import { toast } from './components/toast/toast.js'
import "./main.css"


const app = createApp(App)
app.use(router)
app.config.globalProperties.$toast = toast
app.mount("#app")
