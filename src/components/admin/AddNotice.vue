<template>
	<modal class="modal-card">
		<div slot="header"></div>
		<div slot="body">
			<b-row class="form-group w-100">
				<b-col cols="8" md="8">
					<input class="form-control w-100" type="text" v-model="nTitle" ref="nTitle"	placeholder='타이틀'>
				</b-col>
				<b-col cols="4" md="4">
					<b-form-radio-group v-model="nIsOpen" :options="radioBtns" buttons button-variant="outline-primary" class="w-100">
					</b-form-radio-group>
				</b-col>
			</b-row>
			<b-row class="form-group">
				<b-form-textarea id="textarea" class="form-control" v-model="nDescription" placeholder="본문을 입력하세요"
					rows="3" max-rows="6"></b-form-textarea>
			</b-row>
			<b-row>
				<b-button class="btn" :class="{'btn-success': isValidInput}" form="add-category-form" block
					:disabled="!isValidInput" @click="onSubmitNotice">작성</b-button>
				<b-button block @click.prevent="SET_IS_ADD_NOTICE(false)">취소</b-button>	
			</b-row>
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
			nTitle: '',
			nDescription: '',
			nIsOpen: 0,
			isValidInput: false,
		}
	},
	components: {	Modal	},
	watch: {
		nTitle(val) {
			this.isValidInput = !!val.trim().length
		}
	},
	mounted () {
		this.$refs.nTitle.focus()
	},
	methods: {
		...mapActions([
			'ADD_NOTICE',
			'FETCH_NOTICE'
		]),
		...mapMutations([
			'SET_IS_ADD_NOTICE'
		]),
		onSubmitNotice() {
			const title				= this.nTitle
			const description = this.nDescription
			const isOpen			= !!this.nIsOpen
			if(!this.nTitle.trim()) return
			this.ADD_NOTICE({ title, description, isOpen })
				.then(() => this.FETCH_NOTICE())
			this.SET_IS_ADD_NOTICE(false)
		}
	}
}
</script>
