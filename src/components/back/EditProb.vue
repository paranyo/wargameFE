<template>
	<modal class="modal-card">
		<div slot="header" class="modal-card-header">
			<div class="modal-card-header-title">
				<div class="closed">
					<a class="modal-close-btn" href="" @click.prevent="onClickClose">&times;</a>
				</div>
			</div>
		</div>
		<div slot="body" @keyup.enter="updateProb">
			<div class="form-group row">
				<input class="form-control" type="text" placeholder='문제 이름' :value="prob.title" 
					ref="title">
			</div>
			<div class="form-group row">
				<input class="form-control" type="text" placeholder='플래그' v-model="flag">
			</div>
			<div class="form-group row">
				<div class="col-4">
					<input class="form-control" type="text" placeholder='출제자' :value="prob.author"
						ref="author">
				</div>
				<div class="col">
					<input class="form-control" type="text" placeholder='스코어' :value="prob.score"
						ref="score">
				</div>
				<div class="col-4">
					<button v-if="isOpen" type="button" class="btn btn-primary" value="1"
						@click="open">Open</button>
					<button v-else type="button" class="btn btn-danger" @click="open" value="0">Close</button>
				</div>
	    </div>	
		</div>
		<div slot="footer">
			<button class='btn btn-primary' type="button" @click="updateProb">Modify Prob</button>
		</div>
	</modal>
</template>
<script>
import Modal from './Modal.vue'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
	components: {	Modal	},
	data() {
		return {
			isOpen: '',
			flag: '',
		}
	},
	computed: {
		...mapState({
			prob: 'prob'
		})
	},
	mounted() {
		this.$refs.title.focus()
	},
	created() {
		this.FETCH_ONEPROB({ cid: this.$route.params.cid, pid: this.$route.params.pid })
			.then(_=> this.isOpen = this.prob.isOpen)
	},
	methods: {
		...mapActions([
			'FETCH_PROB_LIST',
			'FETCH_ONEPROB',
			'UPDATE_PROB'
		]),
		open() {
			this.isOpen = !this.isOpen
		},
		onClickClose() {
			this.$router.push('/manage/challenge/' + this.$route.params.cid)
		},
		updateProb() {
			const _id		 = this.prob._id
			const title  = this.$refs.title.value.trim()
			const author = this.$refs.author.value.trim()
			const score  = this.$refs.score.value.trim()
			const flag	 = (this.flag == '' ) ? undefined : this.flag
			const isOpen = this.isOpen ? '1' : '0'
			if(isNaN(score)) return alert('숫자만 입력할 수 있습니다.')
			this.UPDATE_PROB({ _id, title, author, score, flag, isOpen })
				.then(_=> this.FETCH_PROB_LIST(this.$route.params.cid))
			this.$router.push('/manage/challenge/' + this.$route.params.cid)
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
