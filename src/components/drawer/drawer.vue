<template>
    <div class="drawer">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
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
                     shadow-sm">
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
                <div class="drawer-body absolute w-full overflow-y-auto -z-10">
                    <drawer_item v-for="i in 1" :key="i" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import drawer_item from './drawer-item.vue'

export default {
    components: {
        drawer_item
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
    bottom: 0;
}
</style>