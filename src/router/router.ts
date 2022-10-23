import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { RouterName } from 'types'

export interface RouteMeta {
  name: string
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {
      name: RouterName.HOME,
    },
  },

  {
    path: '/home',
    name: RouterName.HOME,
    component: () => import('views/the-home.vue'),
  },

  {
    path: '/game-console',
    name: RouterName.GAME_CONSOLE,
    component: () => import('views/game-console.vue'),
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
