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
import VueProgressBar from 'vue-progressbar'

const options = {
  color: '#b3d4fc',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.1s',
    opacity: '0.6s',
    termination: 9000
  },
  autoRevert: true,
  location: 'left',
  inverse: false
}

Vue.use(VueProgressBar, options)

Vue.use(Vuetify)
Vue.directive('ripple', Ripple);
Vue.use(VueFire)
Vue.use(VueResource);

let state_name = 'rajasthan';
Vue.http.options.root='https://orangebusv1-38083.firebaseio.com/'+state_name+ '/';

Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
