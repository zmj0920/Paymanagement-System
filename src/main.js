import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'
// vxe表格插件
import XEUtils from 'xe-utils'
import VXEUtils from 'vxe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission' // permission control
import './utils/filter' // global filter
import './components/global.less'

// mounts 可以设置['cookie', 'browse', 'locat']

Vue.use(VXEUtils, XEUtils, { mounts: ['cookie'] })
// Vue.use(XEUtils)
Vue.use(VXETable)

Vue.config.productionTip = false
// Vue.prototype.$url = 'http://47.56.180.125'
// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
