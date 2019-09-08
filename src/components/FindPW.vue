<template>
	<b-container fluid class="pt-5 mx-auto w-50">
		<form @submit.prevent="onSubmit">
			<div class="alert alert-light" role="alert">
				<h4 class="alert-heading">비밀번호 찾기</h4>
					<span class="small" v-if="error">{{ error }} :(</span>
					<hr>
				<div class="form-group row">
					<input class="form-control" type="text" placeholder="아이디" v-model="id">
				</div>
				<div class="form-group row">
					<input class="form-control" type="email" placeholder="이메일" v-model="email">
				</div>
				<div class="form-group row">
					<button type="submit" class="btn btn-primary btn-lg btn-block" :disabled="invalidForm">발송</button>
				</div>
				<router-link to="/Login">로그인</router-link>
			</div>
		</form>
	</b-container>
</template>
<script>
import { mapActions } from 'vuex'
import { sha256 } from 'js-sha256'
export default {
	data() {
		return {
			id: '',
			email: '',
			returnPath: '',
			error: ''
		}
	},
	computed: {
		invalidForm() {
			return !this.id || !this.email
		}
	},
	created() {
		this.returnPath = '/Login'
	},
	methods: {
		...mapActions([
			'FIND_PASSWORD'
		]),
		onSubmit() {
			const { id, email } = this
			this.FIND_PASSWORD({ uid: id, email })
				.then((data) => {
					this.$router.push(this.returnPath) 
				})
				.catch(err => { this.error = err.response.data.error })
		}
	}
}
</script>
<style scoped>
.alert-danger p {
	color: red;
}
.container > .center-block {
	-webkit-box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.11);
	-moz-box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.11);
	box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.11);
	border-radius: 5px;
}
.container {
	float: center;
}
.center-block {
	width: 80%;
	margin: 0 auto;
}
h4 {
	display: inline;
}
</style>
