<template>
	<b-container fluid class="mx-auto">
		<b-row align-h="center">
				<b-button variant="info" @click="setAddNotice">글쓰기</b-button>
		</b-row>
		<hr />
		<b-row class="px-3 mx-auto">
			<b-table sticky-header="600px" responsive :items="notice" :fields='fields' :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
				header-variant="light" class="text-center" :tbody-tr-class="rowClass">
				<template v-slot:table-colgroup="scope">
					<col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'title' ? '300px' : '45px' }">
				</template>
				<template v-slot:cell(title)="row">
					<span @click="info(row.item, $event.target)" class="infoModal" v-html="row.item.title"></span>
				</template>
			</b-table>
		</b-row>
		<b-modal :id="infoModal.id" @hide="resetInfoModal" hide-footer>
			<template v-slot:modal-header>
				<b-form-input type="search" v-model="infoModal.title" />
			</template>
			<b-form-textarea rows="3" max-rows="8" v-model="infoModal.description" />
			<b-form-radio-group buttons button-variant="outline-danger" v-model="infoModal.isOpen" class="mt-3 w-100">
				<b-form-radio value="1">Open</b-form-radio>
				<b-form-radio value="0">Close</b-form-radio>
			</b-form-radio-group>
			<b-button class="mt-3" block @click="onSubmit(infoModal.idx)"  variant="success">Edit</b-button>
			<b-button block @click="$bvModal.hide(infoModal.id)">Close Me</b-button>
		</b-modal>
		<AddNotice v-if="isAddNotice" />
	</b-container>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import AddNotice from './AddNotice.vue'
export default {
	data() {
		return {
			fields: [
				{ key: 'id', label: '번호', sortable: true, sortDirection: 'desc' },
				{ key: 'title', label: '제목', sortable: false },
				{ key: 'createdAt', label: '생성 날짜', sortable: false, formatter: value => { return value.replace('T', ' ').substring(2, 19) } },
				{ key: 'author', label: '작성자', sortable: false }
			],
			sortBy: 'id',
			sortDesc: true,
			infoModal: {
				id: 'info-modal',
				idx: 0,
				title: '',
				description: '',
				isOpen: false,
				deletedAt: '',
			},
		}
	},
	components: { AddNotice },
	computed: {
		...mapState([ 'notice', 'isAddNotice' ]),
	},
	created() {
		this.FETCH_NOTICE()
	},
	methods: {
		...mapMutations([ 'SET_IS_ADD_NOTICE' ]),
		...mapActions([ 'FETCH_NOTICE', 'UPDATE_NOTICE']),
		rowClass(item, type) {
			if(!item.deletedAt) return
			if(item.id === 1) return 'table-success'
			if(item.deletedAt !== null) return 'table-danger'
		},
		onSubmit(id) {
			const { title, description, isOpen } = this.infoModal
			if(!title.trim()) return alert('제목은 빈칸일 수 없습니다')
			this.UPDATE_NOTICE({ id, title, description, isOpen }).then(() => {
				this.FETCH_NOTICE()
				this.$router.push('/settings/SetNotice')
				this.$root.$emit('bv::hide::modal', this.infoModal.id)
			})
		},
		setAddNotice() {
			this.SET_IS_ADD_NOTICE(true)
		},

		info(item, button) {
			this.infoModal.idx	 = item.id
			this.infoModal.title = item.title
			this.infoModal.description = item.description
			this.infoModal.isOpen = !item.deletedAt * 1
			this.$root.$emit('bv::show::modal', this.infoModal.id, button)
		},
		resetInfoModal() {
			this.infoModal.title = ''
			this.infoModal.description = ''
			this.infoModal.deletedAt = ''
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
