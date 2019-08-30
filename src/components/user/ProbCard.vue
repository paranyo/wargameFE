<template>
	<div class="card bg-light mb-3 h-100" @click="showProb">
	  <div class="card-header px-2 py-2">
			<span class="badge badge-pill badge-secondary">{{ prob.tag }}</span>
			<span class="badge badge-pill badge-warning">{{ prob.score }}pt</span>
			<span class="badge badge-pill badge-primary">{{ prob.author }}</span>
		</div>
		<div class="card-body">
			<p class="card-title">{{ substrTitle }}</p>
			<p class="card-text">{{ substrDesc }}</p>
		</div>
	  <div class="card-footer bg-transparent">
			<p class="card-text"><small class="text-muted">0명이 풀었습니다.</small></p>
		</div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
	props: ['prob'],
	computed: {
		substrTitle() {
			if(this.prob.title.length > 10)
				return this.prob.title.substring(0, 10) + '...'
			else
				return this.prob.title
		},
		substrDesc() {
			if(this.prob.description.length > 32)
				return this.prob.description.substring(0, 32) + '...'
			else
				return this.prob.description
		}
	},
	methods: {
		...mapActions([
			'FETCH_PROBS',
		]),
		showProb() {
			this.$router.push('/challenge/' + this.prob.id)
		},
	}
}
</script>
<style scoped>
</style>
