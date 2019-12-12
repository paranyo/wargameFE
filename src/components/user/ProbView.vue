<template>
	<modal class="modal-card">
		<div slot="header">
			<span class="badge badge-pill badge-warning">{{ prob.score }}</span>
			<span>&nbsp;{{ prob.title }}</span>
		</div>
		<div slot="body">
			<div class="mb-3">
				{{ prob.description }}
			</div>
			<div class="mb-3">
				<p v-if="prob.src"><a :href="'//' + prob.src" target="_blank">LINK</a></p>
				<p v-if="prob.saveName"><a :href="'//wargame2.run.goorm.io/download/' + prob.saveName" target="_blank">DOWNLOAD</a></p>
				<!--
				<p v-if="prob.saveName"><button button-variant='info' size="sm" @click="getFile(prob.saveName)">DOWNLOAD</button></p>-->
			</div>
			<div>
				<div class="input-group">
				  <input type="text" class="form-control" placeholder="플래그" v-model="flag">
					<div class="input-group-append">
						<b-button button-variant="outline-secondary" @click="onSubmitForm" @keyup.enter="onSubmitForm">
							제출</b-button>
					</div>
				</div>
			</div>
			<b-button class="mt-3" block @click="onClickClose">취소</b-button>
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
			flag: '',
			tag: [],
		}
	},
	components: {	Modal	},
	computed: {
		...mapState({
			prob: 'prob',
			tags: 'tags',
		}),
		invalidForm() {
			return !this.flag.trim()
		}
	},
	created() {
		this.FETCH_ONEPROB(this.$route.params.id)
		this.tags.map((t) => {
			this.tag.push(t.id)
		})
	},
	methods: {
		...mapActions([
			'FETCH_ONEPROB',
			'AUTH_PROB',
			'FETCH_MYINFO',
			'FETCH_PROBS',
			'GET_FILE',
		]),
		getFile(fName) {
			this.GET_FILE(fName)
		},
		onSubmitForm() {
			const flag = this.flag.trim()
			if(!flag) return
			this.AUTH_PROB({ id: this.prob.id, flag: sha256(flag), rFlag: flag })
				.then((result) => {
					alert(result)
					this.FETCH_MYINFO()
					this.FETCH_PROBS({ tags: this.tag })
					this.$router.push('/challenge')
				})
		},
		onClickClose() {
			this.$router.push('/challenge')
		},
	}
}
</script>
<style scoped>
</style>
