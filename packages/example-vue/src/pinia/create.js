import { createPinia as _createPinia } from 'pinia'
export function createPinia () {
  const pinia = _createPinia()
  if (!import.meta.env.SSR) {
    pinia.state.value = window.__pinia
    delete window.__pinia
  }

  return pinia
}
