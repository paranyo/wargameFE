import axios from 'axios'
import router from '../router'

const domain = 'https://wargame2.run.goorm.io'
const Unauthorized = 401
const onUnauthorized = () => {
	router.push(`/login?returnPath=${ encodeURIComponent(location.pathname) }`)
}

const request = {
	get(path) {
		return axios.get(`${ domain + path }`)
			.catch(({ response }) => {
				const { status } = response
				if (status === Unauthorized) return onUnauthorized()
				throw Error(response)
			})
	},
	post(path, data) {
		return axios.post(`${ domain + path }`, data)
	},
	put(path, data) {
		return axios.put(`${ domain + path }`, data)
			.catch(({ response }) => {
				const { status } = response
				if (status == 400) return response
			})
	}
}

export const setAuthInHeader = token => {
	axios.defaults.headers.common['Authorization'] = token ? `${ token }` : null;
}

export const auth = {
	login(id, pw) {
		return request.post('/user/login', { id, pw })
			.then(({ data }) => data)
	},
	join(id, nick, email, pw) {
		return request.post('/user/join', { id, nick, email, pw })
			.then(({ data }) => data)
	},
	sendMail(uid, email) {
		return request.post('/user/sendMail', { uid, email})
			.then(({ data }) => data)
	},
}

export const tag = {
	fetch() {
		return request.get('/tags').then(({ data }) => data)
	},
	create (title) {
		return request.post('/manage/tag/create', { title }).then(({ data }) => data)
	},
	update(title, data) {
		return request.put(`/manage/tag/update/${title}`, data).then(({ data }) => data)
	}
}

export const prob = {
	fetch(tags) {
		if(tags)
			return request.post('/probs', tags).then(({ data }) => data)
		else
			return request.post('/probs').then(({ data }) => data)
	},
	fetchOne(id) {
		if(id)
			return request.get(`/probs/${id}`).then(({ data }) => data)
	},
	create (data) {
		return request.post(`/manage/prob/create`, data).then(({ data }) => data)
	},
	update(id, data) {
		if(data.title != null)
			return request.put(`/manage/prob/${id}`, data).then(({ data }) => data)
		else
			return request.put('/manage/prob/visible', data).then(({ data }) => data)
	},
	auth(id, data) {
		return request.post(`/auth/${id}`, data).then(({ data }) => data)
	},
}

export const user = {
	fetch(uid) {
		if(uid) {
			return request.get(`/user/${uid}`).then(({ data }) => data)
		} else {
			return request.get('/user').then(({ data }) => data)
		}
	},
	fetchInfo() {
		return request.get('/myinfo').then(({ data }) => data)
	},

	update(uid, data) {
		return request.put(`/user/${uid}`, data).then(({ data }) => data)
	}
}

export const admin = {
	getHash(data) {
			return request.post('/manage/hash', data).then(({ data }) => data)
	},
	getLog(data) {
		return request.post('/manage/log', data).then(({ data }) => data)
	},
}

export const rank = {
	fetch() {
		return request.get('/ranking').then(({ data }) => data)
	}
}

export const item = {
	fetch() {
		return request.get('/item/hair').then(({ data }) => data)
	},
	update(data) {
		return request.post('/item/equip', data).then(({ data }) => data)
	},
}
