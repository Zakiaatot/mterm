import { invoke } from "@tauri-apps/api/primitives"
export class Term {
    id = null
    readMsg = ""
    alias = ""

    constructor(cmd, cwd, argv, envp) {
        if (cmd === undefined || cmd === null) {
            this.createMtermDefault().then(() => {
                this.setReadNonblockMterm()
            })
        }
        else {

        }
    }

    destructor() {
        this.destroyMterm()
    }

    async createMtermDefault() {
        this.id = await invoke('create_mterm_default')
    }

    async createMterm() {
        this.id
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