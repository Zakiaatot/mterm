<template>
    <div class="px-2 pb-4 w-full h-full overflow-y-scroll select-none relative z-10">
        <readmeMd class="md select-none" />
        <div class=" font-black flex w-full justify-center">zakiaatot@github.com</div>
    </div>
</template>
<script>
import readmeMd from '../../README.md'
export default {
    components: { readmeMd }
}
</script>
<style scoped>
:deep(.md) h1 {
    font-size: 36px;
    font-weight: 900;
}

:deep(.md) h2 {
    font-size: 24px;
    font-weight: 700;
}

:deep(.md) h3 {
    font-size: 18.72px;
    font-weight: 500;
}

:deep(.md) p {
    font-weight: 300;
}

:deep(.md) a {
    display: inline-block;
}
</style>