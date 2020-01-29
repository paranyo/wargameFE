<template>
	<b-container fluid class="mx-auto w-75">
		<b-row align-h="center">
			<b-button variant="secondary" @click="add">등록</b-button>
		</b-row>
		<hr />
		<b-row class="px-3 mx-auto">
			<b-table sticky-header="700px" responsive :items="items" :fields='fields' :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
				header-variant="light" striped outlined hover v-if="shop.length > 0"@row-clicked="(item) => edit(item.idx)">
				<template v-slot:table-colgroup="scope">
					<col key="idx" style="width: 40px" />
					<col key="name" style="width: 200px" />
					<col key="price" style="width: 40px" />
					<col key="pdCount" style="width: 40px" />
					<col key="id" style="width: 40px" />
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
		<AddShop @update="getTable" />
		<router-view @update="getTable" />
	</b-container>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import AddShop from './AddShop.vue'
export default {
	components: { AddShop },
	data() {
		return {
			items: [],
			fields: [
				{ key: 'idx', label: '번호', sortable: true, tdClass: 'align-middle' },
				{ key: 'name', label: '아이템 이름', sortable: true, tdClass: 'align-middle' },
				{ key: 'pdCount', label: '수량', sortable: true, tdClass: 'align-middle' },
				{ key: 'price', label: '가격', sortable: true, tdClass: 'align-middle' },
				{ key: 'id', label: '아이템 코드', sortable: true, tdClass: 'align-middle' },
				{ key: 'deadLine', label: '판매 기한', sortable: true, tdClass: 'align-middle', formatter: value => { return value.replace('T', ' ').substring(2, 19) } },
			],
			sortBy: 'idx',
			sortDesc: true,
		}
	},
	components: { AddShop },
	computed: {
		...mapState([ 'shop', 'isAddShop' ]),
	},
	created() {
		this.getTable()
	},
	methods: {
		...mapActions(['FETCH_SHOP', 'ADD_SHOP']),
		...mapMutations(['SET_IS_ADD_SHOP']),
		add() {
			this.$root.$emit('bv::show::modal', 'add-shop')
		},
		edit(idx) {
			this.$router.push('/settings/shop/' + idx)
			this.$nextTick(() => {
				this.$root.$emit('bv::show::modal', 'edit-shop')
			})
		},
		getTable() {
			this.FETCH_SHOP().then(() => {
				this.items = this.shop
			})
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
