<template>
	<b-card no-body class="overflow-hidden" style="max-width: 540px; height: 210px;" @click="showProb" :class="{'border-danger': prob.deletedAt }">
		<p v-if="prob.isCorrect" style="position: absolute;margin: 10px;"><b-badge variant="success" style="position: absolute">Clear</b-badge></p>
  	<b-row no-gutters style="height: 100%;">
    	<b-col md="3" style="height: 100%;">
				<!--<p v-if="prob.isCorrect" style="font-size: 32pt; transform: rotate(300deg); margin: 60px 0 0 -10px; font-weight: 400; position: absolute; text-align: center; color: #77DD77;">Correct!</p>-->
        <p style="font-size: 36pt; transform: rotate(300deg); margin: 60px 0 0 10px; font-weight: 100; position: absolute; text-align: center;" :style="{'color': fontColor }">{{ prob.tag }}</p>
        <p style="position: absolute; width: 100%; text-align: center; margin: 10px 0; bottom: 0; color: #ccc; font-weight: lighter;"><b-badge variant="primary">{{ prob.author }}</b-badge></p>
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
			this.$nextTick(() => {
				this.$root.$emit('bv::show::modal', 'prob-view')
			})
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
