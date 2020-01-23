<template>
	<b-container fluid class="mx-auto">
	<transition appear appear-to-class="animated fadeInDownBig">
		<b-row align-v="center">
			<b-col cols="12" md="12">
				<b-jumbotron bg-variant="light">
					<template slot="header">대회가 시작되지 않았거나 이미 종료되었습니다.</template>
					<hr class="my-4">
					<p></p>
					<p>
						Written-By  <b-badge variant="primary">gksrbxo123@gmail.com</b-badge>
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
