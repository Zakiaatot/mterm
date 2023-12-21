<template>
  <div class="status-bar">
    <navbar />
    <div class="h-12"></div>
    <p class=" text-9xl max-w-full">Mterm</p>
    <p class=" text-9xl max-w-full">Mterm</p>
    <p class=" text-9xl max-w-full">Mterm</p>
    <p class=" text-9xl max-w-full">Mterm</p>
    <p class=" text-9xl max-w-full">Mterm</p>
    <p class=" text-9xl max-w-full">Mterm</p>
    <p class=" text-9xl max-w-full">Mterm</p>
    <p class=" text-9xl max-w-full">Mterm</p>

  </div>
</template>

<script>
import navbar from './components/navbar/navbar.vue'
export default {
  components: {
    navbar
  },
  mounted() {
    const element = document.getElementById('app');
    element.style.setProperty('--status-bar-height', AndroidApi.getStatusBarHeight())
    setTimeout(() => {
      AndroidApi.closeSplash()
    }, 500)
  }
}
</script>

<style>
*,
html,
body,
#app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  --status-bar-height: 24px;
}

.status-bar {
  padding-top: var(--status-bar-height);
}
</style>
