<script setup lang="ts">
import { } from 'vue'
import BackgroundPolygonsLoading from '../background-polygons-loading.vue'
import TransitionMask from './transition-mask.vue'
import { useLoading } from '@/composables'

const { isLoading, handleUpdate } = useLoading()
</script>

<template>
  <transition-mask
    v-model="isLoading"
    class="absolute inset-0"
    @update="handleUpdate"
  >
    <background-polygons-loading class="absolute inset-0" />
  </transition-mask>
</template>
