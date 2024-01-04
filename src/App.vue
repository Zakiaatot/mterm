<template>
  <div>
    <toast />
    <my_dialog />
    <navbar />
    <div id="main-container" class="status-bar w-screen h-screen overflow-hidden px-1">
      <div class="w-full h-full pt-12">
        <RouterView v-slot="{ Component }">
          <Transition mode="out-in" name="slide-up">
            <component :is="Component" :key="$route.fullPath" />
          </Transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from './components/navbar/navbar.vue'
import toast from './components/toast/toast.vue'
import my_dialog from './components/my_dialog/my_dialog.vue'
export default {
  components: {
    navbar,
    toast,
    my_dialog
  },
  mounted() {
    document.documentElement.style.setProperty('--status-bar-height', AndroidApi.getStatusBarHeight())
    setTimeout(() => {
      AndroidApi.closeSplash()
    }, 500)
  }
}
</script>

<style>
:root {
  --status-bar-height: 24;
  --keyboard-padding-bottom: 16px;
}

*,
html,
body,
#app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}


*::-webkit-scrollbar {
  background-color: rgba(0, 0, 0, 0) !important;
  width: 3px !important;
}

*::-webkit-scrollbar-thumb {
  background: hsl(var(--bc) / var(--tw-text-opacity, 1)) !important;
  border-radius: 10px !important;
}

.status-bar {
  padding-top: calc(var(--status-bar-height)*1px) !important;
}

.keyboard-padding-bottom {
  padding-bottom: var(--keyboard-padding-bottom) !important;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
