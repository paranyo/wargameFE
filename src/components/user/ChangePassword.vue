<template>
	<modal class="modal-card">
		<div slot="header" class="modal-card-header">
			<p>Change Password</p>
		</div>
		<div slot="body">
			<input class="form-control mb-3" type="password" placeholder="Current Password" ref="currentPW"
				v-model="currentPW">
			<input class="form-control mb-3" type="password" placeholder="New Password" v-model="newPW">
			<input class="form-control mb-3" type="password" placeholder="Confirm Password" v-model="confirmPW">
			<b-button block form="add-tag-form" :disabled="!state" @click="onSubmit">Change</b-button>
			<b-button block @click="SET_IS_CHANGE_PASSWORD(false)">Cancel</b-button>
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
			currentPW: '',
			newPW: '',
			confirmPW: '',
			isValidInput: false,
		}
	},
	computed: {
		state() {
			return !!this.currentPW.trim().length && !!this.newPW.trim() && !!this.confirmPW.trim()
		},
	},
	methods: {
		...mapActions([
			'UPDATE_USER',
		]),
		...mapMutations([
			'SET_IS_CHANGE_PASSWORD'
		]),
		onSubmit() {/*
			if(!this.title.trim()) return
			this.ADD_TAG(this.title)
			this.SET_IS_ADD_TAG(false)
			this.$emit('fetchTags')*/
			if(this.newPW != this.confirmPW)
				return alert('변경하려는 비밀번호가 서로 일치하지 않습니다')
			const uid				= this.$route.params.uid
			const currentPW = this.currentPW
			const	newPW			= this.newPW
			//this.CHANGE_PASSWORD({ uid, currentPW, newPW }) 내일 CHANGE 생성하깅~
		}
	}
}
</script>
<style scoped>
p {
	margin: 0;
}
</style>
