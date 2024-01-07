<template>
    <div class="w-full h-full relative">
        <div class="term-view-wrap w-full absolute top-0">
            <term_view ref="termView" :term="termManager.termNow" :termViewConfig="termViewConfig.config" />
        </div>
        <virtual_keyboard :termViewRef="termViewRef" />
    </div>
</template>
  
<script>
import term_view from '../components/term_view/term_view.vue'
import virtual_keyboard from '../components/virtual_keyboard/virtual_keyboard.vue'
import { termManager } from '../utils/term_manager.js'
import { termViewConfig } from '../utils/term_view_config.js'
export default {
    components: {
        term_view,
        virtual_keyboard
    },
    data() {
        return {
            termManager,
            termViewRef: null,
            termViewConfig
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