<template>
	<b-container fluid class="pt-5 mx-auto">
		<b-row align="center">
			<b-col cols="12">
			  <b-button-group>
					<b-button to="/settings/notice">Notice</b-button>
					<b-button to="/settings/user">User</b-button>
					<b-button to="/settings/challenge">Challenge</b-button>
					<b-dropdown right text="Log">
						<b-dropdown-item to="/settings/AuthLog">Auth Log</b-dropdown-item>
						<b-dropdown-item to="/settings/AllLog">All Log</b-dropdown-item>
					</b-dropdown>
			    <b-dropdown right text="Challenge" to="/settings/challenge">
		  	    <b-dropdown-item>Add Tag</b-dropdown-item>
			      <b-dropdown-item>Add Prob</b-dropdown-item>
			      <b-dropdown-divider></b-dropdown-divider>
			      <b-dropdown-item>Item 3</b-dropdown-item>
		  	  </b-dropdown>
		  	</b-button-group>
			</b-col>
		</b-row>
		<b-row class="mt-3">
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
