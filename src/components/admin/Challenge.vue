<template>
	<b-container fluid class="mx-auto">
		<b-row align-h="center">
			<b-col cols="12" md="auto">
				<b-form-group size="md">
					<b-form-checkbox-group button-variant="outline-secondary"
							v-model="selected" :options="options" class="btn-group" buttons @input="show">
					</b-form-checkbox-group>
				</b-form-group>
			</b-col>
		</b-row>
		<b-row class="px-3 mx-auto">
			<b-col sm="4" lg="2" v-for="prob in probs" :key="`${prob.id}`">
				<ProbCard :prob="prob" />
			</b-col>
		</b-row>
		<router-view />
	</b-container>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import ProbCard from './ProbCard.vue'
export default {
	data() {
		return {
			options: [],
			selected: [],
		}
	},
	components: { ProbCard },
	computed: {
		...mapState({
			tags: 'tags',
			probs: 'probs',
		}),
	},
	created() {
		this.FETCH_TAGS().then(() => this.fetchOptions())
	},
	methods: {
		...mapActions([
			'FETCH_TAGS',
			'FETCH_PROBS'
		]),
		fetchOptions() {
			this.tags.map(t => { 
				this.options.push({ text: t.title, value: t.title }) 
				this.selected.push(t.title)
			})
		},
		show() {
			this.FETCH_PROBS({ tags: this.selected })
		},
	}
}
</script>
<style scope>
</style>
