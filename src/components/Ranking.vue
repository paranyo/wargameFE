<template>
	<b-container fluid class="pt-5 mx-auto">
		<b-row class="mx-auto">
			<div class="card-deck" style="margin: 0 auto">
				<b-col v-for="(user, index) in users.slice(0, 3)" :key="user.nick" sm=12 lg=4 md=4	
				style="max-width: 320px">
					<b-card v-if="index<3" img-src="https://placekitten.com/500/350" img-alt="Image" img-top>
				  	<b-card-text>
							<span class="badge badge-pill badge-primary">{{ user.score }}</span> {{ user.nick }}
						</b-card-text>
			    	<b-card-text class="small text-muted">{{ lastSolved(user.lastSolved) }}</b-card-text>
					</b-card>
				</b-col>
			</div>
		</b-row>
		<b-row class="w-75">
			<div class="col-md">
				<hr class="my-4" />
			</div>
		</b-row>
		<b-row class="mx-auto">
			<div class="card-deck" style="margin: 0 auto">
				<b-col v-for="(user, index) in users.slice(3, users.length)" :key="user.nick" sm=6 lg=3 md=3	
				style="max-width: 380px">
					<b-card img-src="https://placekitten.com/500/350" img-alt="Image" img-top>
				  	<b-card-text>
							<span class="badge badge-pill badge-primary">{{ user.score }}</span> {{ user.nick }}
						</b-card-text>
			    	<b-card-text class="small text-muted">{{ lastSolved(user.lastSolved) }}</b-card-text>
					</b-card>
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
		}
	}
}
</script>
<style scope>
</style>
