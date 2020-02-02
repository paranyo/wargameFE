import { setAuthInHeader } from '../api'

const mutations = {
	LOGIN (state, { accessToken, advancedToken, user, isAdmin }) {
		if(!accessToken) return
			state.accessToken				 = accessToken
			localStorage.accessToken = accessToken
			if(typeof advancedToken !== null) {
				state.advancedToken				 = advancedToken
				localStorage.advancedToken = advancedToken
			}
			if(isAdmin == true) {
				state.isAdmin				 = isAdmin
				localStorage.isAdmin = isAdmin
			}
			setAuthInHeader(accessToken)
	},
	LOGOUT (state) {
		setAuthInHeader()
		state.accessToken = null
		state.advancedToken = null
		state.isAdmin = null
		localStorage.clear()
	},
	SET_FILES (state, file) {
		state.files = file.map(f => f)
	},
	SET_SHOP_ITEMS(state, item) {
		state.shopItems = item.map(i => i)
	},
	SET_USERS (state, user) {
		state.users = user.map(u => u)
	},
	SET_ONEUSER (state, user) {
		state.user = user.map(p => p)
	},
	SET_MYINFO (state, user) {
		state.myInfo = user
	},
	SET_MYCORRECT (state, user) {
		state.correct = user.map(c => c)
	},
	SET_NOTICE (state, notice) {
		state.notice = notice.map(post => post)
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
	SET_IS_ADD_NOTICE(state, toggle) {
		state.isAddNotice = toggle
	},
	SET_IS_ADD_SHOP(state, toggle) {
		state.isAddShop = toggle
	},
	SET_IS_CHANGE_PASSWORD(state, toggle) {
		state.isChangePassword = toggle
	},
	SET_IS_ADD_SETTING(state, toggle) {
		state.isAddSetting = toggle
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
	},

	/* ITEM */
	SET_ITEMS(state, { items }) {
		state.items = items.map(i => i)
	},
	/* SHOP */
	SET_SHOP(state, { shop }) {
		state.shop = shop.map(s => s)
	},
	SET_PRODUCT(state, { shop }) {
		state.product = shop
	},
	/* AUCTION */
	SET_IS_ADD_AUCTION(state, toggle) {
		state.isAddAuction = toggle
	},
	SET_AUCTION(state, auction) {
		state.auction = auction
	},
	SET_SETTINGS(state, { settings }) {
		state.settings = settings.map(s => s)
	},
	SET_RETURNPATH(state, path) {
		state.returnPath = path ? path : ''
	},
	SET_BACK_COLOR(state, color) {
		state.backColor = color
	},
}

export default mutations
