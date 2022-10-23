<script setup lang="ts">
import { RouterName } from 'types'
import { useRouter } from 'vue-router'
import BgPolygonFloating from '~/bg-polygon-floating.vue'
import BtnBase from '~/base/btn-base.vue'
import PolygonBase from '~/base/polygon-base.vue'
import { useLoading } from '@/composables'

const loading = useLoading()
const router = useRouter()

async function startParty() {
  await loading.show()
  router.push({
    name: RouterName.GAME_CONSOLE,
  })
}
</script>

<template>
  <BgPolygonFloating class="absolute inset-0" />
  <div class="absolute inset-0 flex flex-col flex-center gap-20">
    <BtnBase class="menu-btn" label="建立房间" label-hover-color="#ff9a1f" stroke-color="#856639" stroke-hover-color="white" @click="startParty">
      <template #default="{ state }">
        <div class="btn-content absolute inset-0" :class="{ hover: state.hover }">
          <PolygonBase class="absolute btn-polygon-lt" size="14rem" shape="round" fill="spot" />
          <q-icon name="sports_esports" color="white" size="8rem" class=" absolute game-icon" />
        </div>
      </template>
    </BtnBase>

    <BtnBase class="menu-btn" label="加入房间" label-hover-color="#ff9a1f" stroke-color="#856639" stroke-hover-color="white">
      <template #default="{ state }">
        <div class="btn-content absolute inset-0" :class="{ hover: state.hover }">
          <PolygonBase class="absolute btn-polygon-lt" size="14rem" rotate="144deg" shape="pentagon" fill="fence" />
          <q-icon name="person_add" color="white" size="7rem" class=" absolute join-icon" />
        </div>
      </template>
    </BtnBase>
  </div>
</template>

<style scoped lang="scss">
@import url('../assets/css/the-home.scss')
</style>
