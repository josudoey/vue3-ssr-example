import * as render from './render.pug'
import * as css from './style.css'

const outlet = {
  ...render,
  setup () {},
  data () {
    return {
      css: css,
      msg: `hello world time:${Date.now()}`
    }
  },
  methods: {
    refresh () {
      this.msg = `hello world time:${Date.now()}`
    }
  }
}
export default outlet
