<template>
	<b-container fluid class="pt-5 mx-auto">
		<b-row align-h="center">
			<b-col cols="12" md="auto">
			  <b-button-group>
					<b-button to="/settings/notice">Notice</b-button>
					<b-button to="/settings/user">User</b-button>
					<b-button to="/settings/challenge">Challenge</b-button>
		  	  <b-dropdown right text="Challenge">
		    	  <b-dropdown-item to="challenge">All Prob</b-dropdown-item>
		      	<b-dropdown-item>Add Prob</b-dropdown-item>
			      <b-dropdown-divider></b-dropdown-divider>
			      <b-dropdown-item>Add Tag</b-dropdown-item>
			    </b-dropdown>
			    <b-dropdown right split text="Challenge" to="/settings/challenge">
		  	    <b-dropdown-item>Add Tag</b-dropdown-item>
			      <b-dropdown-item>Add Prob</b-dropdown-item>
			      <b-dropdown-divider></b-dropdown-divider>
			      <b-dropdown-item>Item 3</b-dropdown-item>
		  	  </b-dropdown>
		  	</b-button-group>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<hr class="my-3">
			</b-col>
		</b-row>
		<b-row>
			<router-view />
		</b-row>
	</b-container>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
}
</script>
<style>
</style>
