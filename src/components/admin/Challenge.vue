<template>
	<b-container fluid class="mx-auto">
		<b-row align-h="center">
			<b-col cols="2" md="auto">
				<b-button variant="info" @click="setAddProb">Add Prob</b-button>
			</b-col>
			<b-col cols="8" md="auto" align="center">
				<b-form-group size="md" md="auto">
					<b-form-checkbox-group button-variant="info"
							v-model="selected" :options="options" class="btn-group" buttons @input="show">
					</b-form-checkbox-group>
				</b-form-group>
			</b-col>
			<b-col cols="2" md="auto">
				<b-button variant="info" @click="setAddTag">Add Tag</b-button>
			</b-col>
		</b-row>
		<b-row class="px-3 mx-auto">
				<b-col v-for="prob in probs" :key="`${prob.id}`" class="mb-3" md=4 sm=4>
					<ProbCard :prob="prob" v-on:showTags="show" />
				</b-col>
		</b-row>
		<router-view />
		<AddTag v-if="isAddTag" v-on:fetchTags="fetchTags"/>
		<AddProb v-if="isAddProb" :options="options" />
	</b-container>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import ProbCard from './ProbCard.vue'
import AddTag		from './AddTag.vue'
import AddProb	from './AddProb.vue'
export default {
	data() {
		return {
			options: [],
			selected: [],
		}
	},
	components: { ProbCard, AddTag, AddProb },
	computed: {
		...mapState({
			tags: 'tags',
			probs: 'probs',
			isAddTag: 'isAddTag',
			isAddProb: 'isAddProb',
		}),
	},
	created() {
		this.fetchTags()
	},
	methods: {
		...mapMutations([
			'SET_IS_ADD_TAG',
			'SET_IS_ADD_PROB',
		]),
		...mapActions([
			'FETCH_TAGS',
			'FETCH_PROBS'
		]),
		fetchOptions() {
			this.options = []
			this.tags.map(t => { 
				this.options.push({ text: t.title, value: t.id }) 
				this.selected.push(t.id)
			})
		},
		setAddTag() {
			this.SET_IS_ADD_TAG(true)
		},
		setAddProb() {
			this.SET_IS_ADD_PROB(true)
		},
		show() {
			this.FETCH_PROBS({ tags: this.selected })
		},
		fetchTags() {
			this.FETCH_TAGS().then(() => this.fetchOptions())
		}
	}
}
</script>
<style scope>
</style>
