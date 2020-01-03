import { auth, notice, user, tag, challenge, prob, rank, admin, item, shop, auction } from '../api'

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

	// User Main
	FETCH_NOTICE({ commit }) {
		return notice.fetch().then(data => commit('SET_NOTICE', data))
	},
	ADD_NOTICE({ state, dispatch }, { title, description, isOpen }) {
		return notice.create({ title, description, isOpen })
	},
	UPDATE_NOTICE({ state, dispatch }, { id, title, description }) {
		return notice.update({ id, title, description })
	},
	REMOVE_NOTICE(_, { id }) {
		return notice.remove(id)
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
	ADD_PROB({ state, dispatch }, { title, description, author, score, flag, isOpen, tagId, fileId, src }) {
		return prob.create({ title, description, author, score, flag, isOpen, tagId, fileId, src })
	},
	UPDATE_PROB({ state, dispatch }, { id, title, description, author, score, flag, isOpen, tagId, fileId, src }) {
		return prob.update(id, { id, title, description, author, score, flag, isOpen, tagId, fileId, src })
	},

	/* AUTH PROB */
	AUTH_PROB({ state, dispatch }, { id, flag, rFlag }) {
		return prob.auth(id, { flag, rFlag }).then(({ result }) => result)
	},

	FETCH_HASH({ state, dispatch }, { flag }) {
		return admin.getHash({ flag }).then(data => data)
	},
	FETCH_LOG(_, { type }) {
		return admin.getLog({ type }).then(data => data)
	},

	/* FILE */
	GET_FILE(_, fName) {
		return user.getFile(fName)
	},
	FETCH_FILES({ commit }) {
		return admin.getFile().then(data => commit('SET_FILES', data))
	},
	REMOVE_FILE(_, { id }) {
		return admin.removeFile({ id })
	},
/* ITEM */
	
	FETCH_ITEMS({ commit }) {
		return item.fetch().then(data => commit('SET_ITEMS', data))
	},
	UPDATE_EQUIP({ commit }, { itemCode, uid}) {
		return item.update(uid, { itemCode }).then(data => data)
	},
	USE_BOX({ commit }, { uid, id, idx}) {
		return item.useBox({ uid, id, idx }).then(data => data)
	},

	/* SHOP */
	FETCH_SHOP({ commit }) {
		return shop.fetch().then(data => commit('SET_SHOP', data))
	},
	FETCH_PRODUCT({ commit }, { idx }) {
		return shop.fetch(idx).then(data => commit('SET_PRODUCT', data))
	},
	REMOVE_SHOP(_, { id }) {
		return shop.remove(id)
	},
	ADD_SHOP({ state, dispatch }, { pdCode, price, pdCount, deadLine, description }) {
		return shop.create({ pdCode, price, pdCount, deadLine, description })
	},
	UPDATE_SHOP(_, { id, pdCode, price, pdCount, deadLine, description }) {
		return shop.update(id, { pdCode, price, pdCount, deadLine, description })
	},
	BUY_PRODUCT(_, { pId }) {
		return shop.buy(pId)
	},

	/* AUCTION */
	FETCH_AUCTION({ commit }) {
		return auction.fetch().then(data => commit("SET_AUCTION", data))
	},
	ADD_AUCTION(_, { price, end, itemId }) {
		return auction.create({ price, end, itemId })
	},
	BIDDING(_, { id, cost }) {
		return auction.bidding({ id, cost })
	},
}

export default actions
