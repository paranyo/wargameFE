<template>
	<div class="container-fluid">
		<span v-if="myStatus" class="small alert">&plus; {{myStatus.nick}}님 환영합니다!</span>
		<div class="page-div py-3 text-center">
			<div class="center-block">
				<p><h2 @click="home">Soonchunhyang Wargame</h2></p>
			</div>
			<hr class="my-4">
			<Menu :isAuth="isAuthenticated"/>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import Menu from './Menu'
export default {
	components: { Menu },
	computed: {
		...mapState({
			myStatus: 'myStatus'
		}),
		isAuthenticated() {
			return this.$store.getters.isAuthenticated
		}
	},
	methods: {
		logout() {
			this.$store.commit('LOGOUT')
			this.$router.push('/login')
		},
		home() {
			this.$router.push('/')
		}
	}
}
</script>

<style scoped>
.alert {
	animation: fadeOut 2s;
	opacity: 0;
}

@keyframes fadeOut {
	0% { opacity: 1; }
  99% { opacity: 0.01;width: 100%; height: 100%;}
  100% { opacity: 0;width: 0; height: 0;}
}

</style>
