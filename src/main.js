import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from '@/utils/http'
import GlobalComponents from '@/components/installGlobalComponents'

// 全局样式
import '@/styles/common/index.scss'

// 全局方法
Vue.prototype.$http = http

// 安装全局组件
Vue.use(GlobalComponents)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
