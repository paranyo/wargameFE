<template>
	<div class="card bg-light mb-3">
	  <div class="card-header px-2 py-2">
			<a href='#' v-if="!prob.deletedAt" class="badge badge-pill badge-info" @click.prevent="setVisible">열림</a>
			<a href='#' v-else class="badge badge-pill badge-dark" @click.prevent="setVisible">닫힘</a>
			<span class="badge badge-pill badge-primary">{{ prob.author }}</span>
			<span class="badge badge-pill badge-warning">{{ prob.score }}pt</span>
		</div>
		<div class="card-body">
			<h5 class="card-title">{{ prob.title }}</h5>
			<p class="card-text">{{ prob.description }}</p>
		<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
		</div>
  </div>
<!--
  <div class="card">
		<div class="card-header">
			<span class="badge badge-pill badge-primary">{{ prob.author }}</span>
			<span v-if="prob.isOpen" class="badge badge-pill badge-info">열림</span>
			<span v-else class="badge badge-pill badge-dark">닫힘</span>
			<span class="badge badge-pill badge-warning">{{ prob.score }}pt</span>
		</div>
		<div class="card-body">
	    <p class="card-title"><code>{{ prob.title }}</code></p>
			<p>{{ prob.description }}</p>
      <p><small><code class="card-text">added: {{ prob.createdAt }}</code></small></p>
		</div>
			<div class="card-footer">
			<router-link :to="`/manage/challenge/${prob.id}`" class="btn btn-primary">
				Modify</router-link>
	    <button v-if="!!prob.deletedAt" href="#" class="btn btn-danger" @click="Open">Open</button>
      <button v-else href="#" class="btn btn-primary" @click="Open">Close</button>
    </div>
  </div>-->
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
