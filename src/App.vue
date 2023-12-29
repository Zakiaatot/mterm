<template>
  <div>
    <toast />
    <navbar />
    <div id="main-container" class="status-bar w-screen h-screen overflow-x-hidden px-2">
      <div class="keyboard-padding-bottom w-full h-full pt-12">
        <button class="btn btn-primary" @click="btn">change</button>
        <term_view :term="term" :font-size="14" />
      </div>
    </div>
    <!-- <div class="w-12 h-12 bg-black fixed bottom-0"></div> -->
  </div>
</template>

<script>
import term_view from './components/term_view/term_view.vue'
import navbar from './components/navbar/navbar.vue'
import toast from './components/toast/toast.vue'
import { Term } from './utils/term.js'
export default {
  components: {
    navbar,
    term_view,
    toast
  },
  data() {
    const termArray = []
    for (let i = 0; i < 7; i++) {
      termArray.push(new Term())
    }
    return {
      term: termArray[0],
      termArray,
      index: 0
    }
  },
  methods: {
    btn() {
      this.index = (this.index + 1) % 6
      this.term = this.termArray[this.index]
    }
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
