import { createApp } from "vue"
import App from "./App.vue"
import "./main.css"
import { toast } from './components/toast/toast.js'

const app = createApp(App)
app.config.globalProperties.$toast = toast
app.mount("#app")
