<template>
    <div class="px-2 w-full h-full overflow-y-scroll select-none">
        <div class="w-full">
            <div class=" text-xl font-semibold py-2 flex justify-center">Preview</div>
            <div class="mockup-window border bg-base-300">
                <div class="h-28 w-full bg-base-100">
                    <term_view ref="term_view_demo" :term="term" :font-size="Number(fontSize)" />
                </div>
            </div>
        </div>
        <div class="w-full">
            <div class=" text-xl font-semibold py-2 flex justify-center">Font size</div>
            <input v-model="fontSize" type="range" min="10" max="30" value="16" class="range" step="2" />
            <div class="w-full flex justify-between text-xs px-2">
                <span>10</span>
                <span>12</span>
                <span>14</span>
                <span>16</span>
                <span>18</span>
                <span>20</span>
                <span>22</span>
                <span>24</span>
                <span>26</span>
                <span>28</span>
                <span>30</span>
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
            term: new Term(),
            fontSize: "16"
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