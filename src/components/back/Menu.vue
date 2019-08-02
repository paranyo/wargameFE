<template>
	<div v-if="!isManaging">
		<router-link to="/ranking">
			<button type="button" class="btn btn-outline-success">랭킹</button>
		</router-link>
		<router-link to="/management">
			<button type="button" class="btn btn-outline-secondary" @click="managing">관리</button>
		</router-link>
		<button 
			v-if="isAuth" type="button" class="btn btn-outline-danger" @click="logout">로그아웃
		</button>
		<router-link v-else to="/login">
			<button type="button" class="btn btn-outline-primary">로그인</button>
		</router-link>
	</div>
	<div v-else>
		<button type="button" class="btn btn-outline-secondary" @click="managing">전환</button>
		<router-link to="/management">
			<button type="button" class="btn btn-dark">관리홈</button>
		</router-link>
		<router-link to="/user">
			<button type="button" class="btn btn-dark">유저</button>
		</router-link>
		<router-link to="/manage/challenge">
			<button type="button" class="btn btn-dark">문제</button>
		</router-link>
	</div>
</template>
<script>
export default {
	data() {
		return {
			isManaging: false
		}
	},
	props: ['isAuth'],
	methods: {
		logout() {
			this.$store.commit('LOGOUT')
			this.$router.push('/login')
		},
		managing() {
			this.isManaging = !this.isManaging
		}
	}
}
</script>
