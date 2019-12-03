import { auth, user, tag, challenge, prob, rank, admin, item } from '../api'

const actions = {
	LOGIN({ commit }, { id, pw }) {
		return auth.login(id, pw)
			.then(({ accessToken, advancedToken, user }) => {
				commit('LOGIN', { accessToken, advancedToken, user })
		})
	},
	JOIN(_, { id, nick, email, pw }) {
		return auth.join(id, nick, email, pw)
	},
	FIND_PASSWORD(_, { uid, email }) {
		return auth.sendMail(uid, email)		
	},
	FETCH_MYINFO({ commit }) {
		return user.fetchInfo().then(({ user }) => commit("SET_MYINFO", user))
	},
	FETCH_USERS({ commit }) {
		return user.fetch().then(data => commit('SET_USERS', data))
	},
	FETCH_ONEUSER({ commit }, uid) {
		if(uid)
			return user.fetch(uid)
				.then(({ user }) => commit('SET_ONEUSER', user))
		else 
			return user.fetch()
				.then(({ user }) => commit('SET_ONEUSER', user))
	},
	UPDATE_USER({ state, dispatch }, { uid, pw, ip, money, nick, level, isBan, reason, email, intro }) {
		return user.update(uid, { pw, ip, money, nick, level, isBan, reason, email, intro })
			.then(_ => dispatch('FETCH_USERS'))
	},

/* TAG 관련 */

	ADD_TAG({ state, dispatch }, title) {
		return tag.create(title)
			.then(_=> dispatch('FETCH_TAGS', state.tags))
	},
	UPDATE_TAG({ state, dispatch }, { title, isOpen }) {
		return tag.update(title, { isOpen })
			.then(_=> dispatch('FETCH_TAGS', state.tags))
	},
	FETCH_TAGS({ commit }) {
		return tag.fetch().then(data => commit('SET_TAGS', data))
	},


/* PROB */
	FETCH_PROBS({ commit }, { tags }) {
		return prob.fetch({ tags }).then(data => commit('SET_PROBS', data))
	},
	FETCH_ONEPROB({ commit }, id) {
		return prob.fetchOne(id).then(({ prob }) => commit('SET_PROB', prob))
	},
	ADD_PROB({ state, dispatch }, { title, description, author, score, flag, isOpen, tagId }) {
		return prob.create({ title, description, author, score, flag, isOpen, tagId  })
	},
	UPDATE_PROB({ state, dispatch }, { id, title, description, author, score, flag, isOpen, tagId }) {
		return prob.update(id, { id, title, description, author, score, flag, isOpen, tagId })
	},

	/* AUTH PROB */
	AUTH_PROB({ state, dispatch }, { id, flag }) {
		return prob.auth(id, { flag }).then(({ result }) => result)
	},

	FETCH_HASH({ state, dispatch }, { flag }) {
		return admin.getHash({ flag }).then(data => data)
	},
	FETCH_LOG(_, { type }) {
		return admin.getLog({ type }).then(data => data)
	},

/* ITEM */
	
	FETCH_ITEMS({ commit }, uid) {
		return item.fetch(uid).then(data => commit('SET_ITEMS', data))
	},
	UPDATE_EQUIP({ commit }, { itemCode, uid}) {
		return item.update(uid, { itemCode }).then(data => data)
	},
	USE_BOX({ commit }, { uid, id, idx}) {
		return item.useBox({ uid, id, idx }).then(data => data)
	},
}

export default actions
