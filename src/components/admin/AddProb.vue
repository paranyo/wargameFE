<template>
	<modal class="modal-card">
		<div slot="header"></div>
		<div slot="body">
			<b-row class="form-group">
				<input class="form-control" type="text" v-model="pTitle" ref="pTitle"	placeholder='문제 이름'>
			</b-row>
			<b-row class="form-group">
				<b-form-textarea id="textarea" class="form-control" v-model="pDescription" placeholder="본문을 입력하세요"
					rows="6" max-rows="8"></b-form-textarea>
			</b-row>
			<b-row class="px-3 mx-auto">
				<b-table ref="selectableTable" sticky-header="200px" fixed responsive="sm" :items="files" :fields="fields" class="text-center" selectable select-mode="single"
					@row-selected="onRowSelected"></b-table>
			</b-row>
			<b-row class="form-group">
				<b-col cols="8" md="8">
					<p v-if="selected.length == 1">선택된 파일: <b>{{ selected[0].id }}번 {{ selected[0].originName }}</b></p>
					<p v-else>파일을 선택하지 않았습니다.</p>
				</b-col>
				<b-col cols="4" md="4">
					<b-button block button-variant="info" @click="clearSelected">Clear</b-button>
				</b-col>
			</b-row>
			<b-row class="form-group">
				<b-col cols="4" md="4">
					<input class="form-control" type="text" v-model="pFlag"	placeholder='플래그'>
				</b-col>
				<b-col cols="1" md="1">
					<input class="form-control" type="text" v-model='pScore' placeholder='스코어'>
				</b-col>
				<b-col cols="2" md="2">
					<input class="form-control" type="text" v-model='pAuthor' placeholder='출제자'>
				</b-col>
				<b-col cols="3" md="3">
					<input class="form-control" type="text" v-model="pSrc"	placeholder='링크'>
				</b-col>
				<b-col cols="2" md="2">
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
			fields: [
				{ key: 'id', label: '인덱스', sortable: true },
				{ key: 'originName', label: '파일명', sortable: true },
				{ key: 'size', label: '파일크기', sortable: true },
				{ key: 'createdAt', label: '업로드 날짜', sortable: true, formatter: value => { return value.replace('T', ' ').substring(2, 19) } },
				{ key: 'uploader', label: '업로더', sortable: true },
			],
			selected: [],
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
			pSrc: '',
			isValidInput: false,
			tags: [],
		}
	},
	computed: {
		...mapState([ 'files' ]),
	},
	components: {	Modal	},
	watch: {
		pTitle(val) {
			this.isValidInput = !!val.trim().length
		}
	},
	created() {
		this.fetchTags()
		this.FETCH_FILES()
	},
	mounted () {
		this.$refs.pTitle.focus()
	},
	methods: {
		...mapActions([
			'ADD_PROB',
			'FETCH_PROBS',
			'FETCH_FILES',
		]),
		...mapMutations([
			'SET_IS_ADD_PROB'
		]),
		onRowSelected(item) {
			this.selected = item
		},
		clearSelected() {
			this.$refs.selectableTable.clearSelected()
		},
		fetchTags() {
			this.options.map(t => this.tags.push(t.value))
		},
		onSubmitProb() {
			const title				= this.pTitle
			const description = this.pDescription
			const flag				= this.pFlag
			const score				= this.pScore
			const isOpen			= !!this.pIsOpen
			const author			= this.pAuthor
			const tagId				= this.pTag
			const src					= this.pSrc
			let		fileId			= null
			if(this.selected.length !== 0)
				fileId			= this.selected[0].id
			if(!this.pTitle.trim()) return
			this.ADD_PROB({ title, description, flag: sha256(flag), score, isOpen, author, tagId, fileId, src })
				.then(() => this.FETCH_PROBS({ tags: this.tags }))
			this.SET_IS_ADD_PROB(false)
		}
	}
}
</script>
