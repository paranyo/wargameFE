<template>
	<b-container fluid class="pt-5 mx-auto w-75">
		<b-row>
			<b-col md=4>
		    <b-card img-src="https://placekitten.com/g/300/450" img-alt="Image" img-top class="h-100">
	  	    <div slot="footer" style="text-align: center;">
						Lv. <small class="text-muted">{{ myInfo.level }}</small>
					</div>
		    </b-card>
			</b-col>
			<b-col md=8>
				<b-row>
					<b-col md="6">
						<div class="input-group">
							<div class="input-group-prepend">
								<div class="input-group-text">ID</div>
							</div>
							<input class="form-control" type="text" placeholder="UID" :value="myInfo.uid" readonly>
						</div>
					</b-col>
					<b-col md="6">
						<div class="input-group">
							<div class="input-group-prepend">
								<div class="input-group-text">Nickname</div>
							</div>
							<input class="form-control" type="text" placeholder="UID" :value="myInfo.nick" readonly>
						</div>
					</b-col>
				</b-row>
				<b-row>
					<b-col md="12">
						<div class="input-group">
							<div class="input-group-prepend">
								<div class="input-group-text">Mail</div>
							</div>
							<input class="form-control" type="text" placeholder="test123@test.com" readonly>
						</div>
					</b-col>
				</b-row>
				<b-row>
					<b-col md="12">
						<div class="input-group">
							<div class="input-group-prepend">
								<div class="input-group-text">IPv4</div>
							</div>
							<input class="form-control" type="text" placeholder="IPv4 Address" :value="myInfo.ip" readonly>
						</div>
					</b-col>
				</b-row>
				<b-row>
					<b-col md=12>	
						<b-button block button-variant="outline-secondary" @click="setChangePassword">비밀번호 변경</b-button>
					</b-col>
				</b-row>
			</b-col>
		</b-row>
		<b-row>
			<b-col md=12>
				Solved probs
			</b-col>
		</b-row>
		<ChangePassword v-if="isChangePassword" />
	</b-container>
</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import ChangePassword from './ChangePassword.vue'
export default {
	components: { ChangePassword },
	computed: {
		...mapState({
			myInfo: 'myInfo',
			isChangePassword: 'isChangePassword',
		}),	
	},
	methods: {
		...mapMutations([
			'SET_IS_CHANGE_PASSWORD',
		]),
		setChangePassword() {
			this.SET_IS_CHANGE_PASSWORD(true)
		},
	},
	
}
</script>
<style scoped>
.input-group {
	margin-bottom: 10px;
}
</style>
