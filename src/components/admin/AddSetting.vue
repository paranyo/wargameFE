<template>
	<modal class="modal-card">
		<div slot="header"><code>세팅 추가하기</code></div>
		<div slot="body">
			<b-row>
				<b-col md="4">
					<b-form-input type="text" v-model="name" :state="nameState"	placeholder="Enter setting name..." trim autofocus />
				</b-col>
				<b-col md="2">
					<b-form-input type="text" v-model="value" :state="valueState"	placeholder="Enter value..." trim />
				</b-col>
				<b-col md="3">
					<b-button block :class="{'btn-success': isValidInput }" :disabled="!isValidInput"	@click="onSubmit">작성</b-button>
				</b-col>
				<b-col md="3">
					<b-button block @click.prevent="SET_IS_ADD_SETTING(false)">취소</b-button>	
				</b-col>
			</b-row>
		</div>
	</modal>
</template>
<script>
import Modal from '../Modal.vue'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
	data() {
		return {
			name: '',
			value: '',
		}
	},
	computed: {
		nameState() {
			return !!this.name.length
		},
		valueState() {
			return !!this.value.length
		},
		isValidInput() {
			return !!this.name.length && !!this.value.length
		},
	},
	components: {	Modal	},
	methods: {
		...mapActions(['ADD_SETTING', 'FETCH_SETTING']),
		...mapMutations(['SET_IS_ADD_SETTING']),
		onSubmit() {
			this.ADD_SETTING({ name: this.name, value: this.value }).then(() => {
				this.FETCH_SETTING();
			})
			this.SET_IS_ADD_SETTING(false)
		},
	}
}
</script>
