import { createRouter, createWebHashHistory } from 'vue-router'
import termPage from '../pages/termPage.vue'

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
            component: termPage,
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../pages/aboutPage.vue')
        },
        {
            path: '/setting',
            name: 'setting',
            component: () => import('../pages/settingPage.vue')
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