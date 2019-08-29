<template>
	<div class="card bg-light mb-3" @click="showProb">
	  <div class="card-header px-2 py-2">
			<span class="badge badge-pill badge-secondary">{{ prob.tag }}</span>
			<span class="badge badge-pill badge-warning">{{ prob.score }}pt</span>
			<span class="badge badge-pill badge-primary">{{ prob.author }}</span>
		</div>
		<div class="card-body">
			<p class="card-title">{{ prob.title }}</p>
			<p class="card-text">{{ prob.description }}</p>
			<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
		</div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
	props: ['prob'],
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
