<script setup lang="ts">
import { ref } from 'vue';
import { colors } from 'quasar';
import { computed } from '@vue/reactivity';
import PolygonBase from './polygon-base.vue';

const { lighten, textToRgb, rgbToHsv, hsvToRgb, rgbToHex } = colors;

interface Props {
  mainColor?: string;
  /* 初始数量，画面出现时内部初始方块数量 */
  initialQuantity?: number;
  /* 色块最大数量，超过该数量时候暂停产生方块 */
  maxQuantity?: number;
  /* 产生方块间距，越短生成速度越快 */
  generateInterval?: number;
}

const props = withDefaults(defineProps<Props>(), {
  mainColor: '#ffce5c',
  initialQuantity: 10,
  maxQuantity: 30,
  generateInterval: 1000,
});

const backgroundStyle = computed(() => {
  /* 变亮 */
  const lightenColor = lighten(props.mainColor, 10);

  // 变暗并偏移色相
  const darkColor = lighten(props.mainColor, -10);

  const hsvColor = rgbToHsv(textToRgb(darkColor));
  hsvColor.h -= 10

  const offsetColor = rgbToHex(hsvToRgb(hsvColor));

  return {
    background: `linear-gradient(-30deg, ${offsetColor}, ${props.mainColor}, ${lightenColor}, ${props.mainColor}, ${offsetColor})`
  }
})

</script>

<template>
  <div
    class="overflow-hidden"
    :style="backgroundStyle"
  >
    <polygon-base
      shape="round"
      fill="spot"
    />
    <polygon-base
      shape="triangle"
      fill="fence"
    />
    <polygon-base
      shape="square"
      fill="spot"
    />
    <polygon-base
      shape="pentagon"
      fill="solid"
    />
  </div>
</template>
