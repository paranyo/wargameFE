<template>
	<div class="container-fluid">
		<div class="row" style="text-align: left">
			<div class="card" style="width: 14rem;" v-for="prob in probs">
			  <div class="card-body">
			    <h5 class="card-title">
						<span class="badge badge-primary">{{ prob.score }}</span>
						{{ prob.title }}
					</h5>
			    <h6 class="card-subtitle mb-2 text-muted">{{ prob.author }}</h6>
			    <p class="card-text"> Description </p>
			    <router-link :to="`/challenge/${prob.id}`" class="card-link">View</router-link>
			    <a href="#" class="card-link">Another link</a>
			  </div>
			</div>
		</div>
		<router-view />
	</div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { prob } from '../../api'
export default {
	computed: {
		...mapState({
			probs: 'probs',
		}),
	},
	created() {
		this.FETCH_PROBS()
	},
	watch: {
		$route() {
			this.FETCH_PROBS()
		}
	},
	methods: {
		...mapActions([
			'FETCH_PROBS',
		]),
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
