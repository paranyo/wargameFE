<template>
	<b-card no-body class="overflow-hidden" style="max-width: 540px; height: 210px;" @click="showProb" :class="{'border-danger': prob.deletedAt }">
  	<b-row no-gutters style="height: 100%;">
    	<b-col md="3" style="height: 100%;">
        <p v-if="prob.isCorrect" style="font-size: 32pt; transform: rotate(300deg); margin: 60px 0 0 -10px; font-weight: 400; position: absolute; text-align: center; color: #77DD77;">Correct!</p>
        <p v-else style="font-size: 36pt; transform: rotate(300deg); margin: 60px 0 0 10px; font-weight: 100; position: absolute; text-align: center;" :style="{'color': fontColor }">{{ prob.tag }}</p>
        <p style="position: absolute; width: 100%; text-align: center; margin: 10px 0; bottom: 0; color: #ccc; font-weight: lighter;"><b-badge variant="primary">paranyo</b-badge></p>
      </b-col>
      <b-col md="9">
        <b-card-body style="height: 100%;">
          <b-card-title style="margin: 0; height: 20%; font-size: 14pt;" class="overText">
						<h5 style="display: inline;"><b-badge variant="secondary">{{ prob.score }}</b-badge></h5>&nbsp;{{ prob.title }}
          </b-card-title>
          <b-card-text style="margin: 0; height: 60%; padding-top: 5px;">
						{{ description }}
          </b-card-text>
          <b-card-text style="margin: 0; height:20%; padding-top: 10px; text-align: right;">
            <p>{{ prob.solver }}명이 풀었습니다.</p>
        	</b-card-text>
      	</b-card-body>
    	</b-col>
  	</b-row>
	</b-card>
<!--
	<div class="card bg-light mb-3 h-100" @click="showProb">
	  <div class="card-header px-2 py-2" :class="{'bg-danger': prob.deletedAt}">
			<span class="badge badge-pill badge-secondary">{{ prob.tag }}</span>
			<span class="badge badge-pill badge-warning">{{ prob.score }}pt</span>
			<span class="badge badge-pill badge-primary">{{ prob.author }}</span>
			<span v-if="prob.isCorrect" class="badge badge-pill badge-success">Correct</span>
		</div>
		<div class="card-body" :class="{'bg-danger': prob.deletedAt}">
			<p class="card-title">{{ substrTitle }}</p>
			<p class="card-text">{{ substrDesc }}</p>
		</div>
	  <div class="card-footer" :class="{'bg-danger': prob.deletedAt}">
			<p class="card-text"><small class="text-muted">{{ prob.solver }}명이 풀었습니다.</small></p>
		</div>
  </div>-->
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
	props: ['prob'],
	computed: {
		description() {
			if(this.prob.description.length > 81)
				return " " + this.prob.description.substr(0, 82) + "..."
			else
				return this.prob.description
		},
		fontColor() {
			let t = this.prob.tag
			if(t == 'WEB')
				return '#FDDFDF'
			else if(t == 'FOR')
				return '#90C978'
			else if(t == 'REV')
				return '#83C6DD'
			else if(t == 'PWN')
				return '#5DB1D1'
			else if(t == 'MISC')
				return '#FF756D'
			else
				return '#000000'
		},
	},
	methods: {
		...mapActions(['FETCH_PROBS']),
		...mapMutations(['SET_RETURNPATH']),
		showProb() {
			this.SET_RETURNPATH('/challenge')
			this.$router.push('/challenge/' + this.prob.id)
		},
	}
}
</script>
<style scoped>
.overText {
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
