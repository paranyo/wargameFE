<template>
	<modal class="modal-card">
		<div slot="header"></div>
		{{ product }}
		<div slot="body">
			<b-row class="form-group">
				<b-col cols="2" md="2">
					<input class="form-control" type="text" placeholder='ITEM ID' v-model="id">
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
				<b-button block button-variant="outline-secondary" @click="onSubmitForm()" @keyup.enter="onSubmitForm()">
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
			id: null,
			pdCount: null,
			price: null,
			deadLine: null,
			description: '',
		}
	},
	components: {	Modal	},
	computed: {
		...mapState([ 'product' ]),
		invalidForm() {
			return !this.id || !this.pdCount || !this.price || !this.deadLine || !this.description
		}
	},
	created() {
		this.FETCH_PRODUCT(this.$route.params.idx)
	},
	methods: {
		...mapActions([
			'FETCH_PRODUCT',
			'UPDATE_SHOP',
			'FETCH_SHOP',
		]),
		onSubmitForm() {
			const description = this.description.trim()
			if(!title || !description || !flag || !author) return
			this.UPDATE_SHOP({ id: this.prob.id, title, description, flag: this.rflag, score, author, isOpen, tagId, fileId, src })
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
