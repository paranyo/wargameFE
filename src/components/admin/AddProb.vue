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
					<b-form-group label="출제 분야: ">
					  <b-form-radio-group v-model="pTag" :options="options" buttons 
						button-variant="outline-primary" size="sm"></b-form-radio-group>
				</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-button class="btn" :class="{'btn-success': isValidInput}" form="add-category-form" block
					:disabled="!isValidInput" @click="onSubmitProb">문제 생성</b-button>
				<b-button block @click.prevent="SET_IS_ADD_PROB(false)">취소</b-button>	
			</b-row>
		</div>
	</modal>
</template>
<script>
import Modal from '../Modal.vue'
import { mapState, mapMutations, mapActions } from 'vuex'
import { sha256 } from 'js-sha256'
export default {
	props: ['options'],
	data() {
		return {
			radioBtns: [
	      { text: 'Open', value: '1' },
        { text: 'Close', value: '0' },
			],
			pTag: '',
			pTitle: '',
			pDescription: '',
			pFlag: '',
			pScore: 0,
			pAuthor: '',
			pIsOpen: 0,
			isValidInput: false,
			tags: [],
		}
	},
	components: {	Modal	},
	watch: {
		pTitle(val) {
			this.isValidInput = !!val.trim().length
		}
	},
	created() {
		this.fetchTags()
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
		fetchTags() {
			this.options.map(t => this.tags.push(t.value))
		},
		onSubmitProb() {
			const title				= this.pTitle
			const description = this.pDescription
			const flag				= this.pFlag
			const score				= this.pScore
			const isOpen			= this.pisOpen
			const author			= this.pAuthor
			const tag					= this.pTag
			if(!this.pTitle.trim()) return
			this.ADD_PROB({ title, description, flag: sha256(flag), score, isOpen, author, tag })
			.then(() => this.FETCH_PROBS({ tags: this.tags }))
			this.SET_IS_ADD_PROB(false)
		}
	}
}
</script>
