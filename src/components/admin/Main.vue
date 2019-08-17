<template>
	<b-container fluid class="pt-5 mx-auto">
		<b-row align-h="center">
			<b-col cols="12" md="auto">
			  <b-button-group>
					<b-button to="/settings/notice">Notice</b-button>
					<b-button to="/settings/user">User</b-button>
		  	  <b-dropdown right text="Challenge">
		    	  <b-dropdown-item to="challenge">All Prob</b-dropdown-item>
		      	<b-dropdown-item @click="setAddProb">Add Prob</b-dropdown-item>
			      <b-dropdown-divider></b-dropdown-divider>
			      <b-dropdown-item @click="setAddTag">Add Tag</b-dropdown-item>
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
		<AddTag v-if="isAddTag" />
		<AddProb v-if="isAddProb" />
	</b-container>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import AddTag	 from './AddTag.vue'
import AddProb from './AddProb.vue'
export default {
	computed: {
		...mapState({
			isAddTag: 'isAddTag',
			isAddProb: 'isAddProb',
		}),
	},
	components: {
		AddTag, AddProb,
	},
	methods: {
		...mapMutations([
			'SET_IS_ADD_TAG',
			'SET_IS_ADD_PROB',
		]),
		setAddTag() {
			this.SET_IS_ADD_TAG(true)
		},
		setAddProb() {
			this.SET_IS_ADD_PROB(true)
		},
	},
}
</script>
<style>
</style>
