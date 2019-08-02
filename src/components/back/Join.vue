<template>
	<div class="container">
		<div class="center-block">
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
				<div class="form-group row">
					<input class="form-control" name="pw" type="password" placeholder="비밀번호" v-model="pw">
				</div>
				<div class="form-group row">
					<input class="form-control" name="pw2" type="password" placeholder="비밀번호 확인" v-model="pw2">
				</div>
				<div class="form-group row">
					<button type="submit" class="btn btn-primary btn-lg btn-block" :disabled="invalidForm">가입</button>
				</div>
				<router-link to="/Join">계정을 분실하였습니까?</router-link>
			</div>
		</form>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			id: '',
			nick: '',
			pw: '',
			pw2: '',
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
			const { id, nick, pw, pw2 } = this
			if(pw != pw2) return alert('비밀번호가 일치하지 않습니다');
			this.$store.dispatch('JOIN', { id, nick, pw })
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
