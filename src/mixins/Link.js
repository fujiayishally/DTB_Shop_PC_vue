// 模拟<router-link>的功能
export default {
  props: {
    to: [Object, String],
    replace: {
      type: Boolean,
      default: false,
    },
    append: {
      type: Boolean,
      default: false,
    },
    target: {
      type: String,
      validator(value) {
        return ['_blank', '_self', '_parent', '_top'].includes(value)
      },
      default: '_self',
    },
  },
  computed: {
    href() {
      const { to, append } = this
      const router = this.$router

      if (to.includes('//')) return to
      if (router) {
        const currentRoute = this.$route
        const toRoute = router.resolve(to, currentRoute, append)
        return toRoute ? toRoute.href : to
      } else {
        return typeof to === 'string' ? to : to.path
      }
    },
  },
  methods: {
    handleClick(new_window = false) {
      const { to, href, replace } = this
      const router = this.$router

      if (new_window) {
        window.open(href)
      } else {
        if (router) replace ? router.replace(to) : router.push(to)
        else window.location.href = to
      }
    },
    handleCheckClick(event, new_window = false) {
      const { to, target, handleClick } = this
      if (to) {
        if (target === '_blank') return false
        else {
          event.preventDefault()
          handleClick(new_window)
        }
      }
    },
  },
}
