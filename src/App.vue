<template>
  <div>
    <navbar />
    <div id="main-container" class="status-bar w-screen h-screen overflow-x-hidden">
      <div class="pt-12 select-none">
        <p class=" text-9xl max-w-full">Mterm</p>
        <p class=" text-9xl max-w-full">Mterm</p>
        <p class=" text-9xl max-w-full">Mterm</p>
        <p class=" text-9xl max-w-full">Mterm</p>
        <p class=" text-9xl max-w-full">Mterm</p>
        <p class=" text-9xl max-w-full">Mterm</p>
        <p class=" text-9xl max-w-full">Mterm</p>
        <p class=" text-9xl max-w-full">Mterm</p>
      </div>
    </div>
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
