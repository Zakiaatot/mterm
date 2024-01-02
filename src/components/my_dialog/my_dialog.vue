<template>
    <div class="absolute top-0 bottom-0 left-0 right-0">
        <dialog id="my_dialog" class="modal">
            <div v-if="myDialog.type === myDialog.DIALOG_TYPE.SET_ALIAS" class="modal-box">
                <h3 class="font-bold text-lg select-none">Set Session Alias</h3>
                <input id="alias_input" type="text" placeholder="New Alias" class="input input-bordered w-full my-2" />
                <div class="flex justify-center w-full">
                    <button class="btn w-1/3" @click="setAlias">OK</button>
                </div>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button id="my_dialog_close">close</button>
            </form>
        </dialog>
    </div>
</template>

<script>
import { myDialog } from './my_dialog.js'
import { termManager } from '../../utils/term_manager.js'
export default {
    data() {
        return {
            myDialog
        }
    },
    methods: {
        setAlias() {
            const elem = document.getElementById('alias_input')
            const index = this.myDialog.args.index
            if (elem.value !== "")
                termManager.termArray[index].alias = elem.value
            this.myDialog.closeModal()
            elem.value = ""
            this.myDialog.args.elem.$forceUpdate()
        }
    },
    mounted() {
        this.myDialog.elem = document.getElementById('my_dialog')
        this.myDialog.clossBtn = document.getElementById('my_dialog_close')
    }
}
</script>
