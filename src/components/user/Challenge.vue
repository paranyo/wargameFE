<template>
	<b-container fluid class="pt-5 mx-auto">
		<b-row align-h="center">
			<b-col cols="12" md="auto">
				<b-button-group size="md">
					<b-button :pressed.sync="options.state"
						v-for="tag in tags" :key="tag.title" variant="outline-secondary">
<!--						<router-link :to="`/challenge/${tag.title}`">{{ tag.title }}</router-link>-->
						{{ tag.title }}
					</b-button>
				</b-button-group>	
			</b-col>
		</b-row>
		<router-view />
	</b-container>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
	data() {
		return { 
			options: [],
		}
	},
	computed: {
		...mapState({
			tags: 'tags',
		})
	},
	created() {
		this.FETCH_TAGS()
		this.$nextTick(() => { this.fetchOptions })
	},
	methods: {
		...mapActions([
			'FETCH_TAGS',
		]),
		fetchOptions() {
			this.tags.map(t => this.options.push({
				text: t.title, 
				value: t.title, 
				state: true 
			}))
		},
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
