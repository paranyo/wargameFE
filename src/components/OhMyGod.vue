<template>
	<b-container fluid class="mx-auto">
	<transition appear appear-to-class="animated fadeInDownBig">
		<b-row align-v="center">
			<b-col cols="12" md="12">
				<b-jumbotron bg-variant="light">
					<template slot="header">500: Internal Server Error</template>
					<hr class="my-4">
					<p>서버가 큰 난관에 봉착했습니다. 개발자에게 돌아오라는 메시지를 보냈으니 곧 해결할 수 있습니다.</p>
					<p>
						문의사항  <b-badge variant="primary">gksrbxo123@gmail.com</b-badge>
					</p>
				</b-jumbotron>
			</b-col>
		</b-row>
	</transition>
	</b-container>
</div>
</template>
<script>
export default {
	mounted() {
	}
}
</script>
<style>
</style>
