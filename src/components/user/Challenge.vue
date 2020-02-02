<template>
	<b-container fluid class="pt-5 mx-auto">
		<b-row class="mx-auto" align="center" style="max-height: 30px;">
			<b-col cols="12" md="12">
				<b-form-group size="lg">
	        <b-form-checkbox v-model="allSelec" aria-describedby="options" aria-controls="options"@change="toggleAll" size="lg" :inderterminate="inderterminate"
						style="margin-right: 1rem; display: inline;">
						All
	        </b-form-checkbox>
				  <b-form-checkbox-group v-model="selected" :options="options" class="mb-3" name="options" id="options" @input="show" text-field="text" size="lg"
						style="display: inline" />
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
			allSelec: false,
			inderterminate: false,
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
	watch: {
		selected(newVal, oldVal) {
			if(newVal.length === 0) {
				this.inderterminate = false
				this.allSelec = false
			} else if (newVal.length === this.options.length) {
				this.inderterminate = false
				this.allSelec = true	
			} else {
				this.inderterminate = true
				this.allSelec = false
			}
		}
	},
	methods: {
		...mapActions([
			'FETCH_TAGS',
			'FETCH_PROBS'
		]),
		init() {
			this.FETCH_TAGS().then(() => this.fetchOptions())
		},
		toggleAll(checked) {
			if(checked) {
				this.options.map(s => {
					this.selected.push(s.value)
				})	
			} else {
				this.selected = []
			}
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
