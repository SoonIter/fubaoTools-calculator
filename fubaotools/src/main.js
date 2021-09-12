import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/* ---------------Vue---------------- */

/* -------------公共样式引入 ---------------- */
import '@/assets/scss/common.scss' //公共样式  
import '@/assets/scss/window.scss' //electron特殊样式
import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(store).use(router)

    .mount('#app')