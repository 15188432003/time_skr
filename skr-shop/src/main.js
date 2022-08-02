import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/scss/common.scss'

//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
import { message } from '@/utils/message'
Vue.prototype.$message = message
//引入svg文件
import '@/icons'
//引入路由守卫
import '@/utils/permisstion'
//引入swiper
import './plugin/swiper'



Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()


new Vue({
 
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
