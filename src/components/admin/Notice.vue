<template>
	<b-container fluid class="mx-auto">
		<transition appear appear-to-class="animated fadeInDownBig">
			<b-row align-v="center">
				<b-col cols="12" md="12">
					<b-jumbotron bg-variant="light">
						<template slot="header">Welcome!</template>
						<hr class="my-4">
						<p>2020년도 운영진분들의 열정과 배움의 노고를 존경합니다.</p>
						<p>
							Written-By  <b-badge variant="warning">paranyo</b-badge>
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
