const getters = {
	isAuthenticated(state) {
		return !!state.accessToken
	},
	isAdmin(state) {
		return !!state.isAdmin
	},
	userId(state) {
		return state.uid
	}
}

export default getters
