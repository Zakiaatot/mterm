<template>
    <div class="px-2 w-full h-full overflow-y-scroll select-none relative z-10">
        <div class="w-full py-2 max-w-sm mx-auto">
            <div class=" text-lg font-semibold py-2 flex justify-center"># Preview</div>
            <div class="mockup-window border bg-base-300">
                <div class="h-28 w-full bg-base-100">
                    <term_view ref="term_view_demo" :term="term" :termViewConfig="termViewConfig.config" />
                </div>
            </div>
        </div>
        <div class="w-full py-2 max-w-sm mx-auto">
            <div class=" text-lg font-semibold py-2 flex justify-center"># Font Size</div>
            <input v-model="config.fontSize" type="range" min="10" max="30" value="16" class="range range-sm" step="2" />
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
        <div class="w-full py-2 max-w-sm mx-auto">
            <div class=" text-lg font-semibold py-2 flex justify-center"># Font Weight</div>
            <input v-model="config.fontWeight" type="range" min="100" max="700" value="700" class="range range-sm"
                step="600" />
            <div class="w-full flex justify-between text-xs px-2">
                <span>thin</span>
                <span>bold</span>
            </div>
        </div>
        <div class="w-full py-2 max-w-sm mx-auto">
            <div class=" text-lg font-semibold py-2 flex justify-center"># Cursor Style</div>
            <div class="flex w-full justify-center items-center">
                <div role="tablist" class="tabs tabs-boxed">
                    <a role="tab" :class="{ 'tab-item-active': config.cursorStyle === 'block' }" class="tab"
                        @click="changeCursorStyle('block')">block</a>
                    <a role="tab" :class="{ 'tab-item-active': config.cursorStyle === 'underline' }" class="tab"
                        @click="changeCursorStyle('underline')">underline</a>
                    <a role="tab" :class="{ 'tab-item-active': config.cursorStyle === 'bar' }" class="tab"
                        @click="changeCursorStyle('bar')">bar</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import term_view from '../components/term_view/term_view.vue'
import { Term } from '../utils/term.js'
import { termViewConfig } from '../components/term_view/term_view_config.js'
export default {
    components: { term_view },
    data() {
        return {
            term: new Term(),
            termViewConfig,
            config: termViewConfig.config
        }
    },
    watch: {
        'config.fontSize'(val) {
            termViewConfig.setItem('fontSize', Number(val))
        },
        'config.fontWeight'(val) {
            termViewConfig.setItem('fontWeight', Number(val))
        }
    },
    methods: {
        changeCursorStyle(style) {
            this.config.cursorStyle = style
            termViewConfig.setItem('cursorStyle', style)
            console.log(style)
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
.tab-item-active {
    --tw-bg-opacity: 1;
    background-color: hsl(var(--n) / var(--tw-bg-opacity));
    --tw-text-opacity: 1;
    color: hsl(var(--nc) / var(--tw-text-opacity));
}
</style>