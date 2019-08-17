<template>
	<b-container fluid class="pt-5 mx-auto">
	<transition appear appear-to-class="animated fadeInDownBig">
		<b-row align-v="center">
			<b-col cols="12" md="12">
				<b-jumbotron bg-variant="light">
					<template slot="header">환영합니다!</template>
					<hr class="my-4">
					<p>
						공지사항입니다!
					</p>
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
