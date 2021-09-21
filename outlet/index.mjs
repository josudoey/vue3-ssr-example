import template from './template.pug'
import * as css from './style.css'

const outlet = {
  template,
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
