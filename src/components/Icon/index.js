import IconSvg from './IconSvg'

const requireAll = requireContext => {
  requireContext.keys().map(requireContext)
}
const reqSvgContext = require.context('@/assets/IconSvg', false, /\.svg$/)
requireAll(reqSvgContext)

export default {
  install(Vue) {
    Vue.component('IconSvg', IconSvg)
  },
}
