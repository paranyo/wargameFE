import axios from 'axios'
import router from '../router'
const domain = 'https://wargame2.run.goorm.io'
const Unauthorized = 401
const Forbidden		 = 403
const ServerError	 = 500
const onUnauthorized = () => {
	router.push(`/login?returnPath=${ encodeURIComponent(location.pathname) }`)
}
const onForbidden = () => {
	router.push('/Sorry')
}
const onServerError = () => {
	router.push('/OhMyGod')
}
const request = {
	get(path) {
		return axios.get(`${ domain + path }`)
			.catch(({ response }) => {
				const { status } = response
				if (status === Unauthorized) return onUnauthorized()
				if (status === Forbidden)		 return onForbidden()
				if (status === ServerError)return onServerError()
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
export const notice = {
	fetch() {
		return request.get('/notice').then(({ data }) => data)
	},
	create(data) {
		return request.post('/notice/create', data).then(({ data }) => data)
	},
	update(data) {
		return request.put('/notice/update', data).then(({ data }) => data)
	},
	remove(id) {
		return request.get(`/notice/remove/${id}`).then(({ data }) => data)
	}
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
	fetchCorrect() {
		return request.get('/myCorrect').then(({ data }) => data)
	},
	update(uid, data) {
		return request.put(`/user/${uid}`, data).then(({ data }) => data)
	},
	updateSelf(data) {
		return request.put('/user', data).then(({ data }) => data)
	},
	getFile(fName) {	// 미사용. 보류
		return request.get(`/download/${fName}`, { responseType: "blob" })
			.then((res) => {
				const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['Content-Type'] }))
				const link = document.createElement('a')
				link.href = url
				const filename = res.headers.filename
				link.setAttribute('downloads', filename)
				document.body.appendChild(link)
				link.click()
			}).catch((error) => {
				console.error(error)
			})
	}
}
export const admin = {
	getHash(data) {
			return request.post('/manage/hash', data).then(({ data }) => data)
	},
	getLog(data) {
		return request.post('/manage/log', data).then(({ data }) => data)
	},
	getFile() {
		return request.get('/manage/file').then(({ data }) => data)
	},
	removeFile(data) {
		return request.put('/manage/file/remove', data).then(({ data }) => data)
	},
	getUsers() {
		return request.get('/manage/user').then(({ data }) => data)
	},
}
export const rank = {
	fetch() {
		return request.get('/ranking').then(({ data }) => data)
	}
}
export const item = {
	fetch() {
		return request.get('/item').then(({ data }) => data)
	},
	update(uid, data) {
		return request.post(`/item/equip/${uid}`, data).then(({ data }) => data)
	},
	clearEquip() {
		return request.get('/item/clearEquip').then(({ data }) => data)
	},
	useBox(data) {
		return request.post('/item/box', data).then(({ data }) => data)
	},
}
export const shop = {
	fetch(id) {
		if(id)
			return request.get(`/shop/${id}`).then(({ data }) => data)
		else
			return request.get('/shop').then(({ data }) => data)
	},
	fetchItems() {
		return request.get('/manage/shop').then(({ data }) => data)
	},
	create (data) {
		return request.post('/manage/shop/create', data).then(({ data }) => data)
	},
	update (id, data) {
		return request.post(`/manage/shop/update/${id}`, data).then(({ data }) => data)
	},
	remove(id) {
		return request.put(`/manage/shop/remove/${id}`).then(({ data }) => data)
	},
	buy(pId) {
		return request.get(`/shop/buy/${pId}`).then(({ data }) => data)
	},
}
export const auction = {
	fetch() {
		return request.get('/auction').then(({ data }) => data)
	},
	create (data) {
		return request.post('/auction/create', data).then(({ data }) => data)
	},
	bidding(data) {
		return request.post('/auction/bid', data).then(({ data }) => data)
	},
}
export const setting = {
	fetch() {
		return request.get('/setting').then(({ data }) => data)
	},
	create(data) {
		return request.post('/manage/setting/create', data).then(({ data }) => data)
	},
	update(data) {
		return request.post('/manage/setting/update', data).then(({ data }) => data)
	}
}
