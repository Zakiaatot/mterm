<template>
    <term_view :term="termManager.termNow" :font-size="16" />
</template>
  
<script>
import term_view from '../components/term_view/term_view.vue'
import { termManager } from '../utils/term_manager.js'
export default {
    components: {
        term_view,
    },
    data() {
        return {
            termManager
        }
    },
}
</script>
  