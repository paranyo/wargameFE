<template>
	<b-container fluid class="pt-5 mx-auto w-75">
		<b-row class="pt-5">
			<h2>해결한 문제들</h2>
		</b-row>
		<b-row class="px-3 mx-auto">
			<b-table sticky-header fixed responsive :items="correct" :fields="fields" sort-by.sync="id" 
				sort-desc.sync="true"	heade-variant="light" class="text-center" :tbody-tr-class="rowClass">
				<template v-slot:table-colgroup="scope">
					<col key="id" style="width: 10px" />
					<col key="title" style="width: 100px" />
					<col key="score" style="width: 20px" />
					<col key="tag" style="width: 20px" />
					<col key="createdAt" style="width: 25px" />
				</template>
				<template v-slot:cell(title)="row">
					<span @click="showProb(row.item.pid)" class="viewRow">{{ row.item.title }}</span>
				</template>
			</b-table>
		</b-row>
		<router-view />
	</b-container>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
	data() {
		return {
			fields: [
				{ key: 'id', label: '번호', sortable: true, formatter: value => { return value } },
				{ key: 'title', label: '제목', sortable: true },
				{ key: 'score', label: '스코어', sortable: true, formatter: value => { return value + '점' } },
				{ key: 'tag', label: '분야', sortable: true },
				{ key: 'createdAt', label: '제출 시각', sortable: true,	formatter: value => {
					return value.replace('T', ' ').substring(2, 19) }
				}
			]
		}
	},
	computed: {
		...mapState(['correct']),
	},
	created() {
		this.FETCH_MYCORRECT()
	},
	methods: {
		...mapActions(['FETCH_MYCORRECT']),
		...mapMutations(['SET_RETURNPATH']),
		rowClass(item, type) {
			return ''
		},
		showProb(id) {
			this.SET_RETURNPATH('/myCorrect')
			this.$router.push('/myCorrect/' + id)
			this.$nextTick(() => {
				this.$root.$emit('bv::show::modal', 'prob-view')
			})
		},
	}
}
</script>
<style scope>
.viewRow:hover {
	cursor: pointer;
	text-align: center;
}
</style>
