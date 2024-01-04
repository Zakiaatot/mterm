<template>
    <div class="w-full h-full relative">
        <div class="term-view-wrap w-full absolute top-0">
            <term_view ref="termView" :term="termManager.termNow" :font-size="16" />
        </div>
        <virtual_keyboard :termViewRef="termViewRef" />
    </div>
</template>
  
<script>
import term_view from '../components/term_view/term_view.vue'
import virtual_keyboard from '../components/virtual_keyboard/virtual_keyboard.vue'
import { termManager } from '../utils/term_manager.js'
export default {
    components: {
        term_view,
        virtual_keyboard
    },
    data() {
        return {
            termManager,
            termViewRef: null
        }
    },
    mounted() {
        this.termViewRef = this.$refs.termView
    }
}
</script>
<style scoped>
.term-view-wrap {
    bottom: calc(var(--keyboard-padding-bottom) + 4rem);
}
</style>