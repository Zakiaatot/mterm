class TermViewConfig {
    config = {
        cursorBlink: true,
        cursorStyle: 'underline',
        fontWeight: 700,
        fontSize: 16,
        scrollOnUserInput: true
    }

    constructor() {
        this.loadConfig()
    }

    loadConfig() {
        const configDisk = localStorage.getItem('viewConfig')
        if (configDisk) {
            const config = JSON.parse(configDisk)
            for (let key in config) {
                this.config[key] = config[key]
            }
        }
    }

    saveConfig() {
        localStorage.setItem('viewConfig', JSON.stringify(this.config))
    }

    getItem(key) {
        return this.config[key]
    }

    setItem(key, value) {
        this.config[key] = value
        this.saveConfig()
    }
}

const termViewConfig = new TermViewConfig()

export { termViewConfig }