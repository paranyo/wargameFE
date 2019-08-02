<template>
	<modal class="modal-card">
		<div slot="header" class="modal-card-header">
			<div class="modal-card-header-title">
				<h4 class="nick-form">
					<span class="badge badge-primary">{{ prob.score }}</span>&nbsp;
					{{ prob.title }}&nbsp;
					<small><code class="card-text">by {{ prob.author }}</code></small>
				</h4>
				<div class="closed">
					<a class="modal-close-btn" href="" @click.prevent="onClickClose">&times;</a>
				</div>
			</div>
		</div>
		<div slot="body" @keyup.enter="onSubm">
			<div>
				{{ prob.description }}
			</div>

			<p><small><code class="card-text">added: {{ prob.createdAt }}</code></small></p>
			<p><small><code class="card-text">updated: {{ prob.updatedAt }}</code></small></p>
		</div>
		<div slot="footer">
			<input type="text" class="form-control" placeholder="FLAG!" ref="flag" v-model="flag">
			<button class='btn' type="button" @click="onSubm" :disabled="!isValidInput"
				:class="{'btn-success': isValidInput}">Submit Flag</button>
		</div>
	</modal>
</template>
<script>
import Modal from '../Modal.vue'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
	components: {	Modal	},
	data() {
		return {
			flag: '',
			isValidInput: false,
		}
	},
	computed: {
		...mapState({
			prob: 'prob',
		})
	},
	watch: {
		flag(val) {
			this.isValidInput = !!val.trim().length
		}
	},
	created() {
		console.log( this.$route.params )
		this.FETCH_ONEPROB({ id: this.$route.params.id })
	},
	mounted() {
		this.$refs.flag.focus()
	},
	methods: {
		...mapActions([
			'FETCH_ONEPROB',
			'AUTH_PROB',
		]),
		open() {
			this.isOpen = !this.isOpen
		},
		onClickClose() {
			this.$router.push('/challenge')
		},
		onSubm() {
			const flag = this.flag
			this.AUTH_PROB({ id: this.$route.params.id, flag })
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
