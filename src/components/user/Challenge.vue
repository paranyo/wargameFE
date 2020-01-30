<template>
	<b-container fluid class="pt-5 mx-auto">
		<b-row class="mx-auto" align="center">
			<b-col cols="12" md="12">
				<b-form-group size="md">
					<b-form-checkbox-group button-variant="info"
							v-model="selected" :options="options" class="btn-group" buttons @input="show">
					</b-form-checkbox-group>
				</b-form-group>
			</b-col>
		</b-row>
		<b-row class="px-3 mx-auto">
			<b-col lg=3 md=4 sm=6>
				<b-card no-body class="overflow-hidden" style="max-width: 540px; height: 210px;">
					<b-row no-gutters>
						<b-col md="3" style="margin: 65px 0; position: relative;">
							<p style="font-size: 36pt; transform: rotate(300deg); margin: 6px 0px 0px 12px; font-weight: 100; position: absoslute; text-align:center;">WEB</p>
							<p>스코어랑 출제자 놓기</p>
						</b-col>
						<b-col md="9">
							<b-card-body style="height: 100%;">
								<b-card-title style="margin: 0; height: 20%;">
									집을 떠나간 쿠키를 찾아..
								</b-card-title>
								<b-card-text style="margin: 0; height: 60%;">
									쿠키가 집을 떠났습니다. 찾아야 하는데 방법을 모르겠습니다. 도와주실래요?
								</b-card-text>
								<b-card-text style="margin: 0; height:20%; padding-top: 15px; text-align: right;">
									<p>3명이 풀었습니다.</p>
								</b-card-text>
							</b-card-body>
						</b-col>
					</b-row>
				</b-card>
			</b-col>
			<b-col v-for="prob in probs" :key="`${prob.id}`" class="mb-3" lg=3 md=4 sm=6>
				<ProbCard :prob="prob" v-on:showTags="show" class="probCard" />
			</b-col>
		</b-row>
		<router-view />
	</b-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import ProbCard from './ProbCard.vue'
export default {
	data() {
		return {
			options: [],
			selected: [],
		}
	},
	components: { ProbCard },
	computed: {
		...mapState({
			tags: 'tags',
			probs: 'probs',
		}),
	},
	created() {
		this.FETCH_TAGS().then(() => this.fetchOptions())
	},
	methods: {
		...mapActions([
			'FETCH_TAGS',
			'FETCH_PROBS'
		]),
		fetchOptions() {
			this.tags.map(t => { 
				this.options.push({ text: t.title, value: t.id }) 
				this.selected.push(t.id)
			})
		},
		show() {
			this.FETCH_PROBS({ tags: this.selected })
		},
	}
}
</script>
<style>
.probCard:hover {
	cursor: pointer;
}
</style>
