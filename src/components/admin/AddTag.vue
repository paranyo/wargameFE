<template>
	<modal class="modal-card">
		<div slot="header" class="modal-card-header">
			<div class="modal-card-header-title">
				<h2>Create new Tag
					<a class="modal-close-btn" href="" @click.prevent="SET_IS_ADD_TAG(false)">&times;</a>
				</h2>
			</div>
		</div>
		<div slot="body">
			<input class="form-control mb-3" type="text" v-model="title" ref="title">
			<b-button block form="add-tag-form" :disabled="!isValidInput" @click="onSubmit">Create tag</b-button>
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
			title: '',
			isValidInput: false,
		}
	},
	watch: {
		title(val) {
			this.isValidInput = !!val.trim().length
		}
	},
	mounted () {
		this.$refs.title.focus()
	},
	methods: {
		...mapActions([
			'ADD_TAG',
			'FETCH_TAG',
		]),
		...mapMutations([
			'SET_IS_ADD_TAG'
		]),
		onSubmit() {
			if(!this.title.trim()) return
			this.ADD_TAG(this.title)
			this.SET_IS_ADD_TAG(false)
			this.$emit('fetchTags')
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
