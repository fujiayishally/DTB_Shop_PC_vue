import Icon from '@/components/Icon'
import Button from '@/components/Button'

const globalComponents = {
  Icon,
  Button,
}

const install = function(Vue) {
  Object.keys(globalComponents).forEach(key => {
    Vue.component(key, globalComponents[key])
  })

  // Vue.prototype.$Alert = Alert
}
// import Alert from '@/components/Alert'

export default { install }
