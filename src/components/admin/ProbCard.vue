<template>
  <div class="card">
		<div class="card-header">
			<span class="badge badge-pill badge-primary">{{ prob.author }}</span>
			<span v-if="prob.isOpen" class="badge badge-pill badge-info">열림</span>
			<span v-else class="badge badge-pill badge-dark">닫힘</span>
			<span class="badge badge-pill badge-warning">{{ prob.score }}pt</span>
		</div>
		<div class="card-body">
      <p><small><code class="card-text">added: {{ prob.created }}</code></small></p>
	    <p class="card-title"><code>{{ prob.title }}</code></p>
		</div>
			<div class="card-footer">
			<router-link :to="`/manage/challenge/${prob.category}/${prob._id}`" class="btn btn-primary">
				Modify</router-link>
	    <button v-if="!prob.isOpen" href="#" class="btn btn-danger" @click="probOpen">Open</button>
      <button v-else href="#" class="btn btn-primary" @click="probOpen">Close</button>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
	props: ['prob'],
	methods: {
		...mapActions([
			'FETCH_PROB_LIST',
			'UPDATE_PROB',
		]),
		probOpen() {
			const _id		 = this.prob._id
			const isOpen = !this.prob.isOpen ? '1' : '0'
			this.UPDATE_PROB({ _id, isOpen })
				.then(_=> this.FETCH_PROB_LIST(this.$route.params.cid))
		}
	}
}
</script>
<style scoped>
.card > div {
	padding: .4rem;
}
p {
	margin-bottom: 0;
}

.card-title > code {
	color: blue;
}

.card-title {
	margin-bottom: .5rem;

}	

.card-item {
  background-color: #fff;
  border-radius: 3px;
  margin: 8px;
  padding: 6px 20px 2px 8px;
  box-shadow: 0 1px 0 #ccc;
  position: relative;
}
.card-item a {
  text-decoration: none;
  color: #444;
  word-wrap: break-word;
  white-space: normal;
  overflow: hidden;
  display: block;
}
.card-item:hover,
.card-item:focus {
  background-color: rgba(0,0,0, .1);
  cursor: pointer;
}
.card-item-meta {
  font-size: 26px;
  padding: 5px 0 0 3px;
  color: #8c8c8c;  
}
.delete-card-btn {
  position: absolute;
  right: 10px;
  top: 4px;
  text-decoration: none;
  font-size: 18px;
  color: #aaa;
}
.card-body {
	padding: 0.7rem;
}
</style>
