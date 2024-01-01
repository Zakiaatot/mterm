<template>
    <div class="flex shadow-md justify-center px-4 py-2 items-center max-w-fit rounded-2xl text-gray-800" ref="toast">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6 inline-block" fill="none"
            viewBox="0 0 24 24" v-if="this.type === 'success'">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6 inline-block" fill="none"
            viewBox="0 0 24 24" v-else>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class=" select-none">{{ this.msg }}</p>
    </div>
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default: 'success'
        },
        msg: String
    },
    mounted() {
        let className = ''
        if (this.type === 'success') {
            className = 'bg-success'

        } else {
            className = 'bg-error'
        }
        this.$refs.toast.classList.add(className)
    }
}
</script>