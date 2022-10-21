<script setup lang="ts">
import { ref } from 'vue';
import BgPolygonFloating from '~/bg-polygon-floating.vue';
import BtnBase from '~/base/polygon-base.vue';

interface Props {
  label?: string;
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <BgPolygonFloating class="absolute inset-0">
    <polygon-base
      class="bg-polygon-lt"
      size="50rem"
      fill="fence"
      shape="square"
      rotate="30deg"
      opacity="0.1"
      color="#e09c48"
    />

    <polygon-base
      class="bg-polygon-rb"
      size="80rem"
      fill="spot"
      shape="round"
      rotate="30deg"
      opacity="0.1"
      color="#f0a53c"
    />
  </BgPolygonFloating>
</template>

<style scoped lang="scss">
@import url('../assets/css/the-home.scss')
</style>
