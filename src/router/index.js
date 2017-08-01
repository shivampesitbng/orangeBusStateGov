import Vue from 'vue'
import Router from 'vue-router'
import HOME from '@/components/3_HOME'
import SEARCH from '@/components/4_SHOW_&_SELECT_SEARCH_RESULT'
import SCHEDULE from '@/components/5_SELECT_DATE'
import DIRECT_BUS from '@/components/6_DIRECT_BUS'


Vue.use(Router)


export default new Router({
  routes: [
    { path: '/', name: 'HOME', component: HOME },
    { path: '/search', name: 'SEARCH', component: SEARCH },
    { path: '/schedule', name: 'SCHEDULE', component: SCHEDULE },
    { path: '/direct_bus', name: 'DIRECT_BUS', component: DIRECT_BUS },
  ]
})

// lazy route -> in the end
