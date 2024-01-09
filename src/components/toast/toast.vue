<template>
    <div class="custom-toast select-none top-14 z-[9999]">
        <TransitionGroup name="slide-up">
            <ToastItem v-for="item in this.$toast.toastQueue" :key="item.id" :type="item.type" :msg="item.msg" />
        </TransitionGroup>
    </div>
</template>
<script>
import ToastItem from './toast_item.vue'
export default {
    components: { ToastItem },
    data() {
        return {
        }
    },
    mounted() {
    }
}
</script>
<style scoped>
.slide-up-move,
/* 对移动中的元素应用的过渡 */
.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.5s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
    opacity: 0;
    transform: translateX(2rem);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.slide-up-leave-active {
    position: absolute;
    /* transform: translateX(0); */
}

.custom-toast {
    position: fixed;
    display: flex;
    min-width: fit-content;
    flex-direction: column;
    align-items: center;
    white-space: nowrap;
    gap: 0.5rem
        /* 8px */
    ;
    padding: 1rem
        /* 16px */
    ;
    right: 50%;
    left: 50%;
    transform: translateX(-50%);
}
</style>