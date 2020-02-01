<template>
	<b-container fluid class="pt-5 mx-auto">
		<b-row class="mx-auto" align="center" style="max-height: 30px;">
			<b-col cols="12" md="12">
				<b-form-group size="lg">
				  <b-form-checkbox-group v-model="selected" :options="options" class="mb-3" @input="show" text-field="text" size="lg" />
				</b-form-group>
			</b-col>
		</b-row>
		<hr />
		<b-row>
			<b-col v-for="prob in probs" :key="`${prob.id}`" class="mb-3" lg=3 md=4 sm=6>
				<ProbCard :prob="prob" v-on:showTags="show" class="probCard" />
			</b-col>
		</b-row>
		<router-view @update="init"/>
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
		this.init()
	},
	methods: {
		...mapActions([
			'FETCH_TAGS',
			'FETCH_PROBS'
		]),
		init() {
			this.FETCH_TAGS().then(() => this.fetchOptions())
		},
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
<style>
.probCard:hover {
	cursor: pointer;
}
</style>
