import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 라우터 설정 */
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/Home').default
    },
    {
      path: '/create',
      name: 'create',
      component: require('@/components/CreateVisual').default
    },
    {
      path: '/info',
      name: 'info',
      component: require('@/components/Information.vue').default
    },
    {
      path: '/setting',
      name: 'setting',
      component: require('@/components/Setting').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
