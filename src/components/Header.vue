<template>
	<div class="container-fluid fixed-top">
		<div class="row">
			<div class="col-md-6">
				<router-link class="headBtn" to="/">Main</router-link>
				<router-link class="headBtn" to="/ranking">Ranking</router-link>
				<router-link class="headBtn" to="/challenge">Challenge</router-link>
				<router-link class="headBtn" to="/shop">Shop</router-link>
				<router-link class="headBtn" to="/auction">Auction</router-link>
			</div>
			<div class="col-md-6 text-right">
				<div v-if="myInfo && isAuthenticated" style="display: inline">
					<router-link :to="`/status/${myInfo.uid}`" class="badge badge-primary">
						{{ myInfo.nick }}
					</router-link>
					<router-link to="/myCorrect" class="badge badge-warning">{{ myInfo.score }}pt</router-link>
					<a href="#" class="badge badge-info">{{ myInfo.money }}<i class="fab fa-viacoin"></i></a>
				</div>
				<router-link class="badge badge-danger" v-if="isAuthenticated" to="/login">Logout</router-link>
				<router-link to="/settings"
					v-if="isAdmin" href="#" class="badge badge-secondary"><i class="fas fa-wrench"></i></router-link>
				<div v-else>
		    	<router-link class="headBtn" to="/login">Sign In</router-link>
		    	<router-link class="headBtn" to="/Join">Sign Up</router-link>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
	computed: {
		...mapState({
			myInfo: 'myInfo',
		}),
		isAuthenticated() {
			return this.$store.getters.isAuthenticated
		},
		isAdmin() {
			return this.$store.getters.isAdmin
		},
	},
	created() {
		if(this.$store.getters.isAuthenticated) {
			this.FETCH_MYINFO()
		}
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
