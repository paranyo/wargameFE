<template>
	<b-modal id="prob-view" @hide="close" hide-footer centered>
		<template v-slot:modal-title>
			<b-badge pill variant="warning">{{ prob.score }}</b-badge>
			&nbsp;<span>{{ prob.title }}</span>
		</template>
		<p>{{ prob.description }}</p>
		<code v-if="prob.src" class="text-right d-block"><a :href="'//' + prob.src" target="_blank">LINK</a></code>
		<code v-if="prob.saveName" class="text-right d-block"><a :href="'//wargame2.run.goorm.io/download/' + prob.saveName" target="_blank">DOWNLOAD</a></code>
		<b-input-group prepend="FLAG" class="mt-3"><b-form-input v-model="flag" /></b-input-group>
		<b-button class="mt-3" block @click="onSubmit" variant="success" :disabled="invalidForm" >제출</b-button>
		<b-button block @click="close">취소</b-button>
	</b-modal>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { sha256 } from 'js-sha256'
export default {
	data() {
		return {
			flag: '',
			tag: [],
		}
	},
	computed: {
		...mapState(['prob', 'tags', 'returnPath']),
		invalidForm() {
			return !this.flag.trim()
		}
	},
	created() {
		this.FETCH_ONEPROB(this.$route.params.id).then(() => {
			this.tags.map((t) => { this.tag.push(t.id) } )
		}).catch((err) => {
			return alert(err.response.data.message)
		})
	},
	methods: {
		...mapActions(['FETCH_ONEPROB', 'AUTH_PROB', 'FETCH_MYINFO', 'FETCH_PROBS']),
		onSubmit() {
			const flag = this.flag.trim()
			if(!flag) return alert('플래그를 입력하세요!')
			this.AUTH_PROB({ id: this.prob.id, flag: sha256(flag), rFlag: flag })
			.then((result) => {
				alert(result)
				this.FETCH_MYINFO()
				this.FETCH_PROBS({ tags: this.tag })
				this.$router.push(this.returnPath)
			}).catch((err) => {
				return alert(err.response.data.message)
			})	
		},
		close() {
			this.$root.$emit('bv::hide::modal', 'prob-view')
			this.FETCH_PROBS({ tags: this.tag })
			this.$router.push(this.returnPath)
		},
	},
}
</script>
<style scoped>
p {
	margin: 0;
}
.row {
	margin-bottom: 10px;
}
</style>
