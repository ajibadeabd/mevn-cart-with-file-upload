import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from '../router'
import store from '../store/index'
import axios from 'axios'


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.prototype.$http=axios;
const token = localStorage.getItem('token')
if(token){
      Vue.prototype.$http.defaults.headers.common['Authorization']=token
}
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
