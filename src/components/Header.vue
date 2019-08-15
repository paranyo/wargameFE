<template>
	<div class="container-fluid fixed-top">
		<div class="row">
			<div class="col-md-6">
				<router-link class="headBtn" to="/">Main</router-link>
				<router-link class="headBtn" to="/ranking">Ranking</router-link>
				<router-link class="headBtn" to="/challenge">Challenge</router-link>
			</div>
			<div class="col-md-6 text-right">
				<div v-if="user && isAuthenticated" style="display: inline">
					<a href="#" class="badge badge-primary">{{ user.nick }}</a>
					<a href="#" class="badge badge-warning">{{ user.money }}pt</a>
					<a href="#" class="badge badge-info">{{ user.money }}<i class="fab fa-viacoin"></i></a>
				</div>
				<router-link class="badge badge-danger" v-if="isAuthenticated" to="/login">Logout</router-link>
				<a v-if="isAdmin" href="#" class="badge badge-secondary"><i class="fas fa-wrench"></i></a>
				<div v-else>
		    	<router-link class="headBtn" to="/login">Sign In</router-link>
		    	<router-link class="headBtn" to="/Join">Sign Up</router-link>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md">
				<hr class="my-1" />
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
	computed: {
		...mapState({
			user: 'user',
		}),
		isAuthenticated() {
			return this.$store.getters.isAuthenticated
		},
		isAdmin() {
			return this.$store.getters.isAdmin
		},
	},
	created() {
		this.FETCH_MYINFO()
	},
	methods: {
		...mapActions(['FETCH_MYINFO']),
	},
}
</script>
<style scoped>
.headBtn {
	padding: 0px 10px;
	font-size: 14px;
	color: #666666;
}
.headBtn:hover {
	text-decoration: underline;
}
</style>
