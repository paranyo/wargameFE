<template>
	<modal class="modal-card">
		<div slot="header"></div>
		<div slot="body">
			<b-row class="form-group">
				<input class="form-control" type="text" v-model="pTitle" ref="pTitle"	placeholder='문제 이름'>
			</b-row>
			<b-row class="form-group">
				<b-form-textarea id="textarea" class="form-control" v-model="pDescription" placeholder="본문을 입력하세요"
					rows="3" max-rows="6"></b-form-textarea>
			</b-row>
			<b-row class="form-group">
				<input class="form-control" type="text" v-model="pFlag"	placeholder='플래그'>
			</b-row>
			<b-row class="form-group" align-h="start">
				<b-col cols="4" md="5">
					<input class="form-control" type="text" v-model='pAuthor' placeholder='출제자'>
				</b-col>
				<b-col cols="4" md="3">
					<input class="form-control" type="text" v-model='pScore' placeholder='스코어'>
				</b-col>
				<b-col cols="4" md="4">
					<b-form-radio-group v-model="pIsOpen" :options="radioBtns" buttons button-variant="outline-primary">
					</b-form-radio-group>
				</b-col>
			</b-row>
			<b-row class="form-group">
				<b-col>
					<b-form-group label="문제 분야: ">
						<b-form-checkbox-group v-model="selected" :options="options">
						</b-form-checkbox-group>
					</b-form-group>
				</b-col>
			</b-row>
		</div>
		<div slot="footer">
			<button class="btn" :class="{'btn-success': isValidInput}" type="button" form="add-category-form"
				:disabled="!isValidInput" @click="onSubmitProb">문제 생성</button>
			<b-button class="modal-close-btn" href="" @click.prevent="SET_IS_ADD_PROB(false)">취소</b-button>
		</div>
	</modal>
</template>
<script>
import Modal from '../Modal.vue'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
	props: ['options'],
	data() {
		return {
			radioBtns: [
	      { text: 'Open', value: '1' },
        { text: 'Close', value: '0' },
			],
			selected: [],
			pTitle: '',
			pDescription: '',
			pFlag: '',
			pScore: '',
			pAuthor: '',
			pIsOpen: 0,
			isValidInput: false,
		}
	},
	components: {	Modal	},
	comupted: {
		...mapState({
			tags: 'tags',
		})
	},
	watch: {
		pTitle(val) {
			this.isValidInput = !!val.trim().length
		}
	},
	created() {
	},
	mounted () {
		this.$refs.pTitle.focus()
	},
	methods: {
		...mapActions([
			'ADD_PROB',
			'FETCH_PROBS',
		]),
		...mapMutations([
			'SET_IS_ADD_PROB'
		]),
		onSubmitProb() {
			const title				= this.pTitle
			const description = this.pDescription
			const flag				= this.pFlag
			const score				= this.pScore
			const isOpen			= this.pisOpen
			const author			= this.pAuthor
			if(!this.pTitle.trim()) return

			this.ADD_PROB({ title, description, flag, score, isOpen, author, tags: this.selected })
				.then(_ => this.FETCH_PROBS())
			this.SET_IS_ADD_PROB(false)
		}
	}
}
</script>
<style scoped>
</style>
