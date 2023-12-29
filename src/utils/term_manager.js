import { Term } from "./term"
import { toast } from "../components/toast/toast.js"

const MAX_TERM = 5

class TermManager {
    termArray = []
    termNow = null

    constructor() {
        this.createTerm()
    }

    createTerm() {
        if (this.termArray.length < MAX_TERM) {
            this.termArray.push(new Term())
            this.termNow = this.termArray[this.termArray.length - 1]
        }
        else
            toast.error("Terminal limit reached!")
    }

    closeTerm(index) {
        if (0 <= index < this.termArray.length && this.termArray[index]) {
            this.termArray[index].destroyMterm()
            this.termArray.splice(index, 1)
        }
    }

    switchTerm(index) {
        if (0 <= index < this.termArray.length && this.termArray[index]) {
            this.termNow = this.termArray[index]
        }
    }

    setAlias(index, alias) {
        if (0 <= index < this.termArray.length && this.termArray[index]) {
            this.termArray[index].alias = alias
        }
    }

    getAlias(index) {
        if (0 <= index < this.termArray.length && this.termArray[index]) {
            return this.termArray[index].alias
        }
        return null
    }

}

const termManager = new TermManager()

export { termManager }