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
			<div>
				<div class="input-group">
				  <input type="text" class="form-control" placeholder="플래그" v-model="flag">
					<div class="input-group-append">
						<b-button button-variant="outline-secondary" @click="onSubmitForm" @keyup.enter="onSubmitForm">
							제출</b-button>
					</div>
				</div>
			</div>
		</div>
		<div slot="footer">
			<b-button class="modal-close-btn btn-block" href="" @click="onClickClose">취소</b-button>
		</div>
	</modal>
</template>
<script>
import Modal from '../Modal.vue'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
	data() {
		return {
			flag: ''
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
	},
	methods: {
		...mapActions([
			'FETCH_ONEPROB',
			'AUTH_PROB',
		]),
		onSubmitForm() {
			const flag				= this.flag.trim()
			if(!flag) return
			this.AUTH_PROB({ id: this.prob.id, flag }).then(() => this.$router.push('/challenge'))
		},
		onClickClose() {
			this.$router.push('/challenge')
		},
	}
}
</script>
<style scoped>
</style>
