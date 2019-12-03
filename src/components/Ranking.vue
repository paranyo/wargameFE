<template>
	<b-container fluid class="pt-5 mx-auto">
		<b-row class="mx-auto">
			<div class="card-deck" style="margin: 0 auto">
				<b-col v-for="(user, index) in users.slice(0, 3)" :key="user.nick"
				style="max-width: 320px">
					<div class="rank" v-b-popover.hover.top="1 + index + '등'">
						<div class="rank-character">
							<img :src='`https://maplestory.io/api/character/${user.inventory},{"itemId":2000,"region":"KMS","version":"323"},{"itemId":12000,"region":"KMS","version":"323"}/stand1/0?showears=false&showLefEars=false&showHighLefEars=undefined&resize=1&name=&flipX=undefined`' />
							<p class="rank-name">{{ user.nick }}</p>
						</div>
						<div class="rank-info">
							<p class="rank-score" v-b-popover.hover.top="DateFormat(user.lastSolved)">{{ user.score }}</p>
							<p class="rank-comments">{{ user.intro ? user.intro : 'No Intro' }}</p>
						</div>
						<div class="clear"></div>
					</div>
				</b-col>
			</div>
		</b-row>
		<b-row class="center">
			<b-col>
				<hr class="my-4" />
			</b-col>
		</b-row>
		<b-row class="mx-auto w-75">
			<div class="card-deck" style="margin: 0 auto">
				<b-col v-for="(user, index) in users.slice(3, users.length)" :key="user.nick"
				style="max-width: 308px">
					<div class="rank2" v-b-popover.hover.top="4 + index + '등'">
						<div class="rank-character">
							<img :src='`https://maplestory.io/api/character/${user.inventory},{"itemId":2000,"region":"KMS","version":"323"},{"itemId":12000,"region":"KMS","version":"323"}/stand1/0?showears=false&showLefEars=false&showHighLefEars=undefined&resize=1&name=&flipX=undefined`' />
							<p class="rank-name">{{ user.nick }}</p>
						</div>
						<div class="rank-info">
							<p class="rank-score" v-b-popover.hover.top="DateFormat(user.lastSolved)">{{ user.score }}</p>
							<p class="rank-comments">{{ user.intro ? user.intro : 'No Intro' }}</p>
						</div>
						<div class="clear"></div>
					</div>
				</b-col>
			</div>
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
		time() {
					},
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
.rank {
  border: 1px inset #dadada;
  width: 200px;
  height: 150px;
  border-radius: 6px;
	padding: 5px;
  margin: 0 auto;
	background: url('/static/back1.jpg');
	background-position-x: 54%;
	background-position-y: 3%;
	box-shadow: 0px 0px 15px 4px #b7b7b7;
}
.rank2 {
  border: 1px inset #dadada;
  width: 200px;
  height: 150px;
  border-radius: 6px;
	padding: 5px;
  margin: 15px;
	background: url('/static/back1.jpg');
	background-position-x: 38%;
	background-position-y: 38%;
}
.rank-character {
	padding-top: 10px;
	text-align: center;
	width: calc(35% - 1px);
	float: left;
	height: 80%;
}

.rank-character > img {
	display: block;
	margin: 0 auto;
}

.rank-name {
  position: relative;
  top: -4px;
  padding: 0px 4px;
  display: inline;
  color: white;
  background: rgba(0,0,0, 0.45);
  border-radius: 2px;
  font-size: 10pt;
}

.rank-info {
	float: left;
	width: calc(65% - 1px);
	height: 80%;
	padding: 5px;
}

.rank-comments {
	background: rgba(80, 80, 80, 0.8);
	border: 2px groove #cccccc94;
	color: white;
	font-size: 9pt;
	height: 80%;
	margin: 0 auto;
	text-align: center;
}

.rank-score {
	background: rgba(80, 80, 80, 0.8);
	border: 2px groove #cccccc94;
	color: white;
	font-size: 9pt;
	height: 20%;
	margin: 0 0 3px 0;
	text-align: center;
}
.clear {
	clear: both;
}
</style>
