<template>
	<b-container fluid class="pt-5 mx-auto">
	<transition appear appear-to-class="animated fadeInDownBig">
		<b-row align-v="center">
			<b-col cols="12" md="12">
				<b-jumbotron bg-variant="light">
					<template slot="header">환영합니다!</template>
					<hr class="my-4">
					<p>
						나는 이 서비스를 제공하기 위해 많은 노력을 기울였습니다. 재밌는 시간 보내세요!
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
	.slide-fade-enter-active {
		transition: all .3s ease;
	}
	.slide-fade-leave-active {
		transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}

	.slide-fade-enter-to, .slide-fade-leave-to {
	  transform: translateX(10px);
		opacity: 0;
	}
</style>
