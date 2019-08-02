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
	min-width: 60%;
	max-width: 80%;
	margin: 0 auto;
}
</style>
