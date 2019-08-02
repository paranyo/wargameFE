<template>
	<modal class="modal-card">
		<div slot="header" class="modal-card-header">
			<div class="modal-card-header-title">
				<h2>Create new Category
					<a class="modal-close-btn" href="" @click.prevent="SET_IS_ADD_CATEGORY(false)">&times;</a>
				</h2>
			</div>
		</div>
		<div slot="body">
			<input class="form-control" type="text" v-model="inputCategoryTitle" ref="inputCategoryTitle">
		</div>
		<div slot="footer">
			<button class="btn" :class="{'btn-success': isValidInput}" type="button" form="add-category-form"
				:disabled="!isValidInput" @click="onSubmitCreateCategory"> Create Category </button>
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
			inputCategoryTitle: '',
			isValidInput: false,
		}
	},
	watch: {
		inputCategoryTitle(val) {
			this.isValidInput = !!val.trim().length
		}
	},
	mounted () {
		this.$refs.inputCategoryTitle.focus()
	},
	methods: {
		...mapActions([
			'ADD_CATEGORY',
		]),
		...mapMutations([
			'SET_IS_ADD_CATEGORY'
		]),
		onSubmitCreateCategory() {
			if(!this.inputCategoryTitle.trim()) return
			this.ADD_CATEGORY(this.inputCategoryTitle)
			this.SET_IS_ADD_CATEGORY(false)
		}
	}
}
</script>
<style scoped>
p {
	margin: 0;
}
.modal-card .modal-container {
  min-width: 300px;
  max-width: 800px;
  width: 60%;
}
.modal-close-btn {
  top: 0px;
  font-size: 24px;
  text-decoration: none;
}
.modal-card-header {
  position: relative;
	width: 100%;
}
.card-body {
	padding: 0.8rem;
}
</style>
