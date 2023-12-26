<template>
    <div ref="termRootElem" class="w-full h-full">
    </div>
</template>

<script>
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { WebglAddon } from 'xterm-addon-webgl'
import { getTheme } from "../../utils/theme.js"
import { keyboardHeight } from "../../utils/keyboard.js"
import { watch } from 'vue'
import "xterm/css/xterm.css"
export default {
    props: {
        term: {
            required: true,
            default: null
        }
    },
    data() {
        return {
            mterm: {
                viewInstance: null,
                fit: null,

            },
            themeObserver: null,
            keyboardObserver: null
        }
    },
    methods: {
        // theme 
        beginObserverTheme() {
            this.closeObserverTheme()
            const element = document.getElementById('mterm')
            const observer = new MutationObserver((mutationsList) => {
                for (let mutation of mutationsList) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                        const newThemeValue = element.getAttribute('data-theme')
                        this.setThemeOption(newThemeValue)
                        console.log('New theme:', newThemeValue)
                    }
                }
            })
            // 配置 MutationObserver 监听属性变化
            observer.observe(element, { attributes: true })
            this.themeObserver = observer
        },
        closeObserverTheme() {
            if (this.themeObserver)
                this.themeObserver.disconnect()
        },
        setThemeOption(theme) {
            if (this.mterm.viewInstance === null)
                return
            let res = {}
            if (theme === 'light') {
                res = {
                    foreground: "black",
                    background: "white",
                    cursor: "black",
                    selectionBackground: "#1D232A70",
                    // selectionInactiveBackground: "white"
                }
            } else if (theme === 'dark') {
                res = {
                    foreground: "white",
                    background: "#1D232A",
                    cursor: "white",
                    // selectionBackground: "white",
                    // selectionInactiveBackground: "white"
                }
            }
            this.mterm.viewInstance.options.theme = res
        },
        // term
        initTerm() {
            this.mterm.viewInstance = new Terminal({
                cursorBlink: true,
                cursorStyle: 'underline',
                fontWeight: 700,
                fontSize: 16,
                scrollOnUserInput: true
            })
            this.mterm.fit = new FitAddon()
            this.mterm.viewInstance.loadAddon(this.mterm.fit)
            this.setThemeOption(getTheme())
            this.mterm.viewInstance.open(this.$refs.termRootElem)
            this.mterm.viewInstance.loadAddon(new WebglAddon())
            this.mterm.fit.fit()
            this.mterm.viewInstance.onData(async (data) => { console.log(await this.term.writeMterm(data)) })
        },
        closeTerm() {
            this.mterm.viewInstance.dispose()
        },
        resizeTerm() {
            this.mterm.fit.fit()
            const rows = this.mterm.viewInstance.rows
            const cols = this.mterm.viewInstance.cols
            this.term.setWindowSizeMterm(rows, cols)
        }
    },
    mounted() {
        this.initTerm()
        this.beginObserverTheme()
        window.addEventListener('resize', this.resizeTerm)
        watch(keyboardHeight, (newValue) => {
            console.log('External Ref Value changed:', newValue)
            this.resizeTerm()
        })
        setInterval(async () => {
            this.mterm.viewInstance.write(await this.term.readMterm())
        }, 100)
    },
    beforeUnmount() {
        this.closeTerm()
        this.closeObserverTheme()
        window.removeEventListener('resize', this.resizeTerm)
    }
}
</script>