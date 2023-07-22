import {
  createRouterMatcher,
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory
} from 'vue-router'

const routes = [{
  path: '/',
  component: () => import('./pages/home/Home.vue')
}, {
  path: '/home/',
  component: () => import('./pages/home/Home.vue')
}]

export function createRouter () {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR
      ? createMemoryHistory('/')
      : createWebHistory('/'),
    routes
  })
}
export function createMatcher () {
  return createRouterMatcher(routes, {})
}
