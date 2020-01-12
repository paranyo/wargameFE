<template>
	<div class="card bg-light mb-3 h-100">
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
			<p class="card-title">{{ substrTitle }}</p>
			<p class="card-text">{{ substrDesc }}</p>
			<p class="card-text" v-if="prob.src"><a :href="'//' + prob.src" target="_blank">LINK</a></p>
			<p class="card-text" v-if="prob.fileId">{{ !!prob.fileId ? 'DOWNLOAD' : 'No File' }}</p>
		</div>
		<div class="card-footer bg-transparent">
			<!--<p><small class="text-muted">updated {{ getAgo(prob.updatedAt) }}</small></p>-->
			<p><small class="text-muted">{{ prob.deletedAt != null ? 'Updated ' + getAgo(prob.deletedAt) : 'No updated' }}</small></p>
			<p><small class="text-muted">Created {{ getAgo(prob.createdAt) }}</small></p>
			<p><small class="text-muted" style="float: right">{{ prob.solver }} solvers</small></p>
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
				return this.prob.title.substr(0, 10) + '...'
			else
				return this.prob.title
		},
		substrDesc() {
			if(this.prob.description.length > 32)
				return this.prob.description.substr(0, 32) + '...'
			else
				return this.prob.description
		},
	},
	methods: {
		...mapActions([
			'FETCH_PROBS',
			'UPDATE_PROB',
		]),
		getAgo(ls) {
			let t = Math.floor((new Date() - new Date(ls)) / 1000)
			if((t / 86400) >= 365)
				if((t / 86400) == 1)	return Math.floor((t / (24 * 60 * 60)) / 365) + ' year ago'
				else									return Math.floor((t / (24 * 60 * 60)) / 365) + ' years ago'
			if((t / 86400) >= 30)
				if((t / 86400) == 1)	return Math.floor((t / (24 * 60 * 60)) / 30) + ' month ago'
				else									return Math.floor((t / (24 * 60 * 60)) / 30) + ' months ago'
			if((t / 86400) >= 1)
				if((t / 86400) == 1)	return Math.floor(t / 86400) + ' day ago'
				else									return Math.floor(t / 86400) + ' days ago'
			if(((t % 86400) / 3600) >= 1)
				if(((t % 86400) / 3600) == 1) return Math.floor((t % 86400) / 3600) + ' hour ago'
				else													return Math.floor((t % 86400) / 3600) + ' hours ago'
			if(((t % 3600) / 60) >= 1)
				if(((t % 3600) / 60) == 1)	return Math.floor((t % 3600) / 60) + ' minute ago'
				else												return Math.floor((t % 3600) / 60) + ' minutes ago'
			return t + 60 +  ' seconds ago'
		},
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
p {
	margin: 0
}
</style>
