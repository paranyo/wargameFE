<template>
	<b-container fluid class="pt-5 mx-auto">
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
		<b-row class="mx-auto">
			<b-col sm="4" lg="2" v-for="user in users" :key="`${user.uid}`" class="pt-3">
				<UserCard :user="user" />
			</b-col>
		</b-row>
		<router-view />
	</b-container>
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
</style>
