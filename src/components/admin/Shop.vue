<template>
	<b-container fluid class="pt-5 mx-auto">
		<b-row class="mx-auto w-75" align-h="center">
			<b-button @click="setProduct">Add</b-button>
		</b-row>
		<b-row class="center">
			<b-col>
				<hr class="my-4" />
			</b-col>
		</b-row>
		<b-row class="mx-auto w-75" v-for="(i, index) in shop" :key="`${index}`" v-if="index % 4 == 0" :id="index" style="margin-bottom: 15px">
			<b-col v-for="(item, idx) in shop" :key="`${item.id}`" v-if="((index / 4) * 4) - 1 < idx && idx < ((index / 4) + 1) * 4">
				<ShopCard :item="item" />
			</b-col>
		</b-row>
	<AddShop v-if="isAddShop" />
	</b-container>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import AddShop	from './AddShop.vue'
import ShopCard from './ShopCard.vue'
export default {
	components: { AddShop, ShopCard },
	computed: {
		...mapState(['shop', 'isAddShop']),
	},
	created() {
		this.FETCH_SHOP()
	},
	methods: {
		...mapActions(['FETCH_SHOP', 'ADD_SHOP']),
		...mapMutations(['SET_IS_ADD_SHOP']),
		setProduct() {
			this.SET_IS_ADD_SHOP(true)
		},
		timeFormat(time) {
			return  time.replace('T', ' ').substring(2, 17)
		},
	},
}
</script>
<style scope>
.col-3 {
padding: 15px;
}
</style>
