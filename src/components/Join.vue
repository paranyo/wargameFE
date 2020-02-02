<template>
	<b-container fluid class="pt-5 mx-auto w-50">
		<form @submit.prevent="onSubmit">
			<div class="alert alert-light" role="alert">
				<h4 class="alert-heading">가입</h4>
					<span class="small" v-if="error">{{ error }} :(</span>
					<hr>
				<div class="form-group row">
					<input class="form-control" name="id" type="text" placeholder="아이디" v-model="id">
				</div>
				<div class="form-group row">
					<input class="form-control" name="nick" type="text" placeholder="닉네임" v-model="nick">
				</div>
				<b-row class="form-group">
					<input class="form-control" type="email" placeholder="이메일" v-model="email">
				</b-row>
				<div class="form-group row">
					<input class="form-control" name="pw" type="password" placeholder="비밀번호" v-model="pw">
				</div>
				<div class="form-group row">
					<input class="form-control" name="pw2" type="password" placeholder="비밀번호 확인" v-model="pw2">
				</div>
				<div class="form-group row">
					<button type="submit" class="btn btn-primary btn-lg btn-block" :disabled="invalidForm">가입</button>
				</div>
			</div>
		</form>
	</b-container>
</template>
<script>
import { sha256 } from 'js-sha256'
export default {
	data() {
		return {
			id: '',
			nick: '',
			pw: '',
			pw2: '',
			email: '',
			error: ''
		}
	},
	computed: {
		invalidForm() {
			return !this.id || !this.pw || !this.nick
		}
	},
	methods: {
		onSubmit() {
			let { id, nick, email, pw, pw2 } = this
			if(pw != pw2) return alert('비밀번호가 일치하지 않습니다')
			if(email == undefined)
				email = 'No'
			this.$store.dispatch('JOIN', { id, nick, email, pw: sha256(pw) })
				.then(() => {	this.$router.push('/login') })
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
