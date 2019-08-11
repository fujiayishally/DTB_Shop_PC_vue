import Icon from '@/components/Icon'

const globalComponents = {
  Icon,
}

const install = function(Vue) {
  //   if (install.installed) return
  Object.keys(globalComponents).forEach(key => {
    Vue.component(key, globalComponents[key])
  })

  // Vue.prototype.$Alert = Alert
}
// import Button from '@/components/Button'
// import Alert from '@/components/Alert'
// Vue.use(IconSvg)
// Vue.use(Button)

export default { install }
