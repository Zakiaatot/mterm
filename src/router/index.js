import { createRouter, createWebHashHistory } from 'vue-router'
import termPage from '../pages/termPage.vue'
import aboutPage from '../pages/aboutPage.vue'
import settingPage from '../pages/settingPage.vue'

const router = createRouter({
    history: createWebHashHistory(),  // hash 模式
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: '/term'
        },
        {
            path: '/term',
            name: 'term',
            component: termPage
        },
        {
            path: '/about',
            name: 'about',
            component: aboutPage
        },
        {
            path: '/setting',
            name: 'setting',
            component: settingPage
        }
    ]
})

// 全局路由守卫
// router.beforeEach((to, from, next) => {
//     // console.log(to, from)
//     if (to.meta.title) {
//         document.title = `${to.meta.title}`;
//     }
//     next()
// })

// router.afterEach((to, from) => {
//     // console.log(to, from)
//     console.log('afterEach')
// })

export default router