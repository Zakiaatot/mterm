<template>
    <view class="wrap fall-down">
        <view :class="{ 'shadow-md': this.navbarBorder }"
            class="navbar status-bar-blank w-full min-h-0 h-[48px] py-[4px] px-0 text-base-content">
            <view class="navbar-start h-full ml-[18px]">
                <view class="h-full inline-flex items-center">
                    <img class="drawer-btn h-[28px] w-[28px] rounded-full min-h-0 min-w-0 p-0 hover:shadow-sm"
                        src="data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M170.667 469.333h682.666a42.667 42.667 0 0 1 0 85.334H170.667a42.667 42.667 0 0 1 0-85.334zm0-298.666H768A42.667 42.667 0 0 1 768 256H170.667a42.667 42.667 0 1 1 0-85.333zm0 597.333h512a42.667 42.667 0 0 1 0 85.333h-512a42.667 42.667 0 0 1 0-85.333z' fill='%23000'/%3E%3C/svg%3E"
                        alt="more" @click="showDrawer()" />
                </view>
            </view>
            <view class="navbar-center h-full flex justify-center items-center">
                <image class="rotate w-[28px] h-[28px] rounded-full mx-[4px] shadow-md" src="../../static/logo.png"
                    alt="logo">
                </image>
                <view class="font-black text-[20px] pr-[4px]">Mterm</view>
            </view>
            <view class="navbar-end h-full mr-[18px] flex">

            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            navbarBorder: false
        }
    },
    methods: {
        changeNavbarBorder(open) {
            if (open === null)
                this.navbarBorder = !this.navbarBorder
            else
                this.navbarBorder = open
        },
        // 打开窗口
        showDrawer() {
            // uni.vibrateShort()
            // uni.$emit("changeDrawer", true)
        },
    },
    mounted() {
        // uni.$on("changeNavbarBorder", this.changeNavbarBorder)
    },
    beforeDestroy() {
        // uni.$on("changeNavbarBorder", this.changeNavbarBorder)
    }
}
</script>

<style scoped>
.wrap {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 999;
    backdrop-filter: blur(.2rem);
}

.status-bar-blank {
    padding-top: var(--status-bar-height);
    background: rgba(255, 255, 255, 0.7);
    box-sizing: content-box;
}


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

@keyframes fall-down-ani {
    from {
        transform: translateY(-50%);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.fall-down {
    animation: fall-down-ani 1s ease;
}

@keyframes scaleIcon-ani {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(0.5);
    }

    100% {
        transform: scale(1);
    }
}

.drawer-btn:hover {
    animation: scaleIcon-ani .5s ease;
}
</style>