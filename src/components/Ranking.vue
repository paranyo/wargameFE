<template>
	<div class="container">
		<div class="row">
			<div class='col-md-4'>
				<div class="card">
					<div class="wrapper card-header">
		 				<img src="https://i.pinimg.com/564x/d3/d7/e0/d3d7e01a686b0e35351786d71d9e1fad.jpg" 
							class="card-img-top" alt="..." style="overflow: hidden">
					</div>
				  <div class="card-body">
				    <h5 class="card-title">Card title</h5>
				    <p class="card-text">
							Some quick example text to build on the card title and make up the bulk of the card's content.
						</p>
				    <a href="#" class="btn btn-primary">Go somewhere</a>
				  </div>
				</div>
			</div>
			<div class='col-md-4'>
				<div class="card">
					<div class="wrapper card-header">
			 			<img src="https://i.pinimg.com/564x/70/2f/4b/702f4b29a5e1e0f4a4a3d82a64a389d2.jpg"
							class="card-img-top" alt="...">
					</div>
				  <div class="card-body">
				    <h5 class="card-title">Card title</h5>
				    <p class="card-text">
							Some quick example text to build on the card title and make up the bulk of the card's content.
						</p>
				    <a href="#" class="btn btn-primary">Go somewhere</a>
				  </div>
				</div>
			</div>
			<div class='col-md-4'>
				<div class="card">		
					<div class="wrapper card-header">
		  			<img src="https://i.pinimg.com/564x/c8/8c/f9/c88cf998df774692b92ecf2c288c15be.jpg"
							class="card-img-top" alt="...">
					</div>
				  <div class="card-body">
				    <h5 class="card-title">Card title</h5>
				    <p class="card-text">
							Some quick example text to build on the card title and make up the bulk of the card's content.
						</p>
				    <a href="#" class="btn btn-primary">Go somewhere</a>
				  </div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md">
				<hr class="my-4" />
			</div>
		</div>
		<div class="row">
			<table class="table table-hover">
				<thead>
					<tr class="table-dark">
						<td>POS</td>
						<td>NICKNAME</td>
						<td>SCORE</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>PARANYO</td>
						<td>3000</td>
					</tr>
					<tr>
						<td>1</td>
						<td>PARANYO</td>
						<td>3000</td>
					</tr>
					<tr>
						<td>1</td>
						<td>PARANYO</td>
						<td>3000</td>
					</tr>
				</tbody>
			</table>
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
