<template>
    <div class="drawer">
        <input ref="drawer_toggle" id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
            <!-- Page content here -->
            <label for="my-drawer" class="btn btn-ghost btn-circle drawer-button">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
            </label>
        </div>
        <div class="drawer-side">
            <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <div class="w-60 min-h-full bg-base-200 text-base-content">
                <div class="drawer-head status-bar navbar-center w-full flex justify-center items-center 
                  " :class="{ 'shadow': scrolled }">
                    <button class="rotate btn btn-ghost btn-circle">
                        <svg t="1703166925072" class="w-6 h-6 fill-black dark:fill-white" viewBox="0 0 1024 1024"
                            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2311" width="200" height="200">
                            <path
                                d="M480 512v-0.112-0.112a47.84 47.84 0 0 0-14.688-34.544l0.016-0.016-288-288-0.128 0.128a48 48 0 1 0-64.464 71.056l251.488 251.488L109.44 766.672l0.016 0.016a48 48 0 0 0 67.856 67.856l0.016 0.016 288-288-0.016-0.016A47.84 47.84 0 0 0 480 512z m408 240h-368a40 40 0 0 0-40 40v16a40 40 0 0 0 40 40h368a40 40 0 0 0 40-40v-16a40 40 0 0 0-40-40z"
                                p-id="2312"></path>
                        </svg>
                    </button>
                    <a class=" select-none text-xl font-extrabold">Mterm</a>
                </div>
                <div ref="drawer_body" class="drawer-body absolute w-full overflow-y-auto overflow-x-hidden -z-10">
                    <ul class="menu menu-md w-full rounded-box">
                        <TransitionGroup name="fade">
                            <drawer_item v-for="(i, index) in termManager.termArray" :key="i.uuid" :term="i" :index="index"
                                :active="routePath === '/term' && termManager.termNow.id === i.id" />
                            <button key="999" class="mt-6 btn btn-neutral text-3xl" @click="newTerm">+</button>
                        </TransitionGroup>
                    </ul>
                </div>
                <div class="fixed bottom-4 w-full h-16 flex justify-evenly items-center">
                    <button class="btn btn-circle btn-ghost" @click="openPage('about')">
                        <svg t="1704249259510" class="icon w-7 h-7" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="3103" width="200" height="200">
                            <path
                                d="M512 97.52381c228.912762 0 414.47619 185.563429 414.47619 414.47619s-185.563429 414.47619-414.47619 414.47619S97.52381 740.912762 97.52381 512 283.087238 97.52381 512 97.52381z m0 73.142857C323.486476 170.666667 170.666667 323.486476 170.666667 512s152.81981 341.333333 341.333333 341.333333 341.333333-152.81981 341.333333-341.333333S700.513524 170.666667 512 170.666667z m36.571429 268.190476v292.571428h-73.142858V438.857143h73.142858z m0-121.904762v73.142857h-73.142858v-73.142857h73.142858z"
                                p-id="3104"></path>
                        </svg>
                    </button>
                    <button class="btn btn-circle btn-ghost" @click="openPage('setting')">
                        <svg t="1704249107529" class="icon w-7 h-7" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2117" width="200" height="200">
                            <path
                                d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56c10.1-8.6 13.8-22.6 9.3-35.2l-0.9-2.6c-18.1-50.5-44.9-96.9-79.7-137.9l-1.8-2.1c-8.6-10.1-22.5-13.9-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85c-2.4-13.1-12.7-23.3-25.8-25.7l-2.7-0.5c-52.1-9.4-106.9-9.4-159 0l-2.7 0.5c-13.1 2.4-23.4 12.6-25.8 25.7l-15.8 85.4c-35.9 13.6-69.2 32.9-99 57.4l-81.9-29.1c-12.5-4.4-26.5-0.7-35.1 9.5l-1.8 2.1c-34.8 41.1-61.6 87.5-79.7 137.9l-0.9 2.6c-4.5 12.5-0.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5c-10.1 8.6-13.8 22.6-9.3 35.2l0.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1c8.6 10.1 22.5 13.9 35.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4c2.4 13.1 12.7 23.3 25.8 25.7l2.7 0.5c26.1 4.7 52.8 7.1 79.5 7.1 26.7 0 53.5-2.4 79.5-7.1l2.7-0.5c13.1-2.4 23.4-12.6 25.8-25.7l15.7-85c36.2-13.6 69.7-32.9 99.7-57.6l81.3 28.9c12.5 4.4 26.5 0.7 35.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l0.9-2.6c4.5-12.3 0.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9c-11.3 26.1-25.6 50.7-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97c-28.1 3.2-56.8 3.2-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9z"
                                p-id="2118"></path>
                            <path
                                d="M512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176z m79.2 255.2C570 602.3 541.9 614 512 614c-29.9 0-58-11.7-79.2-32.8C411.7 560 400 531.9 400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8C612.3 444 624 472.1 624 502c0 29.9-11.7 58-32.8 79.2z"
                                p-id="2119"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import drawer_item from './drawer_item.vue'
import { termManager } from '../../utils/term_manager'
import { toast } from '../toast/toast'
export default {
    components: {
        drawer_item
    },
    data() {
        return {
            termManager,
            scrolled: false,
            routePath: null
        }
    },
    watch: {
        '$route.path': {
            deep: true,
            handler(val) {
                this.routePath = val
            }
        }
    },
    methods: {
        scrollHandler() {
            if (this.$refs.drawer_body.scrollTop > 0)
                this.scrolled = true
            else
                this.scrolled = false
        },
        closeDrawer() {
            this.$refs.drawer_toggle.checked = false
        },
        openPage(page, closeDrawer = true) {
            this.$router.replace(page)
            toast.success('Page: ' + this.$route.name)
            if (closeDrawer)
                this.closeDrawer()
        },
        newTerm() {
            this.termManager.createTerm()
            if (this.$route.path !== '/term')
                this.$router.replace('/term')
            // this.closeDrawer()
        }
    },
    mounted() {
        this.routePath = this.$route.path
        this.$refs.drawer_body.addEventListener('scroll', this.scrollHandler)
    },
    beforeUnmount() {
        this.$refs.drawer_body.removeEventListener('scroll', this.scrollHandler)
    }
}
</script>

<style scoped>
@keyframes rotate-ani {
    from {
        transform: rotate(1turn);
    }

    to {
        transform: rotate(0);
    }
}

@keyframes rotate-reverse-ani {
    to {
        transform: rotate(1turn);
    }

    from {
        transform: rotate(0);
    }
}

.rotate {
    animation: rotate-ani 1s ease-in-out;
}

.rotate:hover {
    animation: rotate-reverse-ani 1s ease-in-out,
}

.drawer-body {
    top: calc(var(--status-bar-height)*1px + 3rem);
    bottom: 5rem
}


.container {
    position: relative;
    padding: 0;
}

/* 1. 声明过渡效果 */
.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. 声明进入和离开的状态 */
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scaleY(0.01) translate(30px, 0);
}

/* 3. 确保离开的项目被移除出了布局流
      以便正确地计算移动时的动画效果。 */
.fade-leave-active {
    position: absolute;
}

.icon {
    fill: hsl(var(--bc) / var(--tw-text-opacity, 1));
}
</style>