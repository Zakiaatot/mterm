<template>
    <div ref="termRootElem" class="w-full h-full">
    </div>
</template>

<script>
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { WebglAddon } from 'xterm-addon-webgl'
import "xterm/css/xterm.css"
export default {
    data() {
        return {
            mterm: {
                viewInstance: null,
                fit: null,

            }
        }
    },
    methods: {

    },
    mounted() {
        this.mterm.viewInstance = new Terminal({
            cursorBlink: true,
            cursorStyle: 'underline',
            fontWeight: 700,
            fontSize: 16,
            // theme: {
            //     foreground: "black",
            //     // background: "#323232",
            //     background: "white",
            //     cursor: "black",
            //     // selectionBackground: "white",
            //     // selectionInactiveBackground: "white"
            // }
        })
        this.mterm.fit = new FitAddon()
        this.mterm.viewInstance.loadAddon(this.mterm.fit)
        this.mterm.viewInstance.open(this.$refs.termRootElem)
        this.mterm.viewInstance.loadAddon(new WebglAddon())
        this.mterm.fit.fit()

        this.mterm.viewInstance.onData((data) => { this.mterm.viewInstance.write(data) })
    },
}
</script>

<style scoped></style>