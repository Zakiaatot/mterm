import { createRouter, createWebHashHistory } from 'vue-router'
import term_page from '../pages/term_page.vue'
import about_page from '../pages/about_page.vue'
import setting_page from '../pages/setting_page.vue'
import init_page from '../pages/init_page.vue'

const router = createRouter({
    history: createWebHashHistory(),  // hash 模式
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: '/init'
        },
        {
            path: '/init',
            name: 'init',
            component: init_page
        },
        {
            path: '/term',
            name: 'term',
            component: term_page
        },
        {
            path: '/about',
            name: 'about',
            component: about_page
        },
        {
            path: '/setting',
            name: 'setting',
            component: setting_page
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