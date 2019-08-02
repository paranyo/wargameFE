<template>
	<div class="container-fluid">
    <div class="container-align">
			<div class="btn-group btn-group-lg btn-group-toggle" data-toggle="buttons"role="group" 
				aria-label="Basic example">
				<nav aria-label="breadcrumb">
				  <ol class="breadcrumb">
				    <li class="breadcrumb-item active" v-for="tag in tags">
							<router-link :to="`/challenge/${tag.title}`">{{ tag.title }}</router-link>
						</li>
				  </ol>
				</nav>
			</div>
    </div>
		<router-view />
	</div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
	computed: {
		...mapState({
			tags: 'tags',
		})
	},
	created() {
		this.FETCH_TAGS()
	},
	methods: {
		...mapActions([
			'FETCH_TAGS',
		]),
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
