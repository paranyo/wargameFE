<template>
	<b-container fluid class="mx-auto w-75 pt-5">
		<b-row align-h="center">
				<b-button variant="info" @click="setAddAuction">등록</b-button>
		</b-row>
		<hr />
		<b-row class="px-3 mx-auto">
			<b-table sticky-header="600px" responsive :items="auction" :fields='fields' :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
				header-variant="light" striped outlined hover v-if="auction.length > 0" @row-clicked="(item) => bid(item.id, item.name)">
				<template v-slot:table-colgroup="scope">
					<col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'name' ? '300px' : '60px' }">
				</template>
				<template v-slot:cell(name)="row">
					<span class="info">
						<div class="item">
							<img :src="`http://maplestory.io/api/KMS/323/item/${row.item.itemCode}/icon`" />
						</div>
						{{ row.item.name }}
					</span>
				</template>
				<template v-slot:cell(end)="row">
					{{ row.item.end }}
				</template>
				<template v-slot:cell()="row">
					<span class="info">{{ row.value }}</span>
				</template>
			</b-table>
			<p v-else>등록된 상품이 없습니다.</p>
		</b-row>
		<AddAuction v-if="isAddAuction" />
	</b-container>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import AddAuction from './AddAuction.vue'
export default {
	data() {
		return {
			fields: [
				{ key: 'name', label: '아이템 이름', sortable: false },
				{ key: 'price', label: '시작가', sortable: true, tdClass: 'align-middle' },
				{ key: 'bid', label: '현재가', sortable: true, formatter: value => { return value == null ? 'No bid' : value }, tdClass: 'align-middle' },
				{ key: 'end', label: '남은 시간', sortable: true, tdClass: 'align-middle' },
				{ key: 'owner', label: '등록자', sortable: false, tdClass: 'align-middle' },
				{ key: 'cate', label: '분류', sortable: false, tdClass: 'align-middle' },
			],
			sortBy: 'id',
			sortDesc: true,
		}
	},
	components: { AddAuction },
	computed: {
		...mapState([ 'auction', 'isAddAuction' ]),
	},
	created() {
		this.FETCH_AUCTION()
		this.$socket.on('bid', (data) => {
			this.auction.find(a => a.id === data.id).bid = data.cost
		})
		this.$socket.on('newAuction', (data) => {
			this.FETCH_AUCTION()
		})
		this.$socket.on('endAuction', (data) => {
			this.FETCH_AUCTION()
		})
	},
	methods: {
		...mapMutations([ 'SET_IS_ADD_AUCTION' ]),
		...mapActions([ 'FETCH_AUCTION', 'BIDDING']),
		bid(id, name) {
			const cost = prompt(name +'을 얼마에 입찰하시겠습니까?', '')
			if(isNaN(cost)) return alert('숫자만 입력할 수 있습니다')
			this.BIDDING({ id, cost }).then((data) => {
				if(data.result == true)
					alert(name + '를(을) ' + cost + '에 입찰하였습니다.')
				else
					alert(data.result)
			})
		},
		setAddAuction() {
			this.SET_IS_ADD_AUCTION(true)
		},
	}
}
</script>
<style scope>
.info {
	color: #000000;
	cursor: default;
	font-weight: lighter;
	font-size: 14pt;
}
.item {
  border: 2px solid #d4d4d4;
  border-radius: 6px;
  padding: 16px 10px;
  display: inline-block;
  background: linear-gradient(#868686, #ffffff);
}
.item > img {
  width: 40px;
  height: 30px;
}
</style>
