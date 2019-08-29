<template>
	<div class="card bg-light mb-3">
	  <div class="card-header px-2 py-2">
			<router-link :to="`/settings/challenge/${prob.id}`" class="badge badge-info">
				수정
			</router-link>
			<a href='#' v-if="!prob.deletedAt" class="badge badge-pill badge-info" @click.prevent="setVisible">열림</a>
			<a href='#' v-else class="badge badge-pill badge-dark" @click.prevent="setVisible">닫힘</a>
			<span class="badge badge-pill badge-primary">{{ prob.author }}</span>
			<span class="badge badge-pill badge-warning">{{ prob.score }}pt</span>
			<span class="badge badge-pill badge-warning">{{ prob.tag }}</span>
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
			'UPDATE_PROB',
		]),
		setVisible() {
			const id		 = this.prob.id
			const isOpen = !!this.prob.deletedAt
			this.UPDATE_PROB({ id, isOpen })
				.then(() => this.$emit('showTags'))
		},
	}
}
</script>
<style scoped>
</style>
