<template>
	<b-container fluid class="mx-auto">
		<b-row align-h="center">
			<b-col cols="2" md="auto">
				<b-button variant="info" @click="setAddNotice">글쓰기</b-button>
			</b-col>
		</b-row>
		<b-row class="px-3 mx-auto">
			{{ notice }}
		</b-row>
		<router-view />
		<AddNotice v-if="isAddNotice" />
	</b-container>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import AddNotice from './AddNotice.vue'
export default {
	components: { AddNotice },
	computed: {
		...mapState([ 'notice', 'isAddNotice' ]),
	},
	created() {
		this.FETCH_NOTICE()
	},
	methods: {
		...mapMutations([
			'SET_IS_ADD_NOTICE',
		]),
		...mapActions([ 'FETCH_NOTICE' ]),
		setAddNotice() {
			this.SET_IS_ADD_NOTICE(true)
		}
	}
}
</script>
<style scope>
</style>
