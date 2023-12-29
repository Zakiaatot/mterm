const TOAST_TIME = 2000
class Toast {
    toastQueue = []
    id = 0
    timer = null
    pushAble = true
    destroyed() {
        this.toastQueue = []
        this.rmTimer()
    }
    success(msg) {
        return new Promise((resolve) => {
            let timer = setInterval(() => {
                if (this.pushAble) {
                    this.toastQueue.push({
                        type: 'success',
                        msg,
                        id: this.id++
                    })
                    if (this.timer == null) {
                        this.setTimer()
                    }
                    clearInterval(timer)
                    resolve()
                }
            }, 100)
        })
    }
    error(msg) {
        return new Promise((resolve) => {
            let timer = setInterval(() => {
                if (this.pushAble) {
                    this.toastQueue.push({
                        type: 'error',
                        msg,
                        id: this.id++
                    })
                    if (this.timer == null) {
                        this.setTimer()
                    }
                    clearInterval(timer)
                    resolve()
                }
            }, 100)
        })
    }
    setTimer() {
        this.timer = setInterval(() => {
            if (this.toastQueue.length > 1) {
                this.toastQueue.splice(0, 1)
            } else if (this.toastQueue.length == 1) {
                this.toastQueue.splice(0, 1)
                this.lockPush()
                this.rmTimer()
            } else {
                this.rmTimer()
            }
        }, TOAST_TIME)
    }
    rmTimer() {
        clearInterval(this.timer)
        this.timer = null
    }
    lockPush() {
        this.pushAble = false
        setTimeout(() => { this.pushAble = true }, 500)
    }
}
import { reactive } from "vue"
const toast = reactive(new Toast())
export {
    toast
}