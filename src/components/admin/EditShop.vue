<template>
	<modal class="modal-card">
		<div slot="header"></div>
		{{ product }}
		<div slot="body">
			<b-row class="form-group">
				<b-col cols="2" md="2">
					<input class="form-control" type="text" placeholder='ITEM ID' v-model="pdCode">
				</b-col>
				<b-col cols="2" md="2">
					<input class="form-control" type="text" placeholder='상품 재고' v-model="pdCount">
				</b-col>
				<b-col cols="2" md="2">
					<input class="form-control" type="text" placeholder='가격' v-model="price">
				</b-col>
				<b-col cols="6" md="6">
					<b-form-input type="datetime-local" v-model="deadLine" />
				</b-col>
			</b-row>
			<b-row class="form-group">
				<b-form-textarea id="textarea" class="form-control" v-model="description" placeholder="본문을 입력하세요"	
					rows="3" max-rows="6"></b-form-textarea>
			</b-row>
			<b-row>
				<b-button block button-variant="outline-secondary" @click="onSubmitForm()">
					상품 수정</b-button>
				<b-button block @click="onClickClose">취소</b-button>
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
			id: 0,
			pdCount: 0,
			price: 0,
			deadLine: '',
			description: '',
			pdCode: 0,
		}
	},
	components: {	Modal	},
	computed: {
		...mapState([ 'product' ]),
	},
	created() {
		this.FETCH_PRODUCT({ idx: this.$route.params.idx }).then(() => {
			this.id					 = this.product.idx
			this.pdCount		 = this.product.pdCount
			this.price			 = this.product.price
			this.deadLine		 = this.product.deadLine.substr(0, 16)
			this.description = this.product.description
			this.pdCode			 = this.product.id
		})
	},
	methods: {
		...mapActions([
			'FETCH_PRODUCT',
			'UPDATE_SHOP',
			'FETCH_SHOP',
		]),
		onSubmitForm() {
			const id = this.id
			const description = this.description
			const pdCount = this.pdCount
			const price = this.price
			const deadLine = this.deadLine
			const pdCode = this.pdCode
			if(isNaN(pdCount) || isNaN(price) || isNaN(id) || id < 0 || price < 0) return alert('ITEM ID, 상품 재고, 가격은 number 형태여야 합니다.')
			if(!id || !description || !price || !deadLine) return alert('모든 값은 필수입니다.')
			this.UPDATE_SHOP({ id, description, pdCount, price, deadLine, pdCode })
				.then(() => {
					this.FETCH_SHOP()
					this.$router.push('/settings/shop')
			})
		},
		onClickClose() {
			this.$router.push('/settings/shop')
		},
	}
}
</script>
<style scoped>
</style>
