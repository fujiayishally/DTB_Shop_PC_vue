import Icon from '@/components/Icon'
import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import DropdownMenu from '@/components/Dropdown/DropdownMenu'
import DropdownItem from '@/components/Dropdown/DropdownItem'

const globalComponents = {
  Icon,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
}

const install = function(Vue) {
  Object.keys(globalComponents).forEach(key => {
    Vue.component(key, globalComponents[key])
  })

  // Vue.prototype.$Alert = Alert
}
// import Alert from '@/components/Alert'

export default { install }
