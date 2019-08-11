import Icon from './Icon'

const requireAll = requireContext => {
  requireContext.keys().map(requireContext)
}
const reqSvgContext = require.context('@/assets/icon-svg', false, /\.svg$/)
requireAll(reqSvgContext)

export default Icon
