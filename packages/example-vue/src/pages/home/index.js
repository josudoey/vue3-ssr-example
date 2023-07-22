import { ref } from 'vue'
import { useHomeStore } from './store.js'

export default {
  setup () {
    const { time, refresh } = useHomeStore()
    const msg = ref('')

    return {
      time,
      msg,
      async refresh () {
        await refresh()
        msg.value = `time: ${time.value}`
      }
    }
  }
}
