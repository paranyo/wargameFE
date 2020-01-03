import Vue from 'vue'
import io from 'socket.io-client'

const socket = io('https://wargame2.run.goorm.io')

const SocketPlugin = {
	install(vue) {
		vue.mixin({})
		vue.prototype.$socket = socket
	}
}

Vue.use(SocketPlugin)
