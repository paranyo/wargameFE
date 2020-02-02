import { setting, auth, notice, user, tag, challenge, prob, rank, admin, item, shop, auction } from '../api'

const actions = {
	LOGIN({ commit }, { id, pw }) {
		return auth.login(id, pw)
			.then(({ accessToken, advancedToken, user, isAdmin }) => {
				commit('LOGIN', { accessToken, advancedToken, user, isAdmin })
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
	FETCH_MYCORRECT({ commit }) {
		return user.fetchCorrect().then(({ user }) => commit("SET_MYCORRECT", user))
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
	UPDATE_USER({ state, dispatch }, { uid, email, money, level, intro, isBan}) {
		return user.update(uid, { email, money, level, intro, isBan }).then((data) => data)
	},
	UPDATE_MYSTATUS({ state, dispatch }, { curPW, newPW, intro }) {
		return user.updateSelf({ curPW, newPW, intro })
	},
	/* 모든 유저의 정보를 가져온다 */
	FETCH_USERS_INFO({ commit }) {
		return admin.getUsers().then(data => data)
	},

	// User Main
	FETCH_NOTICE({ commit }) {
		return notice.fetch().then(data => commit('SET_NOTICE', data))
	},
	ADD_NOTICE({ state, dispatch }, { title, description, isOpen }) {
		return notice.create({ title, description, isOpen })
	},
	UPDATE_NOTICE({ state, dispatch }, { id, title, description, isOpen }) {
		return notice.update({ id, title, description, isOpen })
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
	CLEAR_EQUIP() {
		return item.clearEquip().then(data => data)
	},
	USE_BOX({ commit }, { uid, id, idx }) {
		return item.useBox({ uid, id, idx }).then(data => data)
	},

	/* SHOP */
	FETCH_SHOP({ commit }) {
		return shop.fetch().then(data => commit('SET_SHOP', data))
	},
	FETCH_SHOP_ITEMS({ commit }) {
		return shop.fetchItems().then(data => commit('SET_SHOP_ITEMS', data))
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
	/* SETTING */
	FETCH_SETTING({ commit }) {
		return setting.fetch().then(data => commit('SET_SETTINGS', data))
	},
	ADD_SETTING(_, { name, value }) {
		return setting.create({ name, value })
	},
	UPDATE_SETTING({ dispatch }, { name, value }) {
		return setting.update({ name, value }).then(() => dispatch('FETCH_SETTING'))
	},
}

export default actions
