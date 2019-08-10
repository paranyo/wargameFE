<template>
  <div id="app">
		<Header />
		<router-view />
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
	components: {
		'Header': Header,
	}
}
</script>
<style>
#app {
	min-width: 80%;
	max-width: 100%;
	margin: 0 auto;
}
</style>
