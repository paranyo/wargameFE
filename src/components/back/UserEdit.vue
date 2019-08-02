<template>
	<modal class="modal-card">
		<div slot="header" class="modal-card-header">
			<div class="modal-card-header-title">
				<div class="nick-form">
					<input class="form-control" type="text" :value="user.nick" :readonly="!toggleInput" @blur="onSubm"
						v-if="formChoice==1" @keyup.enter="onSubm" @click.prevent="toggleInput=!toggleInput" ref="inputForm">
					<input class="form-control" type="text" :value="user.level" :readonly="!toggleInput" @blur="onSubm"
						v-else @keyup.enter="onSubm" @click.prevent="toggleInput=!toggleInput" ref="inputForm">
				</div>
				<div class="closed">
					<a class="modal-close-btn" href="" @click.prevent="onClickClose">&times;</a>
				</div>
			</div>
		</div>
		<div slot="body">
			<p>
				{{ error }}
				<span class="badge badge-info">ID. {{ user.id }}</span>
				<span class="badge badge-primary" @click="formChoice=1">Nick. {{ user.nick }}</span>
				<span class="badge badge-primary" @click="formChoice=2">Lv. {{ user.level }}</span>
				<span class="badge badge-secondary" @click="formChoice=2">IPv4. {{ user.ip }}</span>
				<span class="badge badge-secondary">Created. {{ user.joinDate }}</span>
				<span v-if="user.isBan" class="badge badge-danger">Banned</span>
			</p>
		</div>
		<div slot="footer"></div>
	</modal>
</template>
<script>
import Modal from './Modal.vue'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
	components: {	Modal	},
	data() {
		return {
			toggleInput: false,
			formChoice: 1,
			error: '',
		}
	},
	computed: {
		...mapState({
			user: 'user'
		})
	},
	created() {
		this.FETCH_ONEUSER(this.$route.params.uid)
	},
	methods: {
		...mapActions([
			'FETCH_ONEUSER',
			'UPDATE_USER'
		]),
		onClickClose() {
			this.$router.push('/user')
		},
		onSubm() {
			this.toggleInput = !this.toggleInput
			if(this.formChoice == 1) {
				const nick = this.$refs.inputForm.value.trim()
				if(!nick) return
				this.UPDATE_USER({ id: this.user.id, nick })
					.then(() => this.FETCH_ONEUSER(this.$route.params.uid))
					.catch((err) => this.error = err.error)
			} else {
				const level = this.$refs.inputForm.value.trim()
				if(!level) return
				this.UPDATE_USER({ id: this.user.id, level})
					.then(() => this.FETCH_ONEUSER(this.$route.params.uid))
					.catch(err => this.error = err.response.data.err)
			}
		}
	}
}
</script>
<style scoped>
p {
	margin: 0;
}
.nick-form {
	width: 94%;
	display: inline-block;	
}
.closed {
	width: 6%;
	float: right;
	display: inline-block;	
}
.closed > a {
	float: right;
}
.modal-card .modal-container {
  min-width: 300px;
  max-width: 800px;
  width: 60%;
}
.modal-close-btn {
  top: 0px;
  font-size: 24px;
  text-decoration: none;
}
.modal-card-header {
  position: relative;
	width: 100%;
}
.card-body {
	padding: 0.8rem;
}
</style>
