<template>
  <div>
    <navbar />
    <div id="main-container" class="status-bar w-screen h-screen overflow-x-hidden px-2">
      <div class="w-full h-full pt-16">
        <term_view />
      </div>
    </div>
  </div>
</template>

<script>
import term_view from './components/term_view/term_view.vue'
import navbar from './components/navbar/navbar.vue'
export default {
  components: {
    navbar,
    term_view
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
  padding-top: var(--status-bar-height) !important;
}
</style>
