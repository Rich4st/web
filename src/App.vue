<script setup lang="ts">
import { ref } from 'vue'

import { useLoading } from '@/composables'
import LoadingOverlay from '~/transition/loading-overlay.vue'

const loading = useLoading()

setTimeout(() => {
  loading.show()
  setTimeout(() => {
    loading.hide()
  }, 2000)
}, 2000)

document.title += ` v${import.meta.env.PACKAGE_VERSION}`
</script>

<template>
  <router-view />
  <loading-overlay />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap');
html, body, #app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  font-family: 'Noto Sans TC', sans-serif;
}
#app{
  display: flex;
  flex-direction: column;
}
</style>
