import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
import { TablePlugin } from 'bootstrap-vue'
import './plugins/socketPlugin'


Vue.use(BootstrapVue)
Vue.use(TablePlugin)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
