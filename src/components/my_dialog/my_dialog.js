class MyDialog {
    elem = null
    args = null
    type = null
    DIALOG_TYPE = {
        SET_ALIAS: 0
    }
    openModal(type, args) {
        this.type = type
        this.args = args
        this.elem.showModal()
    }
}

const myDialog = new MyDialog()

export { myDialog }