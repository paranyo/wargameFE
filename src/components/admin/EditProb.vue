<template>
	<modal class="modal-card">
		<div slot="header"></div>
		<div slot="body">
			<b-row class="form-group">
				<input class="form-control" type="text" placeholder='문제 이름' v-model="title">
			</b-row>
			<b-row class="form-group">
				<b-form-textarea id="textarea" class="form-control" v-model="description"
					placeholder="본문을 입력하세요"	rows="3" max-rows="6"></b-form-textarea>
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
				<b-col cols="4" md="5">
					<input class="form-control" type="text" placeholder='출제자' v-model="author">
				</b-col>
				<b-col cols="4" md="3">
					<input class="form-control" type="text" placeholder='스코어' v-model="score">
				</b-col>
				<b-col cols="4" md="4">
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
				<b-button block button-variant="outline-secondary" @click="onSubmitForm" @keyup.enter="onSubmitForm">
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
			title: '',
			description: '',
			flag: '',
			rflag: '',
			score: 0,
			author: '',
			isOpen: '',
			tagId: '',
			tag: []
		}
	},
	components: {	Modal	},
	computed: {
		...mapState({
			prob: 'prob',
			tags: 'tags',
		}),
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

			this.tags.map((t) => {
				this.tag.push(t.id)
			})
		})
	},
	methods: {
		...mapActions([
			'FETCH_ONEPROB',
			'UPDATE_PROB',
			"FETCH_HASH",
			'FETCH_PROBS',
		]),
		getHash() {
			const flag = this.flag.trim()
			this.rflag = sha256(flag)
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
			if(!title || !description || !flag || !author) return
			if(flag.length != 64)
				return alert('플래그 값을 해시해야 합니다')
			this.UPDATE_PROB({ id: this.prob.id, title, description, flag: this.rflag, score, author, isOpen, tagId })
				.then(() => {
					this.FETCH_PROBS({ tags: this.tag })
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
