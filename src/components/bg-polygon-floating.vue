<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { colors } from 'quasar'
import { computed } from '@vue/reactivity'
import cloneDeep from 'lodash-es/cloneDeep'
import { random, sample } from 'lodash-es'
import { nanoid } from 'nanoid'
import { promiseTimeout } from '@vueuse/core'
import type { PolygonParams } from 'types'
import { FillType, ShapeType } from 'types'
import PolygonBase from './base/polygon-base.vue'

const props = withDefaults(defineProps<Props>(), {
  mainColor: '#ffce5c',
  initialQuantity: 20,
  maxQuantity: 60,
  generateInterval: 1000,
})

const { lighten, textToRgb, rgbToHsv, hsvToRgb, rgbToHex } = colors

interface Props {
  mainColor?: string
  /* 初始数量，画面出现时内部初始方块数量 */
  initialQuantity?: number
  /* 色块最大数量，超过该数量时候暂停产生方块 */
  maxQuantity?: number
  /* 产生方块间距，越短生成速度越快 */
  generateInterval?: number
}

const backgroundStyle = computed(() => {
  // 变亮
  const lightenColor = lighten(props.mainColor, 10)

  // 变暗并偏移色相
  const darkColor = lighten(props.mainColor, -10)

  const hsvColor = rgbToHsv(textToRgb(darkColor))
  hsvColor.h -= 10

  const offsetColor = rgbToHex(hsvToRgb(hsvColor))

  return {
    background: `linear-gradient(-30deg, ${offsetColor}, ${props.mainColor}, ${lightenColor}, ${props.mainColor}, ${offsetColor})`,
  }
})

function createPolygonParams() {
  // 变暗、偏移色相、提升饱和度，作为 polygon 候选颜色
  const darkColor = lighten(props.mainColor, -10)
  const hsvColor = rgbToHsv(textToRgb(darkColor))
  // 提高饱和度
  hsvColor.s += 20

  const hsvColor01 = cloneDeep(hsvColor)
  hsvColor01.h -= 10

  const hsvColor02 = cloneDeep(hsvColor)
  hsvColor02.h += 10

  const colors = [
    rgbToHex(hsvToRgb(hsvColor)),
    rgbToHex(hsvToRgb(hsvColor01)),
    rgbToHex(hsvToRgb(hsvColor02)),
  ]

  const params: PolygonParams = {
    left: `${random(0, 100)}%`,
    top: `${random(0, 100)}%`,
    size: `${random(5, 20)}rem`,
    rotate: `${random(0, 90)}deg`,
    opacity: random(0.1, 0.2, true),
    color: sample(colors) ?? '',
    shape: sample(Object.values(ShapeType)) ?? 'round',
    fill: sample(Object.values(FillType)) ?? 'solid',
    animationDuration: `${random(5, 20)}s`,
  }
  return params
}

const polygonsMap = ref<Map<string, PolygonParams>>(new Map())
/* add polygon */
function addPolygon(params: PolygonParams) {
  polygonsMap.value.set(nanoid(), params)
}
/* remove polygon */
function removePolygon(id: string) {
  polygonsMap.value.delete(id)
}

let timer: ReturnType<typeof setInterval>

/* if generateInterval changed, create new timer */
watch(() => props.generateInterval, (generateInterval) => {
  clearInterval(timer)

  timer = setInterval(async () => {
    // 到達最大數量後，停止生成
    if (polygonsMap.value.size >= props.maxQuantity)
      return

    // 刻意延遲隨機時間，讓多邊形生成不會過度固定而顯得死板
    await promiseTimeout(random(300, 1000))
    addPolygon(createPolygonParams())
  }, generateInterval)
}, {
  immediate: true,
})

function init() {
  /* 预先建立多边形 */
  for (let i = 0; i < props.initialQuantity; i++)
    addPolygon(createPolygonParams())
}

init()

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<template>
  <div
    class="overflow-hidden"
    :style="backgroundStyle"
  >
    <slot />

    <polygon-base
      v-for="[key, polygon] in polygonsMap"
      :key="key"
      class="absolute polygon-move"
      :style="`left: ${polygon.left}; top: ${polygon.top}; animation-duration: ${polygon.animationDuration}`"
      :color="polygon.color"
      :rotate="polygon.rotate"
      :shape="polygon.shape"
      :fill="polygon.fill"
      :size="polygon.size"
      :opacity="polygon.opacity"
      @animationend="removePolygon(key)"
    />
  </div>
</template>

<style scoped lang="sass">
.polygon-move
  animation: polygon-move 10s forwards linear
@keyframes polygon-move
  0%
    transform: translate(0px, 0px) rotate(0deg)
    opacity: 0
  10%
    opacity: 1
  90%
    opacity: 1
  100%
    transform: translate(-10rem, 10rem) rotate(30deg)
    opacity: 0
</style>
