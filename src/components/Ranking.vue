<template>
	<div class="container-fluid">
		<div class="row">
			<div class="top3">
			  <b-card-group>
			    <b-card title="Title" img-src="https://placekitten.com/g/300/450" img-alt="Image" img-top>
			      <b-card-text>
			        This is a wider card with supporting text below as a natural lead-in to additional content.
			        This content is a little bit longer.
			      </b-card-text>
			      <div slot="footer"><small class="text-muted">Last updated 3 mins ago</small></div>
			    </b-card>
			
			    <b-card title="Title" img-src="https://placekitten.com/g/300/450" img-alt="Image" img-top>
			      <b-card-text>
			        This card has supporting text below as a natural lead-in to additional content.
			      </b-card-text>
			      <div slot="footer"><small class="text-muted">Last updated 3 mins ago</small></div>
			    </b-card>
			
			    <b-card title="Title" img-src="https://placekitten.com/g/300/450" img-alt="Image" img-top>
			      <b-card-text>
			        This is a wider card with supporting text below as a natural lead-in to additional content.
			        This card has even longer content than the first to show that equal height action.
			      </b-card-text>
			      <div slot="footer"><small class="text-muted">Last updated 3 mins ago</small></div>
			    </b-card>
			  </b-card-group>
			</div>
		</div>
		<div class="row">
			<div v-for="user in users">
				<span>Lv. {{ user.level }} <small> n. {{ user.nick }}</small></span>
			</div>
		</div>
		<router-view />
	</div>
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
.top3 {
	width: 100%;
	height: 30%;
}

.col-sm-3 {
	padding: 0 5px;
}
</style>
