<template>
	<b-container fluid class="pt-5 mx-auto">
		<!-- Main -->
		<b-jumbotron :lead="MainTitle">
			<span v-html="MainDescription" />
			<hr />
			<b-button variant="primary" href="#">Discord</b-button>
	  </b-jumbotron>
		<!-- Notice-->
		<div>
	    <b-table sticky-header fixed responsive :items="notice.slice(1, notice.length)" :fields='fields' :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
				head-variant="light" class="text-center" :tbody-tr-class="rowClass">
				<template v-slot:table-colgroup="scope">
					<col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'title' ? '300px' : '40px' }">
				</template>
				<template v-slot:cell(title)="row">
					<span @click="info(row.item, $event.target)" class="infoModal">{{ row.item.title }}</span>
				</template>
			</b-table>
		</div>
		<b-modal :id="infoModal.id" :title="infoModal.title" @hide="resetInfoModal">
		  <span v-html="infoModal.description"></span>
      <template v-slot:modal-footer>
				<span></span>
			</template>
		</b-modal>
	</b-container>
</div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
	data() {
		return {
			sortBy: 'id',
			sortDesc: true,
			fields: [
				{	key: 'id', label: '번호', sortable: true, sortDirection: 'desc',
					formatter: value => {
						return value - 1	
					}
				},
				{ key: 'title', label: '제목', sortable: false },
				{ key: 'createdAt', label: '생성 날짜', sortable: false, 
					formatter: value => {
						return value.replace('T', ' ').substring(2, 19)
					}
				},
				{ key: 'author', label: '작성자', sortable: false }
			],
			infoModal: {
				id: 'info-modal',
				title: '',
				description: ''
			},
			MainTitle: '',
			MainDescription: '',
		}
	},
	computed: {
		...mapState([ 'notice' ]),
	},
	created() {
		this.FETCH_NOTICE().then(() => {
			this.MainTitle = this.notice[0].title	
			this.MainDescription = this.notice[0].description
		})
	},
	methods: {
		...mapActions([ 'FETCH_NOTICE' ]),
		rowClass(item, type) {
			if(!item.deletedAt) return
			if(item.deletedAt !== null) return 'table-danger'
		},
		info(item, button) {
			this.infoModal.title = item.title
			this.infoModal.description = item.description,
			this.$root.$emit('bv::show::modal', this.infoModal.id, button)
		},
		resetInfoModal() {
			this.infoModal.title = ''
			this.infoModal.description = ''
		},	
	},
}
</script>
<style scoped>
.infoModal:hover {
	color: #000000;
	font-weight: bolder;
	cursor: pointer;
}
</style>
