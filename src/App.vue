<template>
  <div class="w-screen h-screen bg-black">
    <navbar></navbar>
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
    AndroidApi.setWhiteBar()
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
</style>
