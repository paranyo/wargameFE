<template>
	<b-container fluid class="mx-auto">
		<b-row align-h="center">
				<b-button variant="info" @click="">세팅 추가</b-button>
		</b-row>
		<hr />
		<b-row class="px-3 mx-auto">
			<b-table sticky-header="600px" responsive :items="settings" :fields='fields' :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
				header-variant="light" class="text-center" :tbody-tr-class="rowClass">
				<template v-slot:table-colgroup="scope">
					<col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'name' ? '300px' : '45px' }">
				</template>
				<template v-slot:cell(name)="row">
					<span @click="info(row.item, $event.target)" class="infoModal">{{ row.item.name }}</span>
				</template>
			</b-table>
		</b-row>
		<b-modal :id="infoModal.id" @hide="resetInfoModal" hide-footer>
			<template v-slot:modal-header>
				<b-form-input type="search" v-model="infoModal.name" />
			</template>
			<b-form-textarea rows="3" max-rows="8" v-model="infoModal.value" />
			<b-button class="mt-3" block @click="onSubmit(infoModal.idx)"  variant="success">Edit</b-button>
			<b-button block @click="$bvModal.hide(infoModal.id)">Close Me</b-button>
		</b-modal>
	</b-container>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
	data() {
		return {
			fields: [
				{ key: 'id', label: '번호', sortable: true, sortDirection: 'desc' },
				{ key: 'name', label: '이름', sortable: false },
				{ key: 'value', label: '값', sortable: false },
			],
			sortBy: 'id',
			sortDesc: true,
			infoModal: {
				id: 'info-modal',
				idx: 0,
				name: '',
				value: '',
				deletedAt: '',
			},
		}
	},
	computed: {
		...mapState(['settings']),
	},
	created() {
		this.FETCH_SETTING()
	},
	methods: {
		...mapActions([ 'FETCH_SETTING', 'UPDATE_SETTING']),
		rowClass(item, type) {
			if(!item.deletedAt) return
			if(item.id === 1) return 'table-success'
			if(item.deletedAt !== null) return 'table-danger'
		},
		onSubmit(id) {
			const value = this.infoModal.value
			this.UPDATE_SETTING({ id, value }).then(() => {
				this.FETCH_SETTING()
				this.$router.push('/settings/Setting')
				this.$root.$emit('bv::hide::modal', this.infoModal.id)
			})
		},
		info(item, button) {
			this.infoModal.idx	 = item.id
			this.infoModal.name = item.name
			this.infoModal.value = item.value
			this.infoModal.deletedAt = item.deletedAt
			this.$root.$emit('bv::show::modal', this.infoModal.id, button)
		},
		resetInfoModal() {
			this.infoModal.name = ''
			this.infoModal.value = ''
		},

	}
}
</script>
<style scope>
.infoModal {
	color: #000000;
	font-wegiht: bolder;
	cursor: pointer;
}
</style>
