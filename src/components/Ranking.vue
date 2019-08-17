<template>
	<b-container fluid class="pt-5 mx-auto">
		<div class="row w-75 mx-auto">
			<b-col sm="4" lg="4" v-for="(user, index) in users" :key="user.nick">
   			<b-card v-if="index<3"
					:title="user.nick" img-src="https://placekitten.com/500/350" img-alt="Image" img-top>
		    	<b-card-text>
						{{ user }}
    		  </b-card-text>
		    	<b-card-text class="small text-muted">Last updated 3 mins ago</b-card-text>
				</b-card>
			</b-col>
		</div>
		<div class="row">
			<div class="col-md">
				<hr class="my-4" />
			</div>
		</div>
		<div class="row w-75 mx-auto">
			<table class="table table-hover">
				<thead>
					<tr class="table-dark">
						<td>POS</td>
						<td>NICKNAME</td>
						<td>SCORE</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(user, index) in users" :key="user.nick" v-if="index > 2">
						<td>1</td>
						<td>{{ user.nick }}</td>
						<td>1230</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="row">
		</div>
		<router-view />
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
		])
	}
}
</script>
<style scope>
.col-sm-3 {
	padding: 0 5px;
}
.wrapper {
  position: relative;
  overflow: hidden;
}

.wrapper:after {
  content: '';
  display: block;
  padding-top: 100%;
}

.wrapper img {
  width: auto;
  height: 100%;
  max-width: none;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}
</style>
