<template>
  <div class="card">
		<div class="card-header">
			<span v-if="user.deletedAt" class="badge badge-pill badge-danger">Banned</span>
			<span v-if="user.level == 'chore'" class="badge badge-pill badge-info">Admin</span>
			<span v-else class="badge badge-pill badge-warning">User</span>
			<span class="badge badge-pill badge-secondary">{{ user.score }}pt</span>
		</div>
		<div class="card-body">
      <h5 class="card-title"><span class="small">Lv. {{ user.level }}</span>&nbsp; {{ user.uid }}</h5>
      <p class="card-text"><code>Join => {{ getAgo(user.createdAt) }}</code></p>
		</div>
		<div class="card-footer">
			<router-link :to="`/settings/user/${user.uid}`" class="btn btn-sm btn-primary">상세 정보</router-link>
      <button v-if="!user.deletedAt" class="btn btn-danger btn-sm" @click="Ban">차단</button>
      <button v-else href="#" class="btn btn-primary btn-sm" @click="Ban">해제</button>
			<router-link :to="`/settings/user/${user.uid}`" class="btn btn-sm btn-info">기록</router-link>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
	props: ['user'],
	methods: {
		...mapActions([
			'UPDATE_USER',
		]),
		getAgo(time) {
			let t = Math.floor((new Date() - new Date(time)) / 1000)
			let c = 0
			let m = ['s', 'mins', 'hrs', 'd']
			while(t > 59) {
				t = Math.floor(t / 60)
				if(c == 2)
					break
				c++
			}
			let d = 0
			if(c == 2 && t > 23) {
				d = Math.floor(t / 24)
				t = t % 24
			}
			if(isNaN(t))
				return 'no data'
			if(d != 0 && t != 0)
				return d + m[c + 1] + ' ' + t + m[c] + ' ago'
			else if(d != 0)
				return d + m[c + 1] + ' ago'
			else
				return t + m[c] + ' ago'
		},
		Ban() {
			const uid = this.user.uid
			const isBan = !this.user.deletedAt
			const reason = window.prompt('reason', )
			this.UPDATE_USER({ uid, isBan, reason })
		}
	}
}
</script>
<style scoped>
</style>
