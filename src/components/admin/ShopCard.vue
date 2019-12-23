<template>
	<b-card>
		<b-card-title>{{ item.name }} <small><code><i class="fab fa-viacoin"></i>{{ item.price }}</code></small></b-card-title>
		<b-card-sub-title>{{ item.pdCount }}개 구매 가능</b-card-sub-title>
		<b-card-text>{{ timeFormat(item.deletedAt) }}까지 구매 가능</b-card-text>
	  <b-card-text>{{ item.description }}</b-card-text>
	  <router-link :to="`/settings/shop/${item.idx}`" class="card-link">Edit Product</router-link>
	</b-card>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
	props: ['item'],
	methods: {
		...mapActions(['FETCH_SHOP', 'UPDATE_SHOP']),
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
