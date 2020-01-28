<template>
  <div id="app">
		<div class="background" v-bind:style="{ background: backColor }" />
		<Header />
		<router-view />
  </div>
</template>

<script>
import Header from '@/components/Header'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
	components: {
		'Header': Header,
	},
	created() {
		this.FETCH_SETTING().then(() => {
			if(this.settings[0].name == 'backColor')
				this.SET_BACK_COLOR(this.settings[0].value)
		})
	},
	computed: {
		...mapState(['settings', 'backColor'])
	},
	methods: {
		...mapActions(['FETCH_SETTING']),
		...mapMutations(['SET_BACK_COLOR']),
	}
}
</script>
<style>
#app {
	min-width: 80%;
	max-width: 100%;
	margin: 0 auto;
}
.background {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: -1;
}
</style>
