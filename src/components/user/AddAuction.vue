<template>
	<modal class="modal-card">
		<div slot="header"></div>
		<div slot="body">
			<b-row class="form-group">
				<b-col cols="6" md="6">
					<input class="form-control" type="number" v-model="price" ref="price" placeholder="최소 입찰가">
				</b-col>
				<b-col cols="6" md="6">
					<input class="form-control" type="number" v-model="end"  ref="end"  placeholder="종료 시간(분)">
				</b-col>
			</b-row>
			<b-row class="form-group">
				<b-col cols="12">
					<b-jumbotron>
						<p class="items-nav">Hair</p>
						<hr class="my-1">
						<div class="items" v-if="item.cCode==1" v-for="item in items" :key="`${item.id}`" v-b-popover.hover.top="`${item.item.name}`" @click="setItem(item.id)" 
							:class="{'isSelect': `${item.id}` == itemId ? true : false }">
							<img :src="`http://maplestory.io/api/KMS/323/item/${item.itemCode}/icon`" />
						</div>
						<p class="items-nav">Eye</p>
						<hr class="my-1">
						<div class="items" v-if="item.cCode==2" v-for="item in items" :key="`${item.id}`" v-b-popover.hover.top="`${item.item.name}`" @click="setItem(item.id)"
							:class="{'isSelect': `${item.id}` == itemId ? true : false }">
							<img :src="`http://maplestory.io/api/KMS/323/item/${item.itemCode}/icon`" />
						</div>
						<p class="items-nav">ETC</p>
						<hr class="my-1">
						<div class="items" v-if="item.cCode==99" v-for="item in items" :key="`${item.id}`" v-b-popover.hover.top="`${item.item.name}`" @click="setItem(item.id)"
							:class="{'isSelect': `${item.id}` == itemId ? true : false }">
							<img :src="`http://maplestory.io/api/KMS/323/item/${item.itemCode}/icon`" />
						</div>
					</b-jumbotron>
				</b-col>
			</b-row>
			<b-row>
				<b-button class="btn" :class="{'btn-success': isValidInput}" form="add-category-form" block @click="onSubmitAuction">등록</b-button>
				<b-button block @click.prevent="SET_IS_ADD_AUCTION(false)">취소</b-button>	
			</b-row>
		</div>
	</modal>
</template>
<script>
import Modal from '../Modal.vue'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
	data() {
		return {
			price: null,
			end: null,
			itemId: null,
			isValidInput: false,
		}
	},
	computed: {
		...mapState(['items'])
	},
	components: {	Modal	},
	created () {
		this.FETCH_ITEMS()
	},
	mounted () {
		this.$refs.price.focus()
	},
	methods: {
		...mapActions(['ADD_AUCTION', 'FETCH_ITEMS', 'FETCH_AUCTION']),
		...mapMutations(['SET_IS_ADD_AUCTION']),
		setItem(id) {
			this.itemId = id
		},
		onSubmitAuction() {
			const price	 = this.price
			const end		 = this.end
			const itemId = this.itemId
			if(!price || !end || !itemId) return alert('모든 값은 필수입니다.')
			if(confirm("선택한 아이템을 입찰가 " + price + ", 경매시간은 " + end + "분입니다. 등록하시겠습니까?"))
				this.ADD_AUCTION({ price, end, itemId }).then((data) => {
					alert(data.result)
					this.FETCH_AUCTION() 
				})
			else
				alert('취소하였습니다')
			this.SET_IS_ADD_AUCTION(false)
		}
	}
}
</script>
<style scoped>
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
.isSelect {
	box-shadow: 0 0 0 2px black inset;
}
</style>
