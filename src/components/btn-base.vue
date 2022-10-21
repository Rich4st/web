<script setup lang="ts">
import { nanoid } from 'nanoid';
import { computed, reactive, ref } from 'vue';
import { ButtonState } from '../types';

interface Props {
  label?: string;
  labelColor?: string;
  labelHoverColor?: string;
  strokeColor?: string;
  strokeHoverColor?: string;
  strokeWidth?: string;
}
const props = withDefaults(defineProps<Props>(), {
  label: 'Button',
  labelColor: 'white',
  labelHoverColor: undefined,
  strokeColor: '#888',
  strokeHoverColor: undefined,
  strokeWidth: '2',
});

const state = reactive<ButtonState>({
  active: false,
  hover: false,
})

const id = ref(nanoid())
const svgFilterId = computed(() => `svg-filter-${id.value}`);

const strokeStyle = computed(() => {
  let color = props.strokeColor;

  if (props.strokeHoverColor) {
    color = state.hover ? props.strokeHoverColor : props.strokeColor;
  }

  return {
    color,
    filter: `url(#${svgFilterId.value})`
  }
});

const btnClass = computed(() => ({
  active: state.active,
}))

const labelStyle = computed(() => {
  let color = props.labelColor;

  if (props.labelHoverColor) {
    color = state.hover ? props.labelHoverColor : props.labelColor;
  }

  return {
    color,
  }
});
</script>

<template>
  <div
    class="btn flex flex-center text-3xl p-12 rounded-full"
    :class="btnClass"
  >
    <slot :state="state" />
    <!-- label -->
    <div
      class="label relative font-black tracking-widest"
      :style="labelStyle"
    >
      <!-- stroke -->
      <div
        class="label-stroke absolute"
        :style="strokeStyle"
      >
        {{ props.label }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('../assets/css/btn.scss')
</style>
