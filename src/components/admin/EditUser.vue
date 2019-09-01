<template>
	<modal class="modal-card">
		<div slot="header"></div>
		<div slot="body">
			<b-row class="form-group">
				<input class="form-control" type="text" placeholder='Nickname' v-model="nick">
			</b-row>
			<b-row class="form-group">
				<input class="form-control" type="text" placeholder='ip' v-model="ip">
			</b-row>
			<b-row class="form-group" align-h="start">
				<b-col cols="4" md="6">
					<div class="input-group">
						<input class="form-control" type="text" placeholder='money' v-model="money">
					  <div class="input-group-append">
			        <div class="input-group-text">$</div>
					  </div>
					</div>
				</b-col>
				<b-col cols="4" md="6">
					<input class="form-control" type="text" placeholder='level' v-model="level">
				</b-col>
			</b-row>
			<b-row>
				<b-button block button-variant="outline-secondary" @click="onSubmitForm" @keyup.enter="onSubmitForm">
					수정</b-button>
				<b-button block @click="onClickClose">취소</b-button>
			</b-row>
		</div>
	</modal>
</template>
<script>
import Modal from '../Modal.vue'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
	components: {	Modal	},
	data() {
		return {
			nick: '',
			ip: '',
			money: 0,
			level: ''
		}
	},
	computed: {
		...mapState({
			user: 'user'
		}),
		invalidForm() {
			return !this.nick || !this.ip || !this.level
		}
	},
	created() {
		this.FETCH_ONEUSER(this.$route.params.uid)
		.then(() => {
			this.ip		 = this.user.ip
			this.nick	 = this.user.nick
			this.level = this.user.level
			this.money = this.user.money
		})
	},
	methods: {
		...mapActions([
			'FETCH_ONEUSER',
			'UPDATE_USER',
			'FETCH_USERS',
		]),
		onSubmitForm() {
			const	ip = this.ip.trim()
			const nick = this.nick.trim()
			const level = this.level.trim()
			const money = parseInt(this.money)
			if(!ip || !nick || !level) return
			this.UPDATE_USER({ uid: this.$route.params.uid, ip, nick, level, money })
				.then(() => { this.$router.push('/settings/user')	})

		},
		onClickClose() {
			this.$router.push('/settings/user')
		},
	}
}
</script>
<style scoped>
</style>
