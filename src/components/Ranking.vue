<template>
	<b-container fluid class="pt-5 mx-auto">
		<b-row class="mx-auto w-50">
			<b-col cols="4" v-for="(user, index) in users.slice(0, 3)" :key="user.nick">
				<b-card no-body class="overflow-hidden" style="width: 100%; height: 150px;" v-b-popover.hover.top="1 + index + '등'">
					<b-row no-gutters style="height: 100%;background: url(http://wargame1.run.goorm.io/static/rank1.jpeg) no-repeat;text-align: center;background-position: -127px -376px;">
						<b-col cols="8">
							<p class="score" v-b-popover.hover.top="DateFormat(user.lastSolved)" style="color: #fff;"> {{ user.score }}pt</p>
							<p class="score" style="height: 48%; color: #fff;">{{ user.intro ? user.intro : 'No Intro' }}</p>
						</b-col>
						<b-col cols="4">
							<div style="margin: 0; hegiht: 85%;">
								<b-card-img :src='`https://maplestory.io/api/character/${user.inventory},{"itemId":2000,"region":"KMS","version":"323"},{"itemId":12000,"region":"KMS","version":"323"}/stand1/0?showears=false&showLefEars=false&showHighLefEars=undefined&resize=1&name=${user.nick}&flipX=undefined`' class="rounded-0" style="width: auto; position: absolute; bottom: 0; right: 30%;" />
							</div>
						</b-col>
					</b-row>
				</b-card>
			</b-col>
		</b-row>
		<b-row class="center">
			<b-col>
				<hr class="my-4" />
			</b-col>
		</b-row>
		<b-row class="mx-auto w-75">
			<b-col cols="3" v-for="(user, index) in users.slice(3, users.length)" :key="user.nick" style="padding: 10px;">
				<b-card no-body class="overflow-hidden" style="width: 100%; height: 150px;" v-b-popover.hover.top="4 + index + '등'">
					<b-row no-gutters style="height: 100%;background: url(http://wargame1.run.goorm.io/static/MyStatus.png) no-repeat;text-align: center;background-position: -230px -200px;">
						<b-col cols="8">
							<p class="score" v-b-popover.hover.top="DateFormat(user.lastSolved)"> {{ user.score }}pt</p>
							<p class="score" style="height: 48%;">{{ user.intro ? user.intro : 'No Intro' }}</p>
						</b-col>
						<b-col cols="4">
							<div style="margin: 0; hegiht: 85%;">
								<b-card-img :src='`https://maplestory.io/api/character/${user.inventory},{"itemId":2000,"region":"KMS","version":"323"},{"itemId":12000,"region":"KMS","version":"323"}/stand1/0?showears=false&showLefEars=false&showHighLefEars=undefined&resize=1&name=${user.nick}&flipX=undefined`' class="rounded-0" style="width: auto; position: absolute; bottom: 0; right: 30%;" />
							</div>
						</b-col>
					</b-row>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
	computed: {
		...mapState({
			users: 'users'
		}),
	},
	created() {
		this.FETCH_USERS()
	},
	methods: {
		...mapActions([
			'FETCH_USERS'
		]),
		lastSolved(ls) {
			let t = Math.floor((new Date() - new Date(ls)) / 1000)
			let c = 0
			let m = ['s', 'mins', 'hours']
			while(t > 59) {
				t = Math.floor(t / 60)
				c++
			}
			if(isNaN(t))
				return 'last Solved no data'
			return 'last Solved ' +  t + m[c] + ' ago'
		},
		DateFormat(t) {
			if(t === '') return 'No Solved Data'
			t = new Date(t)
			let m = t.getMonth()+1
			let d = t.getDate()
			let h = t.getHours()
			let i = t.getMinutes()
			let s = t.getSeconds()
			return t.getFullYear()+'-'+(m>9?m:'0'+m)+'-'+(d>9?d:'0'+d)+' '+(h>9?h:'0'+h)+':'+(i>9?i:'0'+i)+':'+(s>9?s:'0'+s)
		}
	}
}
</script>
<style scope>
.score {
	padding: 5px;
	width: 50%;
	top: 10px;
	left: 5px;
	position: relative;
	box-shadow: 0px 0px 7px #000;
	text-shadow: 0px 0px 7px #000;
	font-size: 10pt;
	font-weight: bold;
	color: #000;
	margin: 0 10px 5px 0;
	border-radius: 3px;
}
.overflow-hidden {
	box-shadow: 0px 0px 7px #000;
}
</style>
