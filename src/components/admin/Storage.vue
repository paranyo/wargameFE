<template>
	<b-container fluid class="mx-auto">
		<b-row align-h="center">
				<b-button variant="info" @click="upload($event.target)">업로드</b-button>
		</b-row>
		<hr />
		<b-row class="px-3 mx-auto">
			<b-table sticky-header="600px" fixed responsive :items="files" :fields="fields" header-variant="light" class="text-center" :tbody-tr-class="rowClass">
				<template v-slot:table-colgroup="scope">
					<col key="id" style="width: 25px;" />
					<col key="originName" style="width: 100px;" />
					<col key="saveName" style="width: 200px;" />
					<col key="size" style="width: 25px;" />
					<col key="createdAt" style="width: 60px;" />
					<col key="uploader" style="width: 50px;" />
				</template>
				<template v-slot:cell(saveName)="row">
					<span @click="removeFile(row.item.id, row.item.originName)" style="onCursor">{{ row.item.saveName }}</span>
				</template>
			</b-table>
		</b-row>
		<b-modal id="upload" hide-footer title="파일 올리기">
			<b-form-file v-model="file" :state="Boolean(file)" placeholder="파일을 선택하거나 여기에 놓아주세요." drop-placeholder="파일을 놓아주세요" />
			<b-button class="mt-3" block variant="success" @click="sendFile()">전송</b-button>
		</b-modal>
	</b-container>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import axios from 'axios'
export default {
	computed: {
		...mapState([ 'files' ])
	},
	data() {
		return {
			fields: [
				{ key: 'id', label: '번호', sortable: true, sortDirection: 'asc' },
				{ key: 'originName', label: '기존 이름', sortable: false },
				{ key: 'saveName', label: '저장된 이름', sortable: false },
				{ key: 'size', label: '크기', sortable: true, sortDirection: 'desc' },
				{ key: 'createdAt', label: '업로드 날짜', sortable: true, sortDirection: 'asc', formatter: value => { return value.replace('T', ' ').substring(2, 19) } },
				{ key: 'uploader', label: '업로더', sortable: false },
			],
			file: '',
			infoModal: {
				id: 'info-modal',
				idx: 0,
				title: '',
				description: '',
				deletedAt: '',
			},
		}
	},
	created() {
		this.FETCH_FILES()
	},
	methods: {
		...mapActions([ 'FETCH_FILES', 'REMOVE_FILE' ]),
		rowClass(item, type) {
			if(!item.deletedAt) return
			else return 'table-danger'
		},
		upload(button) {
			this.$root.$emit('bv::show::modal', "upload", button)
		},
		sendFile() {
			let formData = new FormData()
			formData.append('file', this.file)
			axios.post('https://wargame2.run.goorm.io/manage/file/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((data) => {
				this.FETCH_FILES()
				this.$router.push('/settings/Storage')
			}).catch((e) => {
				console.error(e)
			})
			this.$root.$emit('bv::hide::modal', 'upload')
		},
		removeFile(id, name) {
			if(confirm(id + '번 파일 ' + "'" + name +  "'을 삭제하시겠습니까?\n 삭제하면 되돌릴 수 없습니다")) {
				this.REMOVE_FILE({ id }).then(() => {
					this.FETCH_FILES()
					this.$router.push('/settings/Storage')
				})
			}
		}
	}
}
</script>
<style scope>
.onCursor:hover {
	cursor: pointer;
}
</style>
