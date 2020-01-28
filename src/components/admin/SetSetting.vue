<template>
	<b-container fluid class="mx-auto">
		<b-row align-h="center">
		<!--	<b-button variant="info" @click="setAddSetting">세팅 추가</b-button>-->
		</b-row>
		<hr />
		<b-row class="px-3 mx-auto">
			<b-col style="text-align: right;" cols="2">
				<b-card no-body class="overflow-hidden rank">
					<b-row no-gutters>
						<b-col md="4" style="text-align: center;">
							<i class="fa fa-wrench fa-5x" aria-hidden="true" style="margin: 30px"></i>
						</b-col>
						<b-col md="8">
							<b-card-body title="점검 설정">
								<b-form-checkbox v-model="isOpen" name="check-button" switch size="lg" value="true" unchecked-value="false" >
								</b-form-checkbox>
							</b-card-body>
						</b-col>
					</b-row>
				</b-card>
			</b-col>
			<b-col style="text-align: right;" cols="4">
				<b-card no-body class="overflow-hidden rank" >
					<b-row no-gutters>
						<b-col md="4" style="text-align: center;">
							<i class="fa fa-battery-full fa-5x" aria-hidden="true" style="margin: 30px"></i>
						</b-col>
						<b-col md="8">
							<b-card-body title="시작 시간">
							  <b-input-group class="mt-3">
									<b-form-input type="datetime-local" v-model="startTime" />
							    <b-input-group-append>
							      <b-button variant="outline-secondary" @click="setServer(1)">
											<i class="fa fa-check" aria-hidden="true"></i>
										</b-button>
							    </b-input-group-append>
							  </b-input-group>
							</b-card-body>
						</b-col>
					</b-row>
				</b-card>
			</b-col>
			<b-col style="text-align: right;" cols="4">
				<b-card no-body class="overflow-hidden rank" >
					<b-row no-gutters>
						<b-col md="4" style="text-align: center;">
							<i class="fa fa-battery-empty fa-5x" aria-hidden="true" style="margin: 30px"></i>
						</b-col>
						<b-col md="8">
							<b-card-body title="종료 시간">
							  <b-input-group class="mt-3">
									<b-form-input type="datetime-local" v-model="endTime"/>
							    <b-input-group-append>
							      <b-button variant="outline-secondary" @click="setServer(2)">
											<i class="fa fa-check" aria-hidden="true"></i>
										</b-button>
							    </b-input-group-append>
							  </b-input-group>
							</b-card-body>
						</b-col>
					</b-row>
				</b-card>
			</b-col>
			<b-col style="text-align: right;" cols="2">
				<b-card no-body class="rank" >
					<b-row no-gutters>
						<b-col md="4" style="text-align: center;">
							<i class="fa fa-paint-brush fa-5x" aria-hidden="true" style="margin: 30px"></i>
						</b-col>
						<b-col md="8">
							<b-card-body title="배경 설정">
								<ColorPicker :curColor="settings[0].value" />
							</b-card-body>
						</b-col>
					</b-row>
				</b-card>
			</b-col>
		</b-row>
		<AddSetting v-if="isAddSetting" />
	</b-container>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import AddSetting from './AddSetting.vue'
import ColorPicker from './ColorPicker.vue'
export default {
	components: { AddSetting, ColorPicker },
	data() {
		return {
			isOpen: false,
			startTime: '',
			endTime: '',
		}
	},
	computed: {
		...mapState(['settings', 'isAddSetting']),
	},
	watch: {
		isOpen() {
			this.setServer(3)
		}
	},
	created() {
		this.FETCH_SETTING().then(() => {
			this.startTime = this.settings[1].value
			this.endTime	 = this.settings[2].value
			this.isOpen		 = this.settings[3].value
		})
	},
	methods: {
		...mapActions(['FETCH_SETTING', 'UPDATE_SETTING']),
		...mapMutations(['SET_IS_ADD_SETTING']),
		setServer(type) {
			if(type == 1) 
				this.UPDATE_SETTING({ name: 'StartCTF', value: this.startTime })
			else if(type == 2)
				this.UPDATE_SETTING({ name: 'EndCTF', value: this.endTime })
			else if(type == 3) {
				this.UPDATE_SETTING({ name: 'EditCTF', value: this.isOpen })
			}
		},	
		setAddSetting() {
			this.SET_IS_ADD_SETTING(true)	
		}
	}
}
</script>
<style scoped>
.rank {
	box-shadow: 0px 0px 7px #000;
}
</style>
