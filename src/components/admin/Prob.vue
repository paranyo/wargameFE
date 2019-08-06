<template>
	<div class="container-fluid">
    <div class="container-align">
			<b-form-group>
				<b-form-checkbox-group 
					v-model="selected" :options="options" class="btn-group-lg" buttons @input="show">
				</b-form-checkbox-group>
				<button type="button" class="btn btn-danger btn-lg" @click="createTag">&plus;</button>
			</b-form-group>
		</div>
		<button type="button" class="btn btn-outline-primary" @click='createProb'>Add Prob</button>
		<AddTag v-if="isAddTag" />
		<AddProb v-if="isAddProb" :options="options"/>
		<router-view />
		<div class="row" style="text-align: center">
			<prob-card class="col-sm-3" v-for="prob in probs" :key="`${prob.id}`" :prob="prob" />
		</div>
	</div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import AddTag		from './AddTag.vue'
import AddProb	from './AddProb.vue'
import ProbCard	from './ProbCard.vue'
export default {
	data() {
		return {
			options: [],
			selected: [],
		}
	},
	components: { AddTag, AddProb, ProbCard },
	computed: {
		...mapState({
			isAddTag: 'isAddTag',
			isAddProb: 'isAddProb',
			tags: 'tags',
			probs: 'probs'
		}),
	},
	created() {
		this.FETCH_TAGS(),
		this.$nextTick(() => this.fetchOptions())
	},
	methods: {
		...mapActions([
			'FETCH_TAGS',
			'FETCH_PROBS',
		]),
		...mapMutations([
			'SET_IS_ADD_TAG',
			'SET_IS_ADD_PROB',
		]),
		createTag() {
			this.SET_IS_ADD_TAG(true)
		},
		createProb() {
			this.SET_IS_ADD_PROB(true)
		},
		fetchOptions() {
			this.tags.map(t => this.options.push({ text: t.title, value: t.title }))
		},
		show() {
			this.FETCH_PROBS({ tags: this.selected })
		}
	}
}
</script>
<style scope>

.container-align {
	width: 100%;
	text-align: center;
}
.btn-sizing {
	display: inline-block;
}
.center-menu {
 text-align: center;
}
a {
	color: #afafaf;
}
a:hover {
	color: #0f0f0f;
	text-decoration: none;
}
</style>
