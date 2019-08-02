<template>
	<div class="container-fluid">
    <div class="container-align">
			<div class="btn-group btn-group-lg btn-group-toggle" data-toggle="buttons"role="group" 
				aria-label="Basic example">
				<label class="btn btn-secondary" v-for="cate in categoryList" :key="cate.title" :id="cate.title">
					<input type="radio" name="options" :id="cate.title" autocomplete>
						<router-link class="btn-sizing" :to="`/manage/challenge/${cate.title}`">{{ cate.title }}</router-link>
					</input>
				</label>
				<button type="button" class="btn btn-secondary" @click="createCategory">&plus;</button>
			</div>
    </div>
		<AddCategory v-if="isAddCategory" />
		<router-view />
	</div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { challenge } from '../../api'
import AddCategory from './AddCategory.vue'
import ProbField	 from './ProbField.vue'
export default {
	components: { AddCategory, ProbField },
	computed: {
		...mapState({
			isAddCategory: 'isAddCategory',
			categoryList: 'categoryList',
		}),
	},
	created() {
		this.FETCH_CATEGORY_LIST()
	},
	methods: {
		...mapActions([
			'FETCH_CATEGORY_LIST',
		]),
		...mapMutations([
			'SET_IS_ADD_CATEGORY'
		]),
		createCategory() {
			this.SET_IS_ADD_CATEGORY(true)
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
