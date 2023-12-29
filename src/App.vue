<template>
  <div>
    <toast />
    <navbar />
    <div id="main-container" class="status-bar w-screen h-screen overflow-x-hidden px-2">
      <div class="keyboard-padding-bottom w-full h-full pt-12">
        <term_view :term="termManage.termNow" :font-size="16" />
      </div>
    </div>
    <!-- <div class="w-12 h-12 bg-black fixed bottom-0"></div> -->
  </div>
</template>

<script>
import term_view from './components/term_view/term_view.vue'
import navbar from './components/navbar/navbar.vue'
import toast from './components/toast/toast.vue'
import { termManager } from './utils/term_manager.js'
export default {
  components: {
    navbar,
    term_view,
    toast
  },
  data() {
    return {
      termManage: termManager
    }
  },
  methods: {
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
  padding-top: calc(var(--status-bar-height)*1px) !important;
}

.keyboard-padding-bottom {
  padding-bottom: var(--keyboard-padding-bottom) !important;
}
</style>
