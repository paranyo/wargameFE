<template>
	<div class="container-fluid">
    <div class="container-align">
			<!--
				<label class="btn btn-secondary active" v-for="tag in tags" :key="tag.title" :title="tag.title">
					<input type="checkbox" :title="tag.title" autocomplete>
					<router-link class="btn-sizing" :to="`/manage/challenge/${tag.title}`">{{ tag.title }}</router-link>
				</label>
				-->
			<b-form-group>
				<b-form-checkbox-group :options="options" class="btn-group-lg" buttons @click="show"></b-form-checkbox-group>
				<button type="button" class="btn btn-danger btn-lg" @click="createTag">&plus;</button>
			</b-form-group>
		</div>
		<AddCategory v-if="isAddTag" />
		<router-view />
	</div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import AddCategory from './AddCategory.vue'
import ProbField	 from './ProbField.vue'
export default {
	data() {
		return {
			options: []
		}
	},
	components: { AddCategory, ProbField },
	computed: {
		...mapState({
			isAddTag: 'isAddTag',
			tags: 'tags'
		}),
	},
	created() {
		this.FETCH_TAGS(),
		this.$nextTick(() => this.fetchOptions())
	},
	methods: {
		...mapActions([
			'FETCH_TAGS',
		]),
		...mapMutations([
			'SET_IS_ADD_TAG'
		]),
		createTag() {
			this.SET_IS_ADD_TAG(true)
		},
		fetchOptions() {
			this.tags.map(t => this.options.push({ text: t.title }))
		},
		show() {
	
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
