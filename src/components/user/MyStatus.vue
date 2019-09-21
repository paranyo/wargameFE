<template>
	<b-container fluid class="pt-5 mx-auto w-75">
		<b-row>
			<b-col md=4>
				{{ myCharacter }}
		    <b-card :img-src='`https://maplestory.io/api/character/${this.myCharacter},{"itemId":2000,"region":"KMS","version":"latest"},{"itemId":12000,"region":"KMS","version":"latest"}/stand1/0?showears=false&showLefEars=false&showHighLefEars=undefined&resize=1&name=&flipX=undefined`' img-alt="Image" img-top class="h-100"
					style="margin: 0 auto; width: 150px;">
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
				<b-jumbotron>
					<p class='items-nav'>Hair</p>
					<hr class="my-1">
					<div class="items" v-if="item.cCode==1" v-for="item in items" :key="`${item.itemCode}`"
						v-b-popover.hover.top="`${item.item.name}`" @click="changeItem(item.itemCode)">
						<img :src="`https://icons.maplestory.io/api/KMS/323/item/${item.itemCode}/icon`" />
					</div>
					<p class='items-nav'>Eye</p>
					<hr class="my-1">
					<div class="items" v-if="item.cCode==2" v-for="item in items" :key="`${item.itemCode}`"
						v-b-popover.hover.top="`${item.item.name}`" @click="changeItem(item.itemCode)">
						<img :src="`https://icons.maplestory.io/api/KMS/323/item/${item.itemCode}/icon`" />
					</div>
			  </b-jumbotron>
			</b-col>
		</b-row>
			  </b-jumbotron>
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
			hair: '',
			myCharacter: '',
		}
	},
	created() {
		this.$nextTick(() => { 
			this.inputIntro = this.myInfo.intro
			this.myCharacter += this.myInfo.items.map((i) => {
				return JSON.stringify({ itemId: i.itemCode, region: "KMS" })
			})
		})
		this.FETCH_ITEMS()
	},
	computed: {
		...mapState({
			myInfo: 'myInfo',
			isChangePassword: 'isChangePassword',
			items: 'items'
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
			'FETCH_ITEMS',
			'UPDATE_EQUIP',
		]),
		changeItem(id) {
			this.UPDATE_EQUIP({ itemCode: id }).then((data) => {
				this.myCharacter = ''
				this.FETCH_MYINFO().then(() => {
					this.myCharacter += this.myInfo.items.map((i) => {
						return JSON.stringify({ itemId: i.itemCode, region: "KMS" })
					})
				})
			})
		},
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
.row {
	margin-bottom: 10px;
}
.items {
	border: 2px solid #d4d4d4;
	border-radius: 6px;
	padding: 16px 10px;
  display: inline-block;
  background: linear-gradient(#868686, #ffffff);
}
.jumbotron {
	max-height: 300px;
	text-align: center;
  margin: 0 auto;
	padding: 15px 10px;
	overflow-y: scroll;
}
.items > img {
	width: 40px;
	height: 30px;
}
.items-nav {
	text-align: left;
	font-size: 16pt;
	font-weight: bolder;
	margin-left: 10px;
	margin-bottom: 0;
}
</style>
