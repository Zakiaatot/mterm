<template>
    <div ref="vkb" class=" virtual-keyboard w-full h-16 absolute">
        <div class="grid grid-cols-7 gap-0 w-full h-full select-none">
            <div class="key flex justify-center items-center font-black text-sm"
                @touchstart="handleKeyTouchStart($event, 'ESC')" @touchcancel="handleKeyTouchEnd($event)"
                @touchmove="handleKeyTouchEnd($event)" @touchend="handleKeyTouchEnd($event)">
                ESC
            </div>
            <div class="key flex justify-center items-center font-black text-sm"
                @touchstart="handleKeyTouchStart($event, 'DIR')" @touchcancel="handleKeyTouchEnd($event)"
                @touchmove="handleKeyTouchEnd($event)" @touchend="handleKeyTouchEnd($event)">
                /
            </div>
            <div class="key flex justify-center items-center font-black text-sm"
                @touchstart="handleKeyTouchStart($event, 'ARG')" @touchcancel="handleKeyTouchEnd($event)"
                @touchmove="handleKeyTouchEnd($event)" @touchend="handleKeyTouchEnd($event)">
                -
            </div>
            <div class="key flex justify-center items-center font-black text-sm"
                @touchstart="handleKeyTouchStart($event, 'HOME')" @touchcancel="handleKeyTouchEnd($event)"
                @touchmove="handleKeyTouchEnd($event)" @touchend="handleKeyTouchEnd($event)">
                HOME
            </div>
            <div class="key flex justify-center items-center font-black text-sm"
                @touchstart="handleKeyTouchStart($event, 'UP')" @touchcancel="handleKeyTouchEnd($event)"
                @touchmove="handleKeyTouchEnd($event)" @touchend="handleKeyTouchEnd($event)">
                &#8593;
            </div>
            <div class="key flex justify-center items-center font-black text-sm"
                @touchstart="handleKeyTouchStart($event, 'END')" @touchcancel="handleKeyTouchEnd($event)"
                @touchmove="handleKeyTouchEnd($event)" @touchend="handleKeyTouchEnd($event)">
                END
            </div>
            <div class="key flex justify-center items-center font-black text-sm"
                @touchstart="handleKeyTouchStart($event, 'PGUP')" @touchcancel="handleKeyTouchEnd($event)"
                @touchmove="handleKeyTouchEnd($event)" @touchend="handleKeyTouchEnd($event)">
                PGUP
            </div>
            <div class="key flex justify-center items-center font-black text-sm"
                @touchstart="handleKeyTouchStart($event, 'TAB')" @touchcancel="handleKeyTouchEnd($event)"
                @touchmove="handleKeyTouchEnd($event)" @touchend="handleKeyTouchEnd($event)">
                TAB
            </div>
            <div ref="ctrl" :class="{ 'key-active': ctrlActive }"
                class="key flex justify-center items-center font-black text-sm" @touchstart="ctrlClick">
                CTRL
            </div>
            <div ref="alt" :class="{ 'key-active': altActive }"
                class="key flex justify-center items-center font-black text-sm" @touchstart="altClick">
                ALT
            </div>
            <div class="key flex justify-center items-center font-black text-sm"
                @touchstart="handleKeyTouchStart($event, 'LEFT')" @touchcancel="handleKeyTouchEnd($event)"
                @touchmove="handleKeyTouchEnd($event)" @touchend="handleKeyTouchEnd($event)">
                &#x2190;
            </div>
            <div class="key flex justify-center items-center font-black text-sm"
                @touchstart="handleKeyTouchStart($event, 'DOWN')" @touchcancel="handleKeyTouchEnd($event)"
                @touchmove="handleKeyTouchEnd($event)" @touchend="handleKeyTouchEnd($event)">
                &#x2193;
            </div>
            <div class="key flex justify-center items-center font-black text-sm"
                @touchstart="handleKeyTouchStart($event, 'RIGHT')" @touchcancel="handleKeyTouchEnd($event)"
                @touchmove="handleKeyTouchEnd($event)" @touchend="handleKeyTouchEnd($event)">
                &#x2192;
            </div>
            <div class="key flex justify-center items-center font-black text-sm"
                @touchstart="handleKeyTouchStart($event, 'PGDN')" @touchcancel="handleKeyTouchEnd($event)"
                @touchmove="handleKeyTouchEnd($event)" @touchend="handleKeyTouchEnd($event)">
                PGDN
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
    data() {
        return {
            ctrlKey: false,
            altKey: false
        }
    },
    computed: {
        ctrlActive() {
            return this.termViewRef && this.termViewRef.mterm.keyFlag.ctrlKey
        },
        altActive() {
            return this.termViewRef && this.termViewRef.mterm.keyFlag.altKey
        }
    },
    methods: {
        initWatchKeyboard() {
            watch(keyboardHeight, (newValue) => {
                const totalHeight = document.documentElement.clientHeight
                if (newValue + 48 + 100 > totalHeight) {
                    toast.error("Client heigth is too small!")
                    this.termViewRef.mterm.viewInstance.blur()
                }
            })
        },
        vibrateShort() {
            AndroidApi.vibrate(10)
        },
        //key
        initKey() {
            //preventDefault
            const keyCollection = this.$refs.vkb.getElementsByClassName('key')
            for (let i = 0; i < keyCollection.length; i++) {
                keyCollection[i].ontouchstart = (event) => {
                    event.preventDefault()
                }
            }
        },
        handleKeyTouchStart(e, type) {
            e.target.classList.add('key-active')
            this.vibrateShort()
            let keyCode
            switch (type) {
                case 'ESC':
                    keyCode = 27
                    break;
                case 'DIR':
                    return this.termViewRef.term.writeMterm('/')
                case 'ARG':
                    return this.termViewRef.term.writeMterm('-')
                case 'HOME':
                    keyCode = 36
                    break;
                case 'UP':
                    keyCode = 38
                    break;
                case 'END':
                    keyCode = 35
                    break;
                case 'PGUP':
                    keyCode = 33
                    break;
                case 'TAB':
                    keyCode = 9
                    break;
                case 'LEFT':
                    keyCode = 37
                    break;
                case 'DOWN':
                    keyCode = 40
                    break;
                case 'RIGHT':
                    keyCode = 39
                    break;
                case 'PGDN':
                    keyCode = 34
                    break;
                default:
                    break;
            }
            this.termViewRef.mterm.viewInstance.textarea.dispatchEvent(
                new KeyboardEvent('keydown', {
                    keyCode
                })
            )
        },
        handleKeyTouchEnd(e) {
            setTimeout(() => { e.target.classList.remove('key-active') }, 0)
        },
        // ctrl
        ctrlClick() {
            this.vibrateShort()
            this.termViewRef.mterm.keyFlag.ctrlKey = !this.termViewRef.mterm.keyFlag.ctrlKey
        },
        // alt
        altClick() {
            this.vibrateShort()
            this.termViewRef.mterm.keyFlag.altKey = !this.termViewRef.mterm.keyFlag.altKey
        },
    },
    mounted() {
        this.initWatchKeyboard()
        this.initKey()
    }
}
</script>

<style scoped>
.virtual-keyboard {
    bottom: var(--keyboard-padding-bottom);
    transition: bottom 0.3s ease-in-out;
}

.key-active {
    --tw-bg-opacity: 1;
    background-color: hsl(var(--n) / var(--tw-bg-opacity));
    --tw-text-opacity: 1;
    color: hsl(var(--nc) / var(--tw-text-opacity));
}
</style>