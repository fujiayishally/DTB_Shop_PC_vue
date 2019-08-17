import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () =>
        import(/* webpackChunkName: "layout" */ '@/layouts/BaseLayout'),
      children: [
        {
          path: '/',
          redirect: '/home',
        },
        {
          path: '/home',
          name: 'home',
          component: () =>
            import(/* webpackChunkName: "home" */ './views/Home'),
        },
        {
          path: '/product',
          name: 'product',
          component: () =>
            import(/* webpackChunkName: "product" */ './views/Product'),
        },
        {
          path: '/example/:component',
          name: 'example',
          component: () =>
            import(/* webpackChunkName: "product" */ './views/Example'),
        },
      ],
    },
  ],
})
