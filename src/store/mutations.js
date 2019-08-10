import { setAuthInHeader } from '../api'

const mutations = {
	LOGIN (state, { accessToken, advancedToken, user }) {
		if(!accessToken) return
			state.accessToken				 = accessToken
			localStorage.accessToken = accessToken
			if(typeof advancedToken !== null)
				state.advancedToken				 = advancedToken
				localStorage.advancedToken = advancedToken
			setAuthInHeader(accessToken)
	},
	LOGOUT (state) {
		state.accessToken = null
		state.advancedToken = null
		localStorage.clear()
		setAuthInHeader(null)
	},
	SET_USERS (state, user) {
		state.users = user.map(u => u)
	},
	SET_ONEUSER (state, user) {
		state.user = user
	},
	SET_TAGS(state, { list }) {
		state.tags = list.map(l => l)
	},
	SET_IS_ADD_TAG(state, toggle) {
		state.isAddTag = toggle
	},
	SET_IS_ADD_PROB(state, toggle) {
		state.isAddProb = toggle
	},
	SET_PROBS(state, { list }) {
		state.probs = list.map(l => l)
	},
	SET_PROB(state, prob) {
		state.prob = prob
	},

	/* RANK */
	SET_RANKING(state, { user }) {
		state.rank = user.map(user => user)
	}
}

export default mutations
