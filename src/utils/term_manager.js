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
            this.switchTerm(this.termArray.length - 1)
        }
        else
            toast.error("Terminal limit reached!")
    }

    closeTerm(index) {
        if (this.termArray.length == 1)
            return toast.error("Please leave at least one terminal!")

        this.termArray[index].destroyMterm()
        this.termArray.splice(index, 1)
        this.switchTerm(0)
    }

    switchTerm(index) {
        this.termNow = this.termArray[index]
        toast.success("Switch to " + (this.termNow.alias === "" ? index : this.termNow.alias) + " .")
    }

    setAlias(index, alias) {
        this.termArray[index].alias = alias
    }

    getAlias(index) {
        return this.termArray[index].alias
    }

}

const termManager = new TermManager()

export { termManager }