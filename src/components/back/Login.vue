<template>
	<div class="container">
		<div class="center-block">
		<form @submit.prevent="onSubmit">
			<div class="alert alert-light" role="alert">
				<h4 class="alert-heading">로그인</h4>
					<span class="small" v-if="error">{{ error }} :(</span>
					<hr>
				<div class="form-group row">
					<input class="form-control" name="id" type="text" placeholder="아이디" v-model="id">
				</div>
				<div class="form-group row">
					<input class="form-control" name="pw" type="password" placeholder="비밀번호" v-model="pw">
				</div>
				<div class="form-group row">
					<button type="submit" class="btn btn-primary btn-lg btn-block" :disabled="invalidForm">로그인</button>
				</div>
				<router-link to="/Join">계정이 없거나 분실하였습니까?</router-link>
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
			pw: '',
			returnPath: '',
			error: ''
		}
	},
	computed: {
		invalidForm() {
			return !this.id || !this.pw
		}
	},
	created() {
		this.returnPath = this.$route.query.returnPath || '/'
	},
	methods: {
		onSubmit() {
			const {id, pw} = this
			this.$store.dispatch('LOGIN', { id, pw })
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
