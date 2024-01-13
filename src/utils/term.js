import { invoke } from "@tauri-apps/api/primitives"

const MAX_STR_LEN = 1024 * 8
let counter = 0

export class Term {
    id = null
    readMsg = ""
    alias = ""
    uuid = counter++

    constructor(isDefault = true) {
        if (isDefault) {
            this.createMtermDefault().then(() => {
                this.setReadNonblockMterm()
            })
        }
        else {
            this.readMsg = 'Welcome to \x1B[1;3;31mMterm\x1B[0m!\n\r' +
                'Powered by @\x1b[1;1;32mZakiaatot\x1b[0m!\n\r' +
                'https://github.com/zakiaatot\n\r' +
                '\u2764\ufe0f  \u2764\ufe0f  \u2764\ufe0f\n\r'
            this.createMterm().then(() => {
                this.setReadNonblockMterm()
            })
        }
    }

    destructor() {
        this.destroyMterm()
    }

    async createMtermDefault() {
        this.id = await invoke('create_mterm_default')
    }

    async createMterm() {
        this.id = await invoke('create_mterm')
    }

    async destroyMterm() {
        return await invoke('destroy_mterm', { id: this.id })
    }

    async writeMterm(data) {
        return await invoke('write_mterm', { id: this.id, data })
    }

    async readMterm() {
        const res = await invoke('read_mterm', { id: this.id })
        this.readMsg += res
        if (this.readMsg.length > MAX_STR_LEN)
            this.readMsg = this.readMsg.slice(this.readMsg.length - MAX_STR_LEN)
        return res
    }

    async setWindowSizeMterm(rows, cols) {
        await invoke('set_window_size_mterm', { id: this.id, rows, cols })
    }

    async setReadNonblockMterm() {
        await invoke('set_read_nonblock_mterm', { id: this.id })
    }

    async checkRunningMterm() {
        return await invoke('check_running_mterm', { id: this.id })
    }
}