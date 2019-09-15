<template>
	<b-container fluid class="pt-5 mx-auto w-75">
		<b-row>
			<b-col md=4>
		    <b-card img-src="https://placekitten.com/g/300/450" img-alt="Image" img-top class="h-100">
	  	    <div slot="footer" style="text-align: center;">
						Lv. <small class="text-muted">{{ myInfo.level }}</small>
					</div>
		    </b-card>
			</b-col>
			<b-col md=8>
				<b-row>
					<b-col md="6">
						<div class="input-group">
							<div class="input-group-prepend">
								<div class="input-group-text">ID</div>
							</div>
							<input class="form-control" type="text" placeholder="UID" :value="myInfo.uid" readonly>
						</div>
					</b-col>
					<b-col md="6">
						<div class="input-group">
							<div class="input-group-prepend">
								<div class="input-group-text">Nickname</div>
							</div>
							<input class="form-control" type="text" placeholder="UID" :value="myInfo.nick" readonly>
						</div>
					</b-col>
				</b-row>
				<b-row>
					<b-col md="12">
						<div class="input-group">
							<div class="input-group-prepend">
								<div class="input-group-text">Mail</div>
							</div>
							<input class="form-control" type="text" placeholder="E-MAIL" :value="myInfo.email" readonly>
						</div>
					</b-col>
				</b-row>
				<b-row>
					<b-col md="12">
						<div class="input-group">
							<div class="input-group-prepend">
								<div class="input-group-text">IPv4</div>
							</div>
							<input class="form-control" type="text" placeholder="IPv4 Address" :value="myInfo.ip" readonly>
						</div>
					</b-col>
				</b-row>
				<b-row>
					<b-col md="12">
						<div class="input-group">
							<input v-if="isEditIntro" class="form-control" type="text"	placeholder="소개글을 입력하세요" 
								v-model="inputIntro" ref="inputIntro"	@keyup.enter="onIntroSubmit">
							<input v-else type="Text" class="form-control" readonly :value="myInfo.intro" 
								@click="onClickIntro" placeholder="소개글을 입력하세요.">
						</div>
					</b-col>
				</b-row>
				<b-row>
					<b-col md=12>
						<div class="input-group">
							<b-button block button-variant="outline-secondary" @click="setChangePassword">비밀번호 변경</b-button>
						</div>
					</b-col>
				</b-row>
			</b-col>
		</b-row>
		<b-row>
			<b-col md=12>
				Solved probs
			</b-col>
		</b-row>
		<ChangePassword v-if="!isChangePassword" />
	</b-container>
</div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import ChangePassword from './ChangePassword.vue'
export default {
	components: { ChangePassword },
	data() {
		return {
			isEditIntro: false,
			inputIntro: '',
		}
	},
	created() {
		this.$nextTick(() => this.inputIntro = this.myInfo.intro)
	},
	computed: {
		...mapState({
			myInfo: 'myInfo',
			isChangePassword: 'isChangePassword',
		}),	
	},
	watch: {
		isChangePassword() {
			if(this.isChangePassword == 2) {
				alert('변경 성공')
				alert('로그인 페이지로 이동합니다')
				this.$store.commit('LOGOUT')
				this.$router.push('/login')
			}
		}
	},
	methods: {
		...mapMutations([
			'SET_IS_CHANGE_PASSWORD',
		]),
		...mapActions([
			'UPDATE_USER',
			'FETCH_MYINFO',
		]),
		setChangePassword() {
			this.SET_IS_CHANGE_PASSWORD(false)
		},
		onClickIntro() {
			this.isEditIntro = true
			this.$nextTick(() => this.$refs.inputIntro.focus())
		},
		onIntroSubmit() {
			if(!this.inputIntro) return
			if(this.inputIntro.length > 33) return alert('32글자까지 입력 가능합니다')
			const uid		= this.myInfo.uid
			const intro = this.inputIntro
			if(intro === this.myInfo.intro) return this.isEditIntro = false

			this.UPDATE_USER({ uid, intro }).then(() => { 
				this.FETCH_MYINFO()
				this.isEditIntro = false
			})
		},
	},
	
}
</script>
<style scoped>
</style>
