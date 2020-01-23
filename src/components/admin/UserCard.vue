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
      <p class="card-text small text-muted">{{ user.intro ? user.intro : 'No Intro' }}</p>
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
		getAgo(ls) {
			let t = Math.floor((new Date() - new Date(ls)) / 1000)
			if((t / 86400) >= 365)
			  if((t / 86400) == 1)  return Math.floor((t / (24 * 60 * 60)) / 365) + ' year ago'
			  else                  return Math.floor((t / (24 * 60 * 60)) / 365) + ' years ago'
			if((t / 86400) >= 30)
			  if((t / 86400) == 1)  return Math.floor((t / (24 * 60 * 60)) / 30) + ' month ago'
			  else                  return Math.floor((t / (24 * 60 * 60)) / 30) + ' months ago'
			if((t / 86400) >= 1)
			  if((t / 86400) == 1)  return Math.floor(t / 86400) + ' day ago'
			  else                  return Math.floor(t / 86400) + ' days ago'
			if(((t % 86400) / 3600) >= 1)
			  if(((t % 86400) / 3600) == 1) return Math.floor((t % 86400) / 3600) + ' hour ago'
			  else                          return Math.floor((t % 86400) / 3600) + ' hours ago'
			if(((t % 3600) / 60) >= 1)
			  if(((t % 3600) / 60) == 1)  return Math.floor((t % 3600) / 60) + ' minute ago'
			  else                        return Math.floor((t % 3600) / 60) + ' minutes ago'
			return t + 60 +  ' seconds ago'
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
