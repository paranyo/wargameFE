<template>
	<b-container fluid class="pt-5 mx-auto">
		<!-- Main -->
		<div>
			첫번째는 메인 공지로 두어서 서버 공지로 두자
			{{ notice }}
		</div>
			두번째부터는 게시판 형식으로 간단히 보여주고 클릭시 자세히보기로 만들자
		<!-- Notice-->
		<div>

		</div>

	</b-container>
</div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
	computed: {
		...mapState([ 'notice' ]),
	},
	created() {
		this.FETCH_NOTICE()
	},
	methods: {
		...mapActions([ 'FETCH_NOTICE' ]),
	},
}
</script>
<style>
</style>
