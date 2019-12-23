<template>
	<modal class="modal-card">
		<div slot="header"></div>
		<div slot="body">
			<b-row class="form-group">
				<b-col cols="2" md="2">
					<input class="form-control" type="text" v-model="pId" ref="pId"	placeholder='ITEM ID'>
				</b-col>
				<b-col cols="2" md="2">
					<input class="form-control" type="text" v-model="pCount" placeholder='상품 재고'>
				</b-col>
				<b-col cols="2" md="2">
					<input class="form-control" type="text" v-model="pPrice" placeholder='가격'>
				</b-col>
				<b-col cols="6" md="6">
					<b-form-input type="datetime-local" v-model="pDeadLine" />
				</b-col>
			</b-row>
			<b-row class="form-group">
				<b-form-textarea id="textarea" class="form-control" v-model="pDescription" placeholder="상품 설명"
					rows="3" max-rows="6"></b-form-textarea>
			</b-row>
			<b-row>
				<b-button class="btn" :class="{'btn-success': isValidInput}" form="add-category-form" block
					:disabled="!isValidInput" @click="onSubmitShop">작성</b-button>
				<b-button block @click.prevent="SET_IS_ADD_SHOP(false)">취소</b-button>	
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
			pId: '',
			pDescription: '',
			pPrice: null,
			pCount: null,
			pDeadLine: null,
			isValidInput: false,
		}
	},
	components: {	Modal	},
	watch: {
		pId(val) {
			this.isValidInput = !!val.trim().length
		}
	},
	mounted () {
		this.$refs.pId.focus()
	},
	methods: {
		...mapActions([
			'ADD_SHOP',
			'FETCH_SHOP'
		]),
		...mapMutations([
			'SET_IS_ADD_SHOP'
		]),
		onSubmitShop() {
			const pdCode			= this.pId
			const description = this.pDescription
			const price				= this.pPrice
			const pdCount			= this.pCount
			const deadLine		= this.pDeadLine
			if(!this.pId.trim()) return
			this.ADD_SHOP({ pdCode, description, price, pdCount, deadLine })
				.then(() => this.FETCH_SHOP())
			this.SET_IS_ADD_SHOP(false)
		}
	}
}
</script>
