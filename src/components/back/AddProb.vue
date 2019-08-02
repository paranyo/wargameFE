<template>
	<modal class="modal-card">
		<div slot="header" class="modal-card-header">
			<div class="modal-card-header-title">
				<h5>문제를 만들자!
					<a class="modal-close-btn" href="" @click.prevent="SET_IS_ADD_PROB(false)">&times;</a>
				</h5>
			</div>
		</div>
		<div slot="body">
			<div class="form-group row">
				<input class="form-control" type="text" v-model="pTitle" ref="pTitle"	placeholder='문제 이름'>
			</div>
			<div class="form-group row">
				<input class="form-control" type="text" v-model="pFlag"	placeholder='플래그'>
			</div>
			<div class="form-group row">
				<div class="col-4">
					<input class="form-control" type="text" v-model='pAuthor' placeholder='출제자'>
				</div>
				<div class="col">
					<input class="form-control" type="text" v-model='pScore' placeholder='스코어'>
				</div>
				<div class="col">
					<div class="form-check">
						<input class='form-check-input' type="radio" v-model="pIsOpen" value="1">Open</input>
					</div>
					<div class="form-check">
						<input class='form-check-input' type="radio" v-model="pIsOpen" value="0">Close</input>
					</div>
				</div>
			</div>
		</div>
		<div slot="footer">
			<button class="btn" :class="{'btn-success': isValidInput}" type="button" form="add-category-form"
				:disabled="!isValidInput" @click="onSubmitProb">문제 생성</button>
		</div>
	</modal>
</template>
<script>
import Modal from './Modal.vue'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
	components: {	Modal	},
	comupted: {
		...mapState({
			myStatus: 'myStatus'
		})
	},
	data() {
		return {
			pTitle: '',
			pFlag: '',
			pScore: '',
			pAuthor: '',
			pIsOpen: 0,
			isValidInput: false,
		}
	},
	watch: {
		pTitle(val) {
			this.isValidInput = !!val.trim().length
		}
	},
	mounted () {
		this.$refs.pTitle.focus()
	},
	methods: {
		...mapActions([
			'ADD_PROB',
			'FETCH_PROB_LIST'
		]),
		...mapMutations([
			'SET_IS_ADD_PROB'
		]),
		onSubmitProb() {
			const title  = this.pTitle
			const flag   = this.pFlag
			const score  = this.pScore
			const isOpen = this.pisOpen
			const author = this.pAuthor
			const id		 = this.$route.params.cid
			if(!this.pTitle.trim()) return
			this.ADD_PROB({ id, title, flag, score, isOpen, author })
				.then(_ => this.FETCH_PROB_LIST(this.$route.params.cid))
			this.SET_IS_ADD_PROB(false)
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
