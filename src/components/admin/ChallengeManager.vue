<template>
	<div class="container-fluid">
    <div class="container-align">
			<div class="btn-group btn-group-lg btn-group-toggle" data-toggle="buttons" role="group">
				<label class="btn btn-secondary" v-for="tag in tags" :key="tag.title" :title="tag.title">
					<input type="radio" name="options" :title="tag.title" autocomplete>
					<router-link class="btn-sizing" :to="`/manage/challenge/${tag.title}`">{{ tag.title }}</router-link>
				</label>
					<button type="button" class="btn btn-secondary" @click="createTag">&plus;</button>
    	</div>
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
	components: { AddCategory, ProbField },
	computed: {
		...mapState({
			isAddTag: 'isAddTag',
			tags: 'tags'
		}),
	},
	created() {
		this.FETCH_TAGS()
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
