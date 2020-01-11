<template>
	<b-container fluid class="pt-5 mx-auto w-75">
		<b-row style="height: 250px;">
			<b-col md=4 style="height: 100%;"><!--
		    <b-card :img-src='`https://maplestory.io/api/character/${this.myCharacter},{"itemId":2000,"region":"KMS","version":"323"},{"itemId":12000,"region":"KMS","version":"323"}/stand1/0?showears=false&showLefEars=false&showHighLefEars=undefined&resize=1&name=&flipX=undefined`' img-alt="Image" img-top class="h-100"
					style="margin: 0 auto; width: 150px;">
	  	    <div slot="footer" style="text-align: center;">
						Lv. <small class="text-muted">{{ myInfo.level }}</small>
					</div>
		    </b-card>-->
				<b-card no-body class="overflow-hidden" style="width: 100%; height:100%;">
					<b-row no-gutters style="height: 100%;background: url(https://mblogthumb-phinf.pstatic.net/20140608_176/monhog_1402164204467rvtNT_PNG/%C7%EC%B3%D7%BE%EE%B6%B2%C1%FD.png?type=w2) no-repeat;text-align: center;background-position: -200px -120px;">
						<b-col md="6" style="text-align: center;" v-bind:style="{ height: colHeight }">
			      	<b-card-img :src='`https://maplestory.io/api/character/${this.myCharacter},{"itemId":2000,"region":"KMS","version":"323"},{"itemId":12000,"region":"KMS","version":"323"}/stand1/0?showears=false&showLefEars=false&showHighLefEars=undefined&resize=1&name=&flipX=undefined`' class="rounded-0" style="width: auto;"></b-card-img>
			      </b-col>
      			<b-col md="6">
			        <b-card-body :title="myInfo.nick">
      			    <b-card-text>
									{{ myInfo.level }}
      			    </b-card-text>
			        </b-card-body>
      			</b-col>
			    </b-row>
			  </b-card>
			</b-col>
			<b-col md=8>
				<b-row>
					<b-col md="3">
				    <b-input-group prepend="ID" class="mb-2 mr-sm-2 mb-sm-0">
				      <b-input type="text" placeholder="UID" :value="myInfo.uid" readonly></b-input>
				    </b-input-group>
					</b-col>
					<b-col md="3">
				    <b-input-group prepend="Nickname" class="mb-2 mr-sm-2 mb-sm-0">
				      <b-input type="text" placeholder="NICKNAME" :value="myInfo.nick" readonly></b-input>
				    </b-input-group>
					</b-col>
					<b-col md="6">
				    <b-input-group prepend="E-Mail" class="mb-2 mr-sm-2 mb-sm-0">
				      <b-input type="text" placeholder="EMAIL" :value="myInfo.email" readonly></b-input>
				    </b-input-group>
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
				<b-row>
					<b-col md=12>
						<div class="input-group">
							<b-button block button-variant="outline-secondary" @click="clearEquip">모두 벗기</b-button>
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
					<div class="items" v-if="item.cCode==1" v-for="item in items" :key="`${item.id}`" :class="{'isEquip': `${item.isEquip}` == 1 ? true : false }"
						v-b-popover.hover.top="`${item.item.name}`" @dblclick="changeItem(item.itemCode)">
						<img :src="`https://maplestory.io/api/KMS/323/item/${item.itemCode}/icon`" />
					</div>
					<p class='items-nav'>Eye</p>
					<hr class="my-1">
					<div class="items" v-if="item.cCode==2" v-for="item in items" :key="`${item.id}`" :class="{'isEquip': `${item.isEquip}` == 1 ? true : false }"
						v-b-popover.hover.top="`${item.item.name}`" @dblclick="changeItem(item.itemCode)">
						<img :src="`https://maplestory.io/api/KMS/323/item/${item.itemCode}/icon`" />
					</div>
					<p class='items-nav'>Hat</p>
					<hr class="my-1">
					<div class="items" v-if="item.cCode==8" v-for="item in items" :key="`${item.id}`" :class="{'isEquip': `${item.isEquip}` == 1 ? true : false }"
						v-b-popover.hover.top="`${item.item.name}`" @dblclick="changeItem(item.itemCode)">
						<img :src="`https://maplestory.io/api/KMS/323/item/${item.itemCode}/icon`" />
					</div>
					<p class='items-nav'>Face Decoration</p>
					<hr class="my-1">
					<div class="items" v-if="item.cCode==3" v-for="item in items" :key="`${item.id}`" :class="{'isEquip': `${item.isEquip}` == 1 ? true : false }"
						v-b-popover.hover.top="`${item.item.name}`" @dblclick="changeItem(item.itemCode)">
						<img :src="`https://maplestory.io/api/KMS/323/item/${item.itemCode}/icon`" />
					</div>
					<p class='items-nav'>Eye Decoration</p>
					<hr class="my-1">
					<div class="items" v-if="item.cCode==4" v-for="item in items" :key="`${item.id}`" :class="{'isEquip': `${item.isEquip}` == 1 ? true : false }"
						v-b-popover.hover.top="`${item.item.name}`" @dblclick="changeItem(item.itemCode)">
						<img :src="`https://maplestory.io/api/KMS/323/item/${item.itemCode}/icon`" />
					</div>
					<p class='items-nav'>Earrings</p>
					<hr class="my-1">
					<div class="items" v-if="item.cCode==5" v-for="item in items" :key="`${item.id}`" :class="{'isEquip': `${item.isEquip}` == 1 ? true : false }"
						v-b-popover.hover.top="`${item.item.name}`" @dblclick="changeItem(item.itemCode)">
						<img :src="`https://maplestory.io/api/KMS/323/item/${item.itemCode}/icon`" />
					</div>
					<p class='items-nav'>Overall</p>
					<hr class="my-1">
					<div class="items" v-if="item.cCode==12" v-for="item in items" :key="`${item.id}`" :class="{'isEquip': `${item.isEquip}` == 1 ? true : false }"
						v-b-popover.hover.top="`${item.item.name}`" @dblclick="changeItem(item.itemCode)">
						<img :src="`https://maplestory.io/api/KMS/323/item/${item.itemCode}/icon`" />
					</div>
					<p class='items-nav'>Top</p>
					<hr class="my-1">
					<div class="items" v-if="item.cCode==10" v-for="item in items" :key="`${item.id}`" :class="{'isEquip': `${item.isEquip}` == 1 ? true : false }"
						v-b-popover.hover.top="`${item.item.name}`" @dblclick="changeItem(item.itemCode)">
						<img :src="`https://maplestory.io/api/KMS/323/item/${item.itemCode}/icon`" />
					</div>
					<p class='items-nav'>Bottom</p>
					<hr class="my-1">
					<div class="items" v-if="item.cCode==13" v-for="item in items" :key="`${item.id}`" :class="{'isEquip': `${item.isEquip}` == 1 ? true : false }"
						v-b-popover.hover.top="`${item.item.name}`" @dblclick="changeItem(item.itemCode)">
						<img :src="`https://maplestory.io/api/KMS/323/item/${item.itemCode}/icon`" />
					</div>
					<p class='items-nav'>Cape</p>
					<hr class="my-1">
					<div class="items" v-if="item.cCode==9" v-for="item in items" :key="`${item.id}`" :class="{'isEquip': `${item.isEquip}` == 1 ? true : false }"
						v-b-popover.hover.top="`${item.item.name}`" @dblclick="changeItem(item.itemCode)">
						<img :src="`https://maplestory.io/api/KMS/323/item/${item.itemCode}/icon`" />
					</div>
					<p class='items-nav'>Glove</p>
					<hr class="my-1">
					<div class="items" v-if="item.cCode==11" v-for="item in items" :key="`${item.id}`" :class="{'isEquip': `${item.isEquip}` == 1 ? true : false }"
						v-b-popover.hover.top="`${item.item.name}`" @dblclick="changeItem(item.itemCode)">
						<img :src="`https://maplestory.io/api/KMS/323/item/${item.itemCode}/icon`" />
					</div>
					<p class='items-nav'>Shoes</p>
					<hr class="my-1">
					<div class="items" v-if="item.cCode==15" v-for="item in items" :key="`${item.id}`" :class="{'isEquip': `${item.isEquip}` == 1 ? true : false }"
						v-b-popover.hover.top="`${item.item.name}`" @dblclick="changeItem(item.itemCode)">
						<img :src="`https://maplestory.io/api/KMS/323/item/${item.itemCode}/icon`" />
					</div>
					<p class='items-nav'>One-Handed Weapon</p>
					<hr class="my-1">
					<div class="items" v-if="item.cCode==16" v-for="item in items" :key="`${item.id}`" :class="{'isEquip': `${item.isEquip}` == 1 ? true : false }"
						v-b-popover.hover.top="`${item.item.name}`" @dblclick="changeItem(item.itemCode)">
						<img :src="`https://maplestory.io/api/KMS/323/item/${item.itemCode}/icon`" />
					</div>
					<p class='items-nav'>Two-Handed Weapon</p>
					<hr class="my-1">
					<div class="items" v-if="item.cCode==17" v-for="item in items" :key="`${item.id}`" :class="{'isEquip': `${item.isEquip}` == 1 ? true : false }"
						v-b-popover.hover.top="`${item.item.name}`" @dblclick="changeItem(item.itemCode)">
						<img :src="`https://maplestory.io/api/KMS/323/item/${item.itemCode}/icon`" />
					</div>
					<p class='items-nav'>Shield</p>
					<hr class="my-1">
					<div class="items" v-if="item.cCode==14" v-for="item in items" :key="`${item.id}`" :class="{'isEquip': `${item.isEquip}` == 1 ? true : false }"
						v-b-popover.hover.top="`${item.item.name}`" @dblclick="changeItem(item.itemCode)">
						<img :src="`https://maplestory.io/api/KMS/323/item/${item.itemCode}/icon`" />
					</div>
					<p class='items-nav'>Chair</p>
					<hr class="my-1">
					<div class="items" v-if="item.cCode==18" v-for="item in items" :key="`${item.id}`" :class="{'isEquip': `${item.isEquip}` == 1 ? true : false }"
						v-b-popover.hover.top="`${item.item.name}`" @dblclick="changeItem(item.itemCode)">
						<img :src="`https://maplestory.io/api/KMS/323/item/${item.itemCode}/icon`" />
					</div>
					<p class='items-nav'>BOX</p>
					<hr class="my-1">
					<div class="items" v-if="item.cCode==99" v-for="item in items" :key="`${item.id}`" :value="`${item.itemCode}`"
						v-b-popover.hover.top="`${item.item.name}`" @dblclick="useItem(item.id, item.item.name, item.itemCode)">
						<img :src="`https://maplestory.io/api/KMS/323/item/${item.itemCode}/icon`" />
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
			colHeight: '85%;',
			character: '',
		}
	},
	created() {
		this.FETCH_MYINFO().then(() => {
			this.inputIntro = this.myInfo.intro
			this.myCharacter += this.myInfo.items.map((i) => {
				return JSON.stringify({ itemId: i.itemCode, region: "KMS", version: "323" })
			})
			this.character = 'https://maplestory.io/api/character/' + this.myCharacter + ',{"itemId":2000,"region":"KMS","version":"323"},{"itemId":12000,"region":"KMS","version":"323"}/stand1/0?showears=false&showLefEars=false&showHighLefEars=undefined&resize=1&name=&flipX=undefined'
		})
		this.$nextTick(() => {
			this.FETCH_ITEMS(this.$route.params.uid)
		})
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
		...mapActions(['UPDATE_USER','FETCH_MYINFO','FETCH_ITEMS','UPDATE_EQUIP','USE_BOX', 'CLEAR_EQUIP']),
		changeItem(id) {
			this.UPDATE_EQUIP({ itemCode: id, uid: this.$route.params.uid }).then((data) => {
				this.myCharacter = ''
				this.FETCH_MYINFO().then(() => {
					this.FETCH_ITEMS()
					this.myCharacter += this.myInfo.items.map((i) => {
						return JSON.stringify({ itemId: i.itemCode, region: "KMS" })
					})
				})
				this.character = 'https://maplestory.io/api/character/' + this.myCharacter + ',{"itemId":2000,"region":"KMS","version":"323"},{"itemId":12000,"region":"KMS","version":"323"}/stand1/0?showears=false&showLefEars=false&showHighLefEars=undefined&resize=1&name=&flipX=undefined'
			})
		},
		clearEquip() {
			this.CLEAR_EQUIP().then(() => {
				this.myCharacter = ''
				this.FETCH_MYINFO().then(() => {
					this.FETCH_ITEMS()
					this.myCharacter += this.myInfo.items.map((i) => {
						return JSON.stringify({ itemId: i.itemCode, region: "KMS" })
					})
				})
			})
		},
		useItem(idx, name, id) {
			if(confirm(name + "을 사용하시겠습니까?")) {
				this.USE_BOX({ uid: this.$route.params.uid, id, idx }).then((data) => {
					this.FETCH_ITEMS(this.$route.params.uid)
					this.FETCH_MYINFO()

				})	
			} else {
				alert('취소되었습니다.')
			}
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

.isEquip {
	box-shadow: 0 0 0 2px green inset;
}
</style>
