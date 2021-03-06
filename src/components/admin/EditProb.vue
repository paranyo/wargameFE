<template>
	<modal class="modal-card">
		<div slot="header"></div>
		<div slot="body">
			<b-row class="form-group">
				<input class="form-control" type="text" placeholder='문제 이름' v-model="title">
			</b-row>
			<b-row class="form-group">
				<b-form-textarea id="textarea" class="form-control" v-model="description" placeholder="본문을 입력하세요"	
					rows="6" max-rows="8"></b-form-textarea>
			</b-row>
			<b-row class="px-3 mx-auto">
				<b-table ref="selectableTable" sticky-header="200px" fixed responsive="sm" :items="files" :fields="fields" class="text-center" selectable select-mode="single"
					@row-selected="onRowSelected">
					<template v-slot:table-colgroup="scope">
						<col key="id" style="width: 20px;" />
						<col key="originName" style="width: 150px;" />
						<col key="size" style="width: 40px;" />
						<col key="createdAt" style="width: 40px;" />
						<col key="uploader" style="width: 30px;" />
					</template>
				</b-table>
			</b-row>
			<b-row class="form-group">
				<b-col cols="8" md="8">
					<p v-if="selected.length == 1">선택된 파일: <b>{{ selected[0].id }}번 {{ selected[0].originName }}</b></p>
					<p v-else>파일을 선택하지 않았습니다.</p>
				</b-col>
				<b-col cols="4" md="4">
					<b-button  block button-variant="info" @click="clearSelected">Clear</b-button>
				</b-col>
			</b-row>
			<b-row class="form-group">
				<div class="input-group">
				  <input type="text" class="form-control" placeholder="플래그" v-model="flag">
				  <div class="input-group-append">
				    <button class="btn btn-outline-secondary" type="button" @click="getHash">Hash</button>
				  </div>
				</div>
			</b-row>
			<b-row class="form-group" align-h="start">
				<b-col cols="3" md="3">
					<input class="form-control" type="text" placeholder='출제자(ID)' v-model="author">
				</b-col>
				<b-col cols="2" md="2">
					<input class="form-control" type="text" placeholder='스코어' v-model="score">
				</b-col>
				<b-col cols="5" md="5">
					<input class="form-control" type="text" placeholder='링크' v-model="src">
				</b-col>
				<b-col cols="2" md="2">
					<b-form-radio-group buttons button-variant="outline-primary" v-model="isOpen">
						<b-form-radio value="1">Open</b-form-radio>
		        <b-form-radio value="0">Close</b-form-radio>
					</b-form-radio-group>
				</b-col>
			</b-row>
			<b-row class="form-group">
				<b-col>
					<b-form-group label="출제 분야: ">
					  <b-form-radio-group v-model="tagId" buttons button-variant="outline-primary" size="sm">
							<b-form-radio v-for="tag in tags" :value="tag.id" :key="tag.id">
								{{ tag.title }}
							</b-form-radio>
						</b-form-radio-group>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-button block button-variant="outline-secondary" @click="onSubmitForm()" @keyup.enter="onSubmitForm()">
					문제 수정</b-button>
				<b-button block @click="onClickClose">취소</b-button>
			</b-row>
		</div>
	</modal>
</template>
<script>
import Modal from '../Modal.vue'
import { mapState, mapMutations, mapActions } from 'vuex'
import { sha256 } from 'js-sha256'
export default {
	data() {
		return {
			fields: [
				{ key: 'id', label: '인덱스', sortable: true },
				{ key: 'originName', label: '파일명', sortable: false },
				{ key: 'size', label: '파일 크기', sortable: true },
				{ key: 'createdAt', label: '업로드 날짜', sortable: true, formatter: value => { return value.replace('T', ' ').substring(2, 19) } },
				{ key: 'uploader', label: '업로더', sortable: false },
			],
			title: '',
			description: '',
			flag: '',
			score: 0,
			author: '',
			isOpen: '',
			tagId: '',
			src: '',
			tag: [],
			selected: [],
		}
	},
	components: {	Modal	},
	computed: {
		...mapState([ 'prob', 'tags', 'files' ]),
		invalidForm() {
			return !this.title || !this.description || !this.flag || !this.score || !this.author 
		}
	},
	created() {
		this.FETCH_ONEPROB(this.$route.params.id)
		.then(() => {
			this.title			 = this.prob.title
			this.description = this.prob.description
			this.score			 = this.prob.score
			this.author			 = this.prob.author
			this.flag				 = this.prob.flag
			this.isOpen			 = !this.prob.deletedAt * 1
			this.tagId			 = this.prob.tagId
			this.src				 = this.prob.src
			this.tags.map((t) => {
				this.tag.push(t.id)
			})
			this.FETCH_FILES().then(() => {
				if(this.prob.file) {
					this.selected.push(this.prob.file)
					this.$refs.selectableTable.selectRow(this.files.map(f => { return f.id }).indexOf(this.selected[0].id))
				}
			})
		})
	},
	methods: {
		...mapActions([
			'FETCH_ONEPROB',
			'UPDATE_PROB',
			"FETCH_HASH",
			'FETCH_PROBS',
			'FETCH_FILES', 
		]),
		onRowSelected(item) {
			this.selected = item
		},
		clearSelected() {
			this.$refs.selectableTable.clearSelected()
		},
		getHash() {
			const flag = this.flag.trim()
			if(flag.length != 64)
				this.FETCH_HASH({ flag: sha256(flag) }).then(data => this.flag = data.flag)
			else
				alert('한 번만 해싱하세요!')
		},
		onSubmitForm() {
			const title				= this.title.trim()
			const description = this.description.trim()
			const flag				= this.flag.trim()
			const score				= parseInt(this.score)
			const author			= this.author.trim()
			const isOpen			= this.isOpen
			const tagId				= this.tagId
			let fileId				= null
			if(this.selected.length !== 0) 
				fileId = this.selected[0].id
			const src					= this.src.trim()
			if(!title || !description || !flag || !author) return
			if(flag.length != 64)
				return alert('플래그 값을 해시해야 합니다')
			this.UPDATE_PROB({ id: this.prob.id, title, description, flag, score, author, isOpen, tagId, fileId, src })
				.then(() => {
					this.FETCH_PROBS({ tags: this.tag })
					this.selected = []
					this.$router.push('/settings/challenge')
				})
		},
		onClickClose() {
			this.$router.push('/settings/challenge')
		},
	}
}
</script>
<style scoped>
</style>
