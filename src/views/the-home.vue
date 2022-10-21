<template>
  <BgPolygonFloating class="absolute inset-0" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BgPolygonFloating from '../components/bg-polygon-floating.vue';

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

<style scoped lang="sass">
</style>
