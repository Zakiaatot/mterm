<template>
    <div class="px-2 w-full">
        <div class="w-full">
            <div class=" text-xl font-semibold py-2 flex justify-center">预览</div>
            <div class="mockup-window border bg-base-300">
                <div class="h-28 w-full px-1">
                    <term_view ref="term_view_demo" class="term_view_demo" :term="term" :font-size="16" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import term_view from '../components/term_view/term_view.vue'
import { Term } from '../utils/term.js'
export default {
    components: { term_view },
    data() {
        return {
            term: new Term()
        }
    },
    mounted() {
        setTimeout(() => {
            this.term.writeMterm('date\n')
        }, 100)
    },
    beforeUnmount() {
        this.term.destructor()
    }
}
</script>
<style scoped>
.term_view_demo>>>.xterm {
    border-radius: 4px;
    overflow: hidden;
}
</style>