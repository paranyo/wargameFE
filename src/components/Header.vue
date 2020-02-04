<template>
	<b-container fluid class="fixed-top">
		<b-row>
			<b-col cols="6">
				<router-link class="headBtn" to="/">Main</router-link>
				<router-link class="headBtn" to="/ranking">Ranking</router-link>
				<router-link class="headBtn" to="/challenge">Challenge</router-link>
				<router-link class="headBtn" to="/shop">Shop</router-link>
				<router-link class="headBtn" to="/auction">Auction</router-link>
			</b-col>
			<b-col cols="6" class="text-right btnList">
				<div v-if="myInfo && isAuthenticated" style="display: inline">
					<router-link :to="`/status/${myInfo.uid}`" class="badge badge-primary" style="font-size: 10pt">
						{{ myInfo.nick }}
					</router-link>
					<router-link to="/myCorrect" class="badge badge-warning" style="font-size: 10pt">{{ myInfo.score }}pt</router-link>
					<a href="#" class="badge badge-info" style="font-size: 10pt">{{ myInfo.money }}<i class="fab fa-viacoin"></i></a>
				</div>
				<div v-else>
		    	<router-link class="headBtn" to="/login" style="font-size: 12pt">Sign In</router-link>
			  	<router-link class="headBtn" to="/Join" style="font-size: 12pt">Sign Up</router-link>
				</div>
				<b-badge class="logout" variant="danger" v-if="isAuthenticated" @click="logout">Logout</b-badge>
				<router-link to="/settings"	v-if="isAdmin" href="#" class="badge badge-secondary"><i class="fas fa-wrench"></i></router-link>
			</b-col>
		</b-row>
	</b-container>
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
			return localStorage.isAdmin
		},
	},
	created() {
		if(this.$store.getters.isAuthenticated) {
			this.FETCH_MYINFO()
		}
	},
	methods: {
		...mapActions(['FETCH_MYINFO']),
		logout() {
			if(confirm('로그아웃 하시겠습니까?'))
				this.$router.push('/login')
		},
	},
}
</script>
<style scoped>
.headBtn {
	padding: 0px 10px;
	font-size: 12pt;
	color: #666666;
}
.headBtn:hover {
	text-decoration: underline;
}
.logout:hover {
	cursor: pointer;
}
.btnList > * {
	font-size: 10pt;
}
</style>
