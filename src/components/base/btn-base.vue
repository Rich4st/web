<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ButtonState } from 'types'
import { computed } from '@vue/reactivity'
import { nanoid } from 'nanoid'

interface Props {
  label?: string
  labelColor?: string
  labelHoverColor?: string
  strokeColor?: string
  strokeHoverColor?: string
  strokeWidth?: string
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
  labelColor: 'white',
  labelHoverColor: undefined,
  strokeColor: '#888',
  strokeHoverColor: undefined,
  strokeWidth: '2',
})
const emit = defineEmits<{
  (e: 'joinClick'): void
}>()

const id = ref(nanoid())
const state = reactive<ButtonState>({
  hover: false,
  active: false,
})

const btnClass = computed(() => ({ active: state.active }))
const svgFilterId = computed(() => `svg-filter-${id.value}`)

const labelStyle = computed(() => {
  let color = props.labelColor

  if (props.labelHoverColor)
    color = state.hover ? props.labelHoverColor : props.labelColor

  return {
    color,
  }
})
const strokeStyle = computed(() => {
  let color = props.strokeColor

  if (props.strokeHoverColor)
    color = state.hover ? props.strokeHoverColor : props.strokeColor

  return {
    color,
    filter: `url(#${svgFilterId.value})`,
  }
})

function handleJoinParty() {
  emit('joinClick')
}
</script>

<template>
  <div
    class="btn flex flex-center text-3xl p-12 rounded-full"
    :class="btnClass"
    @click="handleJoinParty"
    @mouseenter="state.hover = true"
    @mouseleave="state.hover = false"
    @mousedown="state.active = true"
    @mouseup="state.active = false"
  >
    <slot :state="state" />

    <!-- label -->
    <div
      class="label relative font-black tracking-widest"
      :style="labelStyle"
    >
      {{ props.label }}

      <!-- stroke -->
      <div
        class="label-stroke absolute"
        :style="strokeStyle"
      >
        {{ props.label }}
      </div>
    </div>

    <svg version="1.1" style="display: none;">
      <defs>
        <filter :id="svgFilterId">
          <feMorphology
            operator="dilate"
            :radius="props.strokeWidth"
          />
          <feComposite
            in="SourceGraphic"
            operator="xor"
          />
        </filter>
      </defs>
    </svg>
  </div>
</template>

<style scoped lang="sass">
.btn
  backdrop-filter: blur(6px)
  background: rgba(white, 0.2)
  box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.006), 6.7px 6.7px 5.3px rgba(0, 0, 0, 0.008), 12.5px 12.5px 10px rgba(0, 0, 0, 0.01), 22.3px 22.3px 17.9px rgba(0, 0, 0, 0.012), 41.8px 41.8px 33.4px rgba(0, 0, 0, 0.014), 100px 100px 80px rgba(0, 0, 0, 0.02)
  user-select: none
  overflow: hidden
  cursor: pointer
  transition-timing-function: cubic-bezier(0.000, 1.650, 1.000, 1.650)
  transition-duration: 0.2s
  &.active
    transform: scale(0.98) rotate(-1deg)
    transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1)
.label
  transition-duration: 0.4s

.label-stroke
  top: 0
  transition-duration : 0.4s
</style>
