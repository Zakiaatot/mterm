<template>
    <div class="w-full h-full">
        <div class="w-full h-full">
            <term_view ref="initTerm" :termViewConfig="termViewConfig.config" :term="term"></term_view>
        </div>
        <div ref="initSplash" class="fixed top-0 bottom-0 left-0 right-0 z-[999] backdrop-blur-sm bg-opacity-70 
            flex justify-center items-center flex-col">
            <span class="loading loading-spinner loading-lg">
            </span>
            <p class="text-center text-xl font-extrabold py-2">Loading...</p>
        </div>
    </div>
</template>

<script>
import term_view from '../components/term_view/term_view.vue'
import { termViewConfig } from '../components/term_view/term_view_config.js'
import { Term } from '../utils/term.js'

export default {
    components: { term_view },
    data() {
        return {
            termViewConfig,
            term: new Term()
        }
    }
}
</script>

<style scoped></style>