<template>
  <div id="app">
		<div class="background" v-bind:style="{ background: backColor }" />
		<Header />
		<router-view />
  </div>
</template>

<script>
import Header from '@/components/Header'
import { mapState, mapActions } from 'vuex'
export default {
	data() {
		return {
			backColor: '',
		}
	},
	components: {
		'Header': Header,
	},
	created() {
		this.FETCH_SETTING().then(() => {
			if(this.settings[0].name == 'backColor')
				this.backColor = this.settings[0].value
		})
	},
	computed: {
		...mapState(['settings'])
	},
	methods: {
		...mapActions(['FETCH_SETTING'])
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
