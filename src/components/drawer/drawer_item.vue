<template>
    <li class="w-full">
        <a class="w-full" :class="active ? 'active' : ''" @click="switchTerm" @touchstart="this.startTouch"
            @touchmove="this.cancelTouch" @touchend="this.cancelTouch" @touchcancel="this.cancelTouch">
            <div class=" text-lg font-semibold w-36 whitespace-nowrap overflow-hidden text-ellipsis">
                {{ this.term.alias === "" ? index : this.term.alias }}
            </div>
            <div class="operator flex justify-evenly w-12">
                <button class="btn btn-error btn-sm btn-square" @click.stop="closeTerm">
                    <svg t=" 1704002804153" class="icon h-5 w-5" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2111" width="200" height="200">
                        <path
                            d="M768 384c-19.2 0-32 12.8-32 32l0 377.6c0 25.6-19.2 38.4-38.4 38.4L326.4 832c-25.6 0-38.4-19.2-38.4-38.4L288 416C288 396.8 275.2 384 256 384S224 396.8 224 416l0 377.6c0 57.6 44.8 102.4 102.4 102.4l364.8 0c57.6 0 102.4-44.8 102.4-102.4L793.6 416C800 396.8 787.2 384 768 384z"
                            fill="#272636" p-id="2112"></path>
                        <path
                            d="M460.8 736l0-320C460.8 396.8 448 384 435.2 384S396.8 396.8 396.8 416l0 320c0 19.2 12.8 32 32 32S460.8 755.2 460.8 736z"
                            fill="#272636" p-id="2113"></path>
                        <path
                            d="M627.2 736l0-320C627.2 396.8 608 384 588.8 384S563.2 396.8 563.2 416l0 320C563.2 755.2 576 768 588.8 768S627.2 755.2 627.2 736z"
                            fill="#272636" p-id="2114"></path>
                        <path
                            d="M832 256l-160 0L672 211.2C672 166.4 633.6 128 588.8 128L435.2 128C390.4 128 352 166.4 352 211.2L352 256 192 256C172.8 256 160 268.8 160 288S172.8 320 192 320l640 0c19.2 0 32-12.8 32-32S851.2 256 832 256zM416 211.2C416 198.4 422.4 192 435.2 192l153.6 0c12.8 0 19.2 6.4 19.2 19.2L608 256l-192 0L416 211.2z"
                            fill="#272636" p-id="2115"></path>
                    </svg>
                </button>
            </div>
        </a>
    </li>
</template>

<script>
import { myDialog } from '../my_dialog/my_dialog.js'
export default {
    props: {
        index: {
            type: Number,
            required: true
        },
        term: {
            type: Object,
            required: true
        },
        active: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            termManager: this.$parent.$parent.termManager,
            longPressTimer: null,
            myDialog
        }
    },
    methods: {
        closeTerm() {
            this.termManager.closeTerm(this.index)
        },
        startTouch() {
            this.longPressTimer = setTimeout(() => {
                this.myDialog.openModal(this.myDialog.DIALOG_TYPE.SET_ALIAS, { index: this.index, elem: this })
            }, 500)
        },
        cancelTouch() {
            clearTimeout(this.longPressTimer)
        },
        switchTerm() {
            this.termManager.switchTerm(this.index)
            if (this.$route.path !== '/term')
                this.$router.replace('/term')
            this.$parent.$parent.closeDrawer()
        }
    }
}
</script>

<style scoped>
.operator button:active {
    animation: scale-ani ease-in-out .2s;
}

@keyframes scale-ani {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(0.6);
    }

    100% {
        transform: scale(1);
    }
}
</style>

