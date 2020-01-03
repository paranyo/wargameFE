<template>
	<b-container fluid class="mx-auto w-75 pt-5">
		<b-row align-h="center">
				<b-button variant="info" @click="setAddAuction">등록</b-button>
		</b-row>
		<hr />
		<b-row class="px-3 mx-auto">
			<b-table sticky-header="600px" responsive :items="auction" :fields='fields' :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
				header-variant="light" striped outlined hover>
				<template v-slot:table-colgroup="scope">
					<col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'name' ? '300px' : '60px' }">
				</template>
				<template v-slot:cell(name)="row">
					<span @click="bid(row.item.id, row.item.name)" class="infoModal">
						<div class="item">
							<img :src="`http://maplestory.io/api/KMS/323/item/${row.item.itemCode}/icon`" />
						</div>
						{{ row.item.name }}
					</span>
				</template>
				<template v-slot:cell()="row">
					<span class="info">{{ row.value }}</span>
				</template>
			</b-table>
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
				{ key: 'price', label: '시작가', sortable: true },
				{ key: 'bid', label: '현재가', sortable: true, formatter: value => { return value == null ? 'No bid' : value } },
				{ key: 'end', label: '남은 시간', sortable: true, formatter: value => { return value } },
				{ key: 'owner', label: '등록자', sortable: false },
				{ key: 'cate', label: '분류', sortable: false },
			],
			sortBy: 'id',
			sortDesc: true,
			datass: {},
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
.infoModal {
	color: #000000;
	font-weight: bolder;
	cursor: pointer;
}
.info {
	color: #000000;
	font-size: 16pt;
	cursor: pointer;
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
