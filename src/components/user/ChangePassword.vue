<template>
	<modal class="modal-card">
		<div slot="header" class="modal-card-header">
			<p>Change Password</p>
		</div>
		<div slot="body">
			<input class="form-control mb-3" type="password" placeholder="Current Password" ref="curPW" v-model="curPW">
			<input class="form-control mb-3" type="password" placeholder="New Password" v-model="newPW">
			<input class="form-control mb-3" type="password" placeholder="Confirm Password" v-model="confirmPW">
			<b-button block form="add-tag-form" :disabled="!state" @click="onSubmit">Change</b-button>
			<b-button block @click="SET_IS_CHANGE_PASSWORD(true)">Cancel</b-button>
		</div>
	</modal>
</template>
<script>
import Modal from '../Modal.vue'
import { mapState, mapMutations, mapActions } from 'vuex'
import { sha256 } from 'js-sha256'
export default {
	components: {	Modal	},
	data() {
		return {
			curPW: '',
			newPW: '',
			confirmPW: '',
			isValidInput: false,
		}
	},
	computed: {
		state() {
			return !!this.curPW.trim().length && !!this.newPW.trim() && !!this.confirmPW.trim()
		},
	},
	methods: {
		...mapActions([
			'UPDATE_MYSTATUS',
		]),
		...mapMutations([
			'SET_IS_CHANGE_PASSWORD',
			'LOGOUT'
		]),
		onSubmit() {
			if(this.newPW != this.confirmPW)
				return alert('변경하려는 비밀번호가 서로 일치하지 않습니다')
			const uid				= this.$route.params.uid
			const curPW = sha256(this.curPW)
			const	newPW			= sha256(this.newPW)
			this.UPDATE_MYSTATUS({ curPW, newPW })
				.then(() => {
					this.SET_IS_CHANGE_PASSWORD(2)
				})
		}
	}
}
</script>
<style scoped>
p {
	margin: 0;
}
</style>
