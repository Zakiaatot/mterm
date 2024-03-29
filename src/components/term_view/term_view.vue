<template>
    <div ref="termRootElem" class="term-wrapper w-full h-full">
    </div>
</template>

<script>
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { WebglAddon } from 'xterm-addon-webgl'
import { getTheme } from "../../utils/theme.js"
import { keyboardHeight } from "./keyboard.js"
import { watch } from 'vue'
import "xterm/css/xterm.css"
export default {
    props: {
        term: {
            tyep: Object,
            required: true,
            default: null
        },
        termViewConfig: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            mterm: {
                viewInstance: null,
                fit: null,
                reader: null,
                lock: true,
                keyFlag: {
                    ctrlKey: false,
                    altKey: false
                }
            },
            themeObserver: null,
            keyboardObserver: null,
            currentTermId: null
        }
    },
    watch: {
        term: {
            deep: true,
            handler(newVal) {
                if (newVal.id && newVal.id != this.currentTermId) {
                    console.log("Change to new term: ", newVal)
                    if (this.currentTermId != null)
                        this.changeTerm()
                    this.currentTermId = newVal.id
                }
            }
        },
        termViewConfig: {
            deep: true,
            handler(newVal) {
                for (let key in newVal) {
                    this.mterm.viewInstance.options[key] = newVal[key]
                }
                this.mterm.fit.fit()
            }
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
                }
            } else if (theme === 'dark') {
                res = {
                    foreground: "white",
                    background: "#1D232A",
                    cursor: "white",
                }
            }
            this.mterm.viewInstance.options.theme = res
        },
        // reader
        beginReader() {
            this.mterm.reader = setInterval(async () => {
                if (this.term.id !== null)
                    this.mterm.viewInstance.write(await this.term.readMterm())
            }, 5)
        },
        closeReader() {
            if (this.mterm.reader)
                clearInterval(this.mterm.reader)
        },
        // writer
        beginWriter() {
            this.mterm.viewInstance.onData(async (data) => {
                if (this.mterm.keyFlag.altKey || this.mterm.keyFlag.ctrlKey) {
                    console.log(this.mterm.keyFlag)
                    const altKey = this.mterm.keyFlag.altKey
                    const ctrlKey = this.mterm.keyFlag.ctrlKey
                    this.mterm.keyFlag.altKey = false
                    this.mterm.keyFlag.ctrlKey = false
                    let keyCode = data[0].charCodeAt(0)
                    if (keyCode >= 97 && keyCode <= 122) keyCode = keyCode - 32

                    return this.mterm.viewInstance.textarea.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            keyCode,
                            ctrlKey,
                            altKey
                        })
                    )
                }
                await this.term.writeMterm(data)
            })
        },
        // term
        initTerm() {
            this.mterm.viewInstance = new Terminal(this.termViewConfig)
            this.mterm.fit = new FitAddon()
            this.mterm.viewInstance.loadAddon(this.mterm.fit)
            this.setThemeOption(getTheme())
            this.mterm.viewInstance.open(this.$refs.termRootElem)
            this.mterm.viewInstance.loadAddon(new WebglAddon())
            setTimeout(() => {
                this.mterm.fit.fit()
            }, 0)
            this.mterm.viewInstance.onBell(() => {
                if (!this.mterm.lock)
                    AndroidApi.vibrate(100)
            })
        },
        closeTerm() {
            // this.mterm.viewInstance.dispose()
        },
        resizeTerm() {
            this.mterm.fit.fit()
            const rows = this.mterm.viewInstance.rows
            const cols = this.mterm.viewInstance.cols
            this.term.setWindowSizeMterm(rows, cols)
        },
        reInitTerm() {
            if (this.term.id !== null && this.term.readMsg !== "") {
                this.mterm.viewInstance.write(this.term.readMsg)
            }
            setTimeout(() => { this.mterm.lock = false, 0 })
        },
        //keyboard
        initWatchKeyboard() {
            watch(keyboardHeight, (newValue) => {
                console.log('Keyboard height:', newValue)
                this.resizeTerm()
            })
        },
        //change term
        changeTerm() {
            this.closeReader()
            this.mterm.lock = true
            setTimeout(() => {
                this.mterm.viewInstance.write('\x1b[?25h') // 使光标显现
                this.mterm.viewInstance.reset()
                this.mterm.viewInstance.write(this.term.readMsg)
                this.beginReader()
                setTimeout(() => { this.mterm.lock = false }, 0)
            }, 1)
        }
    },
    mounted() {
        this.initTerm()
        this.beginObserverTheme()
        this.initWatchKeyboard()
        window.addEventListener('resize', this.resizeTerm)
        this.beginWriter()
        this.beginReader()
        this.reInitTerm()
    },
    beforeUnmount() {
        this.closeTerm()
        this.closeObserverTheme()
        window.removeEventListener('resize', this.resizeTerm)
        this.closeReader()
    }
}
</script>