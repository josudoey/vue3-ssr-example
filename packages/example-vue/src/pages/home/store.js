import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

const delay = function (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const useStore = defineStore('home', () => {
  const time = ref(0)

  return {
    time,
    async refresh () {
      await delay(100)
      time.value = Date.now()
    }
  }
})

export function useHomeStore () {
  const store = useStore()
  const { refresh } = store
  const { time } = storeToRefs(store)
  return {
    time,
    refresh
  }
}
