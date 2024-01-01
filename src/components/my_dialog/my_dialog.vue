<template>
    <div class="absolute top-0 bottom-0 left-0 right-0">
        <dialog id="my_dialog" class="modal">
            <div v-if="myDialog.type === myDialog.DIALOG_TYPE.SET_ALIAS" class="modal-box">
                <h3 class="font-bold text-lg">Set Session Alias</h3>
                <input type="text" placeholder="Type here" class="input input-bordered w-full my-2" />
                <button class="btn w-full">OK</button>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    </div>
</template>

<script>
import { myDialog } from './my_dialog.js'
export default {
    data() {
        return { myDialog }
    },
    methods: {

    },
    mounted() {
        this.myDialog.elem = document.getElementById('my_dialog')
    }
}
</script>
