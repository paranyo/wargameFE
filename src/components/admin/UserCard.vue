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
			<router-link :to="`/user/${user.uid}`" class="btn btn-primary">상세 정보</router-link>
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
.card > div {
	padding: .4rem;
}
.card-item {
  background-color: #fff;
  border-radius: 3px;
  margin: 8px;
  padding: 6px 20px 2px 8px;
  box-shadow: 0 1px 0 #ccc;
  position: relative;
}
.card-item a {
  text-decoration: none;
  color: #444;
  word-wrap: break-word;
  white-space: normal;
  overflow: hidden;
  display: block;
}
.card-item:hover,
.card-item:focus {
  background-color: rgba(0,0,0, .1);
  cursor: pointer;
}
.card-item-meta {
  font-size: 26px;
  padding: 5px 0 0 3px;
  color: #8c8c8c;  
}
.delete-card-btn {
  position: absolute;
  right: 10px;
  top: 4px;
  text-decoration: none;
  font-size: 18px;
  color: #aaa;
}
.card-body {
	padding: 0.8rem;
}
</style>
