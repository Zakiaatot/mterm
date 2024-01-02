class MyDialog {
    elem = null
    args = null
    type = null
    clossBtn = null
    DIALOG_TYPE = {
        SET_ALIAS: 0
    }
    openModal(type, args) {
        this.type = type
        this.args = args
        this.elem.showModal()
    }
    closeModal() {
        this.clossBtn.click()
    }
}

const myDialog = new MyDialog()

export { myDialog }