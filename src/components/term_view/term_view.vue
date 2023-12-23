<template>
    <div ref="termRootElem" class="w-full h-full">
    </div>
</template>

<script>
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { WebglAddon } from 'xterm-addon-webgl'
import { getTheme } from "../../utils/theme.js"
import "xterm/css/xterm.css"
export default {
    data() {
        return {
            mterm: {
                viewInstance: null,
                fit: null,

            },
            themeObserver: null
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
                    // background: "#323232",
                    background: "white",
                    cursor: "black",
                    // selectionBackground: "white",
                    // selectionInactiveBackground: "white"
                }
            } else if (theme === 'dark') {
                res = {
                    foreground: "white",
                    // background: "#323232",
                    background: "#1D232A",
                    cursor: "white",
                    // selectionBackground: "white",
                    // selectionInactiveBackground: "white"
                }
            }
            console.log(res)
            this.mterm.viewInstance.options.theme = res
        },
        // term
        initTerm() {
            this.mterm.viewInstance = new Terminal({
                cursorBlink: true,
                cursorStyle: 'underline',
                fontWeight: 700,
                fontSize: 16,
            })
            this.mterm.fit = new FitAddon()
            this.mterm.viewInstance.loadAddon(this.mterm.fit)
            this.setThemeOption(getTheme())
            this.mterm.viewInstance.open(this.$refs.termRootElem)
            this.mterm.viewInstance.loadAddon(new WebglAddon())
            this.mterm.fit.fit()
            this.mterm.viewInstance.onData((data) => { this.mterm.viewInstance.write(data) })
            for (let i = 0; i < 100; i++) {
                this.mterm.viewInstance.write(i + "\r\n")
            }
        },
        closeTerm() {
            this.mterm.viewInstance.dispose()
        }
    },
    mounted() {
        this.initTerm()
        this.beginObserverTheme()
    },
    beforeUnmount() {
        this.closeTerm()
        this.closeObserverTheme()
    }
}
</script>

<style scoped></style>