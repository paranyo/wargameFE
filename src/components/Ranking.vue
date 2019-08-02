<template>
	<div class="container-fluid">
		<div class="row">
			<nav class="navbar navbar-light bg-light">
 				<form class="form-inline">
   				<div class="input-group">
   		  		<div class="input-group-prepend">
    		    		<span class="input-group-text" id="basic-addon1">@</span>
  		   			</div>
 		    		<input type="text" class="form-control" placeholder="Search Keyword"aria-label="Search Keyword"
						 	aria-describedby="basic-addon1">
		    	</div>
		  	</form>
			</nav>
		</div>
		<div class="row">
			<div v-for="user in users">
				<span>Lv. {{ user.level }} <small> n. {{ user.nick }}</small></span>
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
			users: 'users'
		}),
	},
	created() {
		this.FETCH_USERS()
	},
	methods: {
		...mapActions([
			'FETCH_USERS'
		])
	}
}
</script>
<style scope>
.col-sm-3 {
	padding: 0 5px;
}
</style>
