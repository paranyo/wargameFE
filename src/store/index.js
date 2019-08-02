import Vuex			 from 'vuex'
import Vue			 from 'vue'
import state		 from './state'
import getters	 from './getters'
import actions	 from './actions'
import mutations from	'./mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})

const { accessToken, user } = localStorage
store.commit('LOGIN', { accessToken, user })


export default store
