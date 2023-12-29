import { ref } from 'vue'
const keyboardHeight = ref(0)
function notifyKeyboardHeight(h) {
    document.documentElement.style.setProperty('--keyboard-padding-bottom', h + 'px')
    keyboardHeight.value = h
}

export { notifyKeyboardHeight, keyboardHeight }