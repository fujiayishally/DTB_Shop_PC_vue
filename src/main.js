import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from '@/utils/http'

// 自定义组件
import IconSvg from '@/components/Icon'
import Button from '@/components/Button'

// 全局样式
import '@/assets/styles/global.scss'

Vue.use(IconSvg)
Vue.use(Button)
Vue.config.productionTip = false
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
