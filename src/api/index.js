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
	login(id, pw) { /*
		const title = "세번째 문제띠"
		const description = "엌이게본문"
		const score = "200"
		const author = "paranyo"
		const flag = "SF{QWE}"
		const tags = ['REV', 'MISC', 'PWN']

		const a = request.post('/manage/prob/create', { title, description, score, author, flag, tags }).then(({ data }) => data)
		const ids					= 11
		const title				= "세번째 문제띠"
		const description = "엌이게본문"
		const score				= "220"
		const author			= "paranyo"
		const flag				= "SF{QWE}"
		const tags				= ['REV', 'MISC', 'PWN']
		const isOpen			= "false"

		const a = request.put('/manage/prob/update', { id: ids, title, description, score, author, flag, tags, isOpen }).then(({ data }) => data)
		*/
		return request.post('/user/login', { id, pw })
			.then(({ data }) => data)
	},
	join(id, nick, pw) {
		return request.post('/user/join', { id, nick, pw })
			.then(({ data }) => data)
	}
}


export const tag = {
	fetch() {
		return request.get('/tags').then(({ data }) => data)
	}
}
export const challenge = {
	create (title) {
		return request.post('/manage/chall', { title }).then(({ data }) => data)
	},
	update(cid, data) {
		return request.put(`/manage/chall/${cid}`, data).then(({ data }) => data)
	}
}

export const prob = {
	fetch(id) {
		if(id) 
			return request.get(`/probs/${id}`).then(({ data }) => data)
		else 
			return request.get('/probs').then(({ data }) => data)
	},


	create (cid, data) {
		return request.post(`/manage/prob/${cid}`, data).then(({ data }) => data)
	},
	update(pid, data) {
		return request.put(`/manage/prob/${pid}`, data).then(({ data }) => data)
	},
	auth(pid, data) {
		return request.post(`/auth/${ pid }`, data).then(({ data }) => console.log(data))
	}
}

export const user = {
	fetch(uid) {
		if(uid) {
			return request.get(`/user/${uid}`).then(({ data }) => data)
		}
		return request.get('/user').then(({ data }) => data)
	},

	update(uid, data) {
		return request.put(`/user/${uid}`, data).then(({ data }) => data)
	}
}

export const rank = {
	fetch() {
		return request.get('/ranking').then(({ data }) => data)
	}
}
