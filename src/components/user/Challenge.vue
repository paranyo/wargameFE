<template>
	<b-container fluid class="pt-5 mx-auto">
		<b-row class="mx-auto" align="center">
			<b-col cols="12" md="12">
				<b-form-group size="md">
					<b-form-checkbox-group button-variant="info"
							v-model="selected" :options="options" class="btn-group" buttons @input="show">
					</b-form-checkbox-group>
				</b-form-group>
			</b-col>
		</b-row>
		<b-row class="px-3 mx-auto">
			<b-col v-for="prob in probs" :key="`${prob.id}`" class="mb-3" lg=3 md=4 sm=6>
				<ProbCard :prob="prob" v-on:showTags="show" />
			</b-col>
		</b-row>
		<router-view />
	</b-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'
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
				this.options.push({ text: t.title, value: t.id }) 
				this.selected.push(t.id)
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
