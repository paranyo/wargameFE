<template>
	<div class="container-fluid">
		<div class="row">
			<nav class="navbar navbar-light bg-light">
				<button v-if="!category.isOpen" type="button" class="btn btn-outline-danger" @click="updateCategory">
					{{ category.title }} Challenge Open</button>
				<button v-else type="button" class="btn btn-outline-primary" @click="updateCategory">
					{{ category.title }} Challenge Close</button>
				<button type="button" class="btn btn-outline-primary" @click="createProb">Add Prob</button>
			</nav>
		</div>
		<div class="row" style="text-align: left">
		  <prob-card class="col-sm-3" v-for="prob in probs" :key="`${prob._id}`" :prob="prob" />
		</div>
		<AddProb v-if='isAddProb'/>
		<router-view />
	</div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { prob } from '../../api'
import AddProb  from './AddProb.vue'
import ProbCard from './ProbCard.vue'
export default {
	components: { ProbCard, AddProb },
	computed: {
		...mapState({
			probs: 'probs',
			category: 'category',
			isAddProb: 'isAddProb',
		}),
	},
	created() {
		this.FETCH_PROB_LIST(this.$route.params.cid)
	},
	watch: {
		$route() {
			this.FETCH_PROB_LIST(this.$route.params.cid)
		}
	},
	methods: {
		...mapActions([
			'FETCH_PROB_LIST',
			'UPDATE_CATEGORY',
		]),
		...mapMutations([
			'SET_IS_ADD_PROB',
		]),
		updateCategory() {
			const id		 = this.$route.params.cid
			const isOpen = !this.category.isOpen ? '1' : '0'
			this.UPDATE_CATEGORY({ id, isOpen }).then(_=> this.FETCH_PROB_LIST(id))
		},
		createProb() {
			this.SET_IS_ADD_PROB(true)
		}
	}

}
</script>
<style scope>
.navbar {
	width: 100%;
}
.navbar > button {
	width: 30%;
}
.col-sm-3 {
	padding: 0 5px;
}
</style>
