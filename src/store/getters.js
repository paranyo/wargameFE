const getters = {
	isAuthenticated(state) {
		return !!state.accessToken
	},
	isAdmin(state) {
		return !!state.accessToken
		/*if(typeof state.advancedToken !== null)
			return !!state.advancedToken*/
	},
	userId(state) {
		return state.uid
	}
}

export default getters
