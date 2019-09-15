<template>
	<modal class="modal-card">
		<div slot="header"></div>
		<div slot="body">
			<b-row class="form-group">
				<b-col>
					<div class="input-group">
					  <div class="input-group-prepend">
			        <div class="input-group-text">ID</div>
					  </div>
						<input class="form-control" type="text" placeholder='UID' v-model="user.uid" readonly>
					</div>
				</b-col>
				<b-col>
					<div class="input-group">
					  <div class="input-group-prepend">
			        <div class="input-group-text">NICK</div>
					  </div>
						<input class="form-control" type="text" placeholder='Nickname' v-model="nick">
					</div>
				</b-col>
			</b-row>
			<b-row class="form-group">
				<b-col>
					<div class="input-group">
					  <div class="input-group-prepend">
			        <div class="input-group-text">E-MAIL</div>
					  </div>
						<input class="form-control" type="text" placeholder='E-MAIL' v-model="email"
							style="text-align: right">
					</div>
				</b-col>
				<b-col>
					<div class="input-group">
					  <div class="input-group-prepend">
			        <div class="input-group-text">IPv4 Address</div>
					  </div>
						<input class="form-control" type="text" placeholder='ip' v-model="ip">
					</div>
				</b-col>
			</b-row>
			<b-row class="form-group" align-h="start">
				<b-col cols="4" md="4">
					<div class="input-group">
					  <div class="input-group-prepend">
			        <div class="input-group-text">$</div>
					  </div>
						<input class="form-control" type="text" placeholder='money' v-model="money"
							style="text-align: right">
					</div>
				</b-col>
				<b-col cols="4" md="4">
		      <div class="input-group mb-2">
					  <div class="input-group-prepend">
			        <div class="input-group-text">Lv.</div>
					  </div>
						<input class="form-control" type="text" placeholder='level' v-model="level" 
							style="text-align: right">
		      </div>
				</b-col>
				<b-col>
		      <div class="input-group mb-2">
					  <div class="input-group-prepend">
			        <div class="input-group-text">Score</div>
					  </div>
						<input style="text-align: right" class="form-control" type="text" placeholder="Score" 
							readonly :value="user.score">
					</div>
				</b-col>
			</b-row>
			<b-row class="form-group" align-h="start">
				<b-col cols="12">
					<div class="input-group">
						<div class="input-group-prepend">
							<div class="input-group-text">INTRO</div>
						</div>
						<input class="form-control" type="text" placeholder="Introduce" v-model="intro"
							style="text-align: right;">
					</div>
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
			email: '',
			money: 0,
			level: '',
			intro: '',
		}
	},
	computed: {
		...mapState({
			user: 'user'
		}),
		invalidForm() {
			return !this.nick || !this.ip || !this.level || !this.email
		}
	},
	created() {
		this.FETCH_ONEUSER(this.$route.params.uid)
		.then(() => {
			this.ip		 = this.user.ip
			this.nick	 = this.user.nick
			this.level = this.user.level
			this.money = this.user.money
			this.email = this.user.email
			this.intro = this.user.intro
		})
	},
	methods: {
		...mapActions([
			'FETCH_ONEUSER',
			'UPDATE_USER',
			'FETCH_USERS',
		]),
		onSubmitForm() {
			const	ip		= this.ip.trim()
			const nick	= this.nick.trim()
			const level = this.level.trim()
			const email	= this.email.trim()
			const money = parseInt(this.money)
			const intro = this.intro.trim()
			if(!ip || !nick || !level) return
			this.UPDATE_USER({ uid: this.$route.params.uid, ip, nick, level, money, email, intro })
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
