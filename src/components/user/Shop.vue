<template>
	<b-container fluid class="pt-5 mx-auto">
		<b-row class="center">
			<b-col>
				<hr class="my-4" />
			</b-col>
		</b-row>
		<b-row class="mx-auto w-75" v-for="(i, index) in shop" :key="`${index}`" v-if="index % 4 == 0" :id="index" style="margin-bottom: 15px">
			<b-col v-for="(item, idx) in shop" :key="`${item.id}`" v-if="((index / 4) * 4) - 1 < idx && idx < ((index / 4) + 1) * 4">
				<b-card>
			    <b-card-title>{{ item.name }} <small><code><i class="fab fa-viacoin"></i>{{ item.price }}</code></small></b-card-title>
			    <b-card-sub-title>{{ chkCount(item.pdCount) }}</b-card-sub-title>
			    <b-card-text>{{ timeFormat(item.deadLine) }}</b-card-text>
			    <b-card-text>{{ item.description }}</b-card-text>
			    <a class="card-link" href="#" @click="buy(item)">구매하기</a>
				  </b-card>
			</b-col>
		</b-row>
	</b-container>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
	computed: {
		...mapState(['shop']),
	},
	created() {
		this.FETCH_SHOP()
	},
	methods: {
		...mapActions(['FETCH_SHOP', 'BUY_PRODUCT', 'FETCH_MYINFO']),
		timeFormat(time) {
			if(new Date(time) < new Date())
				return '구매 가능한 기간이 아닙니다'
			return  time.replace('T', ' ').substring(2, 16) + '까지 구매 가능'
		},
		chkCount(count) {
			if(0 == count)
				return '재고가 모두 소진되었습니다'
			return count + '개 구매 가능'
		},
		buy(item) {
			if(confirm(item.name + '을 구매하시겠습니까?')) {
				this.BUY_PRODUCT({ pId: item.idx }).then((data) => {
					if(data.result == true) {
						alert('구매 성공')
						this.FETCH_SHOP()
						this.FETCH_MYINFO()
					} else {
						alert(data.result)
					}
				})
			} else {
				alert('구매 취소')
			}	
		},
	},
}
</script>
<style scope>
.col-3 {
padding: 15px;
}
</style>
