// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store'
import Vuetify from 'vuetify'
import Ripple from 'vue-ripple-directive'
import VueFire from 'vuefire'
import VueResource from 'vue-resource'

Vue.use(Vuetify)
Vue.directive('ripple', Ripple);
Vue.use(VueFire)
Vue.use(VueResource);

Vue.http.options.root='https://orangebusv1-38083.firebaseio.com/';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
