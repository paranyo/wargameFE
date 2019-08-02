import { auth, user, tag, challenge, prob, rank } from '../api'

const actions = {
	LOGIN({ commit }, { id, pw }) {
		return auth.login(id, pw)
			.then(({ accessToken, advancedToken, user }) => {
				commit('LOGIN', { accessToken, advancedToken, user })
		})
	},
	JOIN(_, { id, nick,  pw }) {
		return auth.join(id, nick, pw)
	},
	FETCH_USERS({ commit }) {
		return user.fetch().then(data => commit('SET_USERS', data))
	},
	FETCH_ONEUSER({ commit }, uid) {
		return user.fetch(uid)
			.then(({ user }) => commit('SET_ONEUSER', user))
	},
	UPDATE_USER({ state, dispatch }, { uid, nick, level, isBan }) {
		return user.update(uid, { nick, level, isBan })
			.then(_ => dispatch('FETCH_USERS'))
	},

/* TAG 관련 */

// TAG 추가
	ADD_CATEGORY({ state, dispatch }, title) {
		return challenge.create(title)
		.then(_ => dispatch('FETCH_CATEGORY_LIST', state.categoryList))
	},

// TAG 수정
	UPDATE_CATEGORY({ state, dispatch }, { id, isOpen }) {
		return challenge.update(id, { isOpen  })
		.then(_ => dispatch('FETCH_CATEGORY_LIST', state.categoryList))
	},

	// TAG 가져오기
	FETCH_TAGS({ commit }) {
		return tag.fetch().then(data => commit('SET_TAGS', data))
	},

	FETCH_PROBS({ commit }) {
		return prob.fetch().then(data => commit('SET_PROBS', data))
	},
	FETCH_ONEPROB({ commit }, { id }) {
		return prob.fetch(id)
			.then(({ prob }) => commit('SET_PROB', prob))
	},
	ADD_PROB({ state, dispatch }, { id, title, author, score, flag, isOpen }) {
		return prob.create(id, { title, author, score, flag, isOpen })
	},
	UPDATE_PROB({ stae, dispatch }, { _id, title, author, score, flag, isOpen }) {
		return prob.update(_id, { title, author, score, flag, isOpen })
	},

	/* AUTH PROB */
	AUTH_PROB({ state, dispatch }, { pid, flag }) {
		return prob.auth(pid, { flag })
	}
}

export default actions
