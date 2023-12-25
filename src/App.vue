<template>
  <div>
    <navbar />
    <div id="main-container" class="status-bar w-screen h-screen overflow-x-hidden px-2">
      <div class="keyboard-padding-bottom w-full h-full pt-12">
        <term_view />
      </div>
    </div>
    <!-- <div class="w-12 h-12 bg-black fixed bottom-0"></div> -->
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
    document.documentElement.style.setProperty('--status-bar-height', AndroidApi.getStatusBarHeight() + 'px')
    setTimeout(() => {
      AndroidApi.closeSplash()
    }, 500)
  }
}
</script>

<style>
:root {
  --status-bar-height: 24px;
  --keyboard-padding-bottom: 0px;
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

.status-bar {
  padding-top: var(--status-bar-height) !important;
}

.keyboard-padding-bottom {
  padding-bottom: var(--keyboard-padding-bottom) !important;
}
</style>
