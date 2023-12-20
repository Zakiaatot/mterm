<script>
export default {
  mounted() {
    setTimeout(() => {
      AndroidApi.setWhiteBar()
      AndroidApi.closeSplash()
    }, 500)
  }
}
</script>

<template>
  <div class="w-screen h-screen bg-black">
    <div class="w-full h-full flex justify-center items-center">
      <div class="text-white text-3xl font-bold">Mterm</div>
    </div>
  </div>
</template>

<style>
*,
html,
body,
#app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
</style>
