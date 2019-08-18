<template>
  <div class="card">
		<div class="card-header">
			<span v-if="user.deletedAt" class="badge badge-pill badge-danger">Banned</span>
			<span v-if="user.level == 'chore'" class="badge badge-pill badge-info">Admin</span>
			<span v-else class="badge badge-pill badge-warning">User</span>
		</div>
		<div class="card-body">
      <h5 class="card-title"><span class="small">Lv. {{ user.level }}</span>&nbsp; {{ user.uid }}</h5>
      <p class="card-text">가입: {{ user.createdAt }}</p>
		</div>
		<div class="card-footer">
			<router-link :to="`/settings/user/${user.uid}`" class="btn btn-primary">상세 정보</router-link>
      <button v-if="!user.deletedAt" href="#" class="btn btn-danger" @click="Ban">차단</button>
      <button v-else href="#" class="btn btn-primary" @click="Ban">해제</button>
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
		Ban() {
			const uid = this.user.uid
			const isBan = !this.user.deletedAt
			const nick = this.user.nick
			window.prompt('reason', )
			this.UPDATE_USER({ uid, nick, isBan })
		}
	}
}
</script>
<style scoped>
</style>
