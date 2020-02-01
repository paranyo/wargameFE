<template>
	<b-container fluid class="mx-auto w-75 pt-5">
		<b-row class="pt-5">
		</b-row>
		<hr />
		<b-row class="px-3 mx-auto">
			<b-table sticky-header="700px" responsive :items="items" :fields='fields' :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
				header-variant="light" striped outlined hover v-if="shop.length > 0"@row-clicked="(item) => buy(item)">
				<template v-slot:table-colgroup="scope">
					<col key="name" style="width: 200px" />
					<col key="price" style="width: 40px" />
					<col key="pdCount" style="width: 40px" />
					<col key="deadLine" style="width: 80px" />
				</template>
				<template v-slot:cell(name)="row">
					<span class="info">
						<div class="item">
							<img :src="`http://maplestory.io/api/KMS/323/item/${row.item.id}/icon`" />
						</div>
						{{ row.item.name }}
					</span>
				</template>
				<template v-slot:cell()="row">
					<span class="info">{{ row.value }}</span>
				</template>
			</b-table>
			<p v-else>등록된 상품이 없습니다.</p>
		</b-row>
	</b-container>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
	data() {
		return {
			items: [],
			fields: [
				{ key: 'name', label: '아이템 이름', sortable: true, tdClass: 'align-middle' },
				{ key: 'pdCount', label: '수량', sortable: true, tdClass: 'align-middle', 
					formatter: value => {
						return value + '개'
					}
				},
				{ key: 'price', label: '가격', sortable: true, tdClass: 'align-middle' },
				{ key: 'deadLine', label: '판매 기한', sortable: true, tdClass: 'align-middle', 
					formatter: value => { 
						if(new Date(value) < new Date()) return '구매 가능한 기간이 아닙니다'
						else														 return value.replace('T', ' ').substring(2, 19) 
					} 
				},
			],
			sortBy: 'name',
			sortDesc: true,
		}
	},
	computed: {
		...mapState(['shop']),
	},
	created() {
		this.getTable()
	},
	methods: {
		...mapActions(['FETCH_SHOP', 'BUY_PRODUCT', 'FETCH_MYINFO']),
		buy(item) {
			if(confirm(item.name + '을 구매하시겠습니까?')) {
				this.BUY_PRODUCT({ pId: item.idx }).then((data) => {
					if(data.result == true)
						alert('구매 성공')
					else
						alert(data.result)
					this.getTable()
				})	
			}
		},
		getTable() {
			this.FETCH_SHOP().then(() => {
				this.items = this.shop
			})
			this.FETCH_MYINFO()
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
.align-middle {
	vertical-align: middle!important;
}
</style>
