<template>
    <div class="w-full h-full">
        <div class="w-full h-full">
            <term_view ref="initTerm" :termViewConfig="termViewConfig.config" :term="term"></term_view>
        </div>
        <div ref="initSplash" class="fixed top-0 bottom-0 left-0 right-0 z-[999] backdrop-blur-sm bg-opacity-70 
            flex justify-center items-center flex-col">
            <span class="loading loading-spinner loading-lg">
            </span>
            <p class="text-center text-xl font-extrabold py-2">{{ text }}</p>
        </div>
    </div>
</template>

<script>
import term_view from '../components/term_view/term_view.vue'
import { termViewConfig } from '../components/term_view/term_view_config.js'
import { Term } from '../utils/term.js'
import { download } from '@tauri-apps/plugin-upload'
import { toast } from '../components/toast/toast.js'
import { termManager } from '../utils/term_manager.js'
export default {
    components: { term_view },
    data() {
        return {
            termViewConfig,
            term: new Term(),
            text: "Loading...",
            rootDir: "/data/data/com.mterm.mterm/files",
        }
    },
    methods: {
        async init() {
            // download bootstrap
            const arch = AndroidApi.getOsArch()
            if (arch == "unknown") {
                return this.text = "Error: Unsupported unknown architecture!"
            }
            try {
                await download(
                    `http://mterm.hackerfly.cn/download/bootstrap-${arch}.zip`,
                    `/data/data/com.mterm.mterm/bootstrap-${arch}.zip`,
                    ({ progress, total }) => {
                        this.text = `Download bootstrap: ` + (progress / total * 100).toFixed(2) + `%`
                    },
                )
            }
            catch (e) {
                return this.text = "Error: " + e
            }
            // init app
            const initShell = `
            function initApp(){
                rm -rf ${this.rootDir}
                mkdir ${this.rootDir}
                mkdir ${this.rootDir + '/usr'}
                mkdir ${this.rootDir + '/home'}                   
                mv /data/data/com.mterm.mterm/bootstrap-${arch}.zip ${this.rootDir + '/usr'}
                cd ${this.rootDir + '/usr'}
                chmod 777 bootstrap-${arch}.zip
                unzip bootstrap-${arch}.zip
                rm ${this.rootDir + '/usr'}/bootstrap-${arch}.zip
                cd ${this.rootDir + '/usr'}/
                for line in \`cat SYMLINKS.txt\`
                do
                    echo $line
                    OLD_IFS="\$IFS"
                    IFS="←"
                    arr=(\$line)
                    IFS="\$OLD_IFS"
                    ln -s \${arr[0]} \${arr[3]}
                done
                rm -rf SYMLINKS.txt
                TMPDIR=${this.rootDir + '/usr'}/tmp
                filename=bootstrap
                rm -rf "\$TMPDIR/\$filename*"
                rm -rf "\$TMPDIR/*"
                chmod -R 0777 ${this.rootDir + '/usr/bin'}/*
                chmod -R 0777 ${this.rootDir + '/usr'}/lib/* 2>/dev/null
                chmod -R 0777 ${this.rootDir + '/usr'}/libexec/* 2>/dev/null
                touch /data/data/com.mterm.mterm/cache/lockfile
            }
            `
            setTimeout(() => {
                this.term.writeMterm(initShell + "\n")
                this.term.writeMterm("initApp\n");
                this.text = "Init app..."
            }, 100)
            let counter = 0
            let checkInit = setInterval(() => {
                if (AndroidApi.isInit()) {
                    toast.success("Mterm init success!")
                    termManager.createTerm()
                    clearInterval(checkInit)
                    this.$router.replace('/term')
                }
                if (counter > 60) {
                    this.text = "Error: Init failed,please try again!"
                    this.term.writeMterm("rm /data/data/com.mterm.mterm/cache/lockfile\n");
                    clearInterval(checkInit)
                }
                counter++
            }, 1000)
        }
    },
    async mounted() {
        if (AndroidApi.isInit())
            this.$router.replace('/term')
        else
            await this.init()
    }
}
</script>

<style scoped></style>