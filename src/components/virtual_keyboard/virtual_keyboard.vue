<template>
    <div class=" virtual-keyboard w-full h-16 absolute">
        <div class="grid grid-cols-7 gap-0 w-full h-full">
            <div class="flex justify-center items-center font-black text-sm" v-for="i in 14">
                ESC
            </div>
        </div>
    </div>
</template>

<script>
import { watch } from 'vue'
import { keyboardHeight } from '../term_view/keyboard.js'
import { toast } from '../toast/toast.js'
export default {
    props: {
        termViewRef: {}
    },
    methods: {
        initWatchKeyboard() {
            watch(keyboardHeight, (newValue) => {
                const totalHeight = document.documentElement.clientHeight
                if (newValue + 48 + 64 > totalHeight) {
                    toast.error("Client heigth is too small!")
                    this.termViewRef.mterm.viewInstance.blur()
                }
            })
        },
    },
    mounted() {
        this.initWatchKeyboard()
    }
}
</script>

<style scoped>
.virtual-keyboard {
    bottom: var(--keyboard-padding-bottom);
    transition: bottom 0.3s ease-in-out;
}
</style>