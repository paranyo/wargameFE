<template>
	<b-modal id="edit-shop" @hide="close" hide-footer hide-header>
		<b-row>
			<b-col cols="12">
				<b-input-group prepend="상품명" class="mt-3"><b-form-input v-model="modal.name" disabled /></b-input-group>
			</b-col>
		</b-row>
		<b-row>
			<b-col cols="6">
				<b-input-group prepend="수량" class="mt-3"><b-form-input v-model="modal.pdCount" /></b-input-group>
			</b-col>
			<b-col cols="6">
				<b-input-group append="$" class="mt-3"><b-form-input v-model="modal.price" /></b-input-group>
			</b-col>
		</b-row>
		<b-row>
			<b-col cols=12>
				<b-jumbotron>
					<div class="items" v-for="item in shopItems" :key="`${item.id}`" v-b-popover.hover.top="`${item.name}`" @click="setItem(item)">
						<img :src="`https://maplestory.io/api/KMS/323/item/${item.id}/icon`" />
					</div>
				</b-jumbotron>
			</b-col>
		</b-row>
		<b-row>
			<b-col cols="12">
				<b-input-group prepend="상품설명" class="mt-3"><b-form-input v-model="modal.description" /></b-input-group>
			</b-col>	
		</b-row>
		<b-row>
			<b-col cols="12">
				<b-input-group prepend="기한" class="mt-3"><b-form-input type="datetime-local" v-model="modal.deadLine"  /></b-input-group>
			</b-col>
		</b-row>
		<b-button class="mt-3" block @click="onSubmit" variant="success">등록</b-button>
		<b-button class="mt-3" block @click="onRemove" variant="danger">삭제</b-button>
		<b-button block @click="close">취소</b-button>
	</b-modal>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
  export default {
    data() {
      return {
				modal: {
					id: 0,
					name: '',
					pdCount: 0,
					pdCode: 0,
					price: 0,
					description: '',
					deadLine: '',
				},
      }
    },
		computed: {
			...mapState(['shopItems', 'product']),
		},
		created() {
			this.FETCH_SHOP_ITEMS()
			this.FETCH_PRODUCT({ idx: this.$route.params.idx }).then(() => {
				this.modal.id					 = this.product.idx
				this.modal.name				 = this.product.name
				this.modal.price			 = this.product.price
				this.modal.pdCode			 = this.product.id
				this.modal.pdCount		 = this.product.pdCount
				this.modal.deadLine		 = this.product.deadLine.substring(0, 16)
				this.modal.description = this.product.description
			})
		},
    methods: {
			...mapActions(['FETCH_SHOP_ITEMS', 'FETCH_PRODUCT', 'UPDATE_SHOP', 'REMOVE_SHOP']),
			onSubmit() {
				const { id, pdCode, pdCount, price, deadLine, description } = this.modal
				this.UPDATE_SHOP({ id, pdCode, pdCount, price, deadLine, description }).then(() => {
					this.close()
				}).catch((err) => {
					alert(err.response.data.message)
				})
			},
			onRemove() {
				const { id } = this.modal
				if(confirm('정말로 삭제하시겠습니까? 되돌릴 수 없는 결정입니다.')) {
					this.REMOVE_SHOP({ id })
					alert('삭제 완료')
					this.close()
				} else {
					alert('삭제 취소')
				}
			},
			setItem(item) {
				this.modal.name			= item.name
				this.modal.pdCode		= item.id
			},
			close() {
				this.$emit('update')
				this.$root.$emit('bv::hide::modal', 'edit-shop')
				this.$router.push('/settings/shop')
			},
    }
  }
</script>
<style scoped>
p {
	margin: 0;
}
.row {
  margin-bottom: 10px;
}
.items {
  border: 2px solid #d4d4d4;
  border-radius: 6px;
  padding: 16px 10px;
  display: inline-block;
  background: linear-gradient(#868686, #ffffff);
}
.jumbotron {
  max-height: 215px;
  text-align: center;
  margin: 0 auto;
  padding: 15px 10px;
  overflow-y: scroll;
}
.items > img {
  width: 40px;
  height: 30px;
}
.items-nav {
  text-align: left;
  font-size: 16pt;
  font-weight: bolder;
  margin-left: 10px;
  margin-bottom: 0;
}

.isEquip {
  box-shadow: 0 0 0 2px green inset;
}
</style>
