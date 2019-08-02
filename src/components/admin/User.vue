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
		  <user-card class="col-sm-3" v-for="user in users" :key="`${user.uid}`" :user="user" />
		</div>
		<router-view />
	</div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { user } from '../../api'
import UserCard from './UserCard.vue'
export default {
	components: { UserCard },
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
			'FETCH_USERS',
		])
	}

}
</script>
<style scope>
.col-sm-3 {
	padding: 0 5px;
}
</style>
