<template>
	<b-card>
		<b-card-title>{{ item.name }} <small><code><i class="fab fa-viacoin"></i>{{ item.price }}</code></small></b-card-title>
		<b-card-sub-title>{{ item.pdCount }}개 구매 가능</b-card-sub-title>
		<b-card-text>{{ timeFormat(item.deadLine) }}까지 구매 가능</b-card-text>
	  <b-card-text>{{ item.description }}</b-card-text>
	  <b-link :to="`/settings/shop/${item.idx}`" class="card-link">Edit Product</b-link>
	  <b-link class="card-link" @click="removeProduct(item.idx)">Deleted Product</b-link>
	</b-card>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
	props: ['item'],
	methods: {
		...mapActions(['FETCH_SHOP', 'REMOVE_SHOP']),
		timeFormat(time) {
			return  time.replace('T', ' ').substring(2, 17)
		},
		removeProduct(id) {
			if(confirm('선택한 아이템을 삭제하시겠습니까?'))
				this.REMOVE_SHOP({ id }).then(() => { alert('삭제 완료'); this.$router.push('/settings/shop') })
			else
				alert('삭제 취소')
		},
	},
}
</script>
<style scope>
.col-3 {
padding: 15px;
}
</style>
