<template>
  <b-container fluid>
    <b-row>
      <b-col sm="2" md="2" lg="1" class="my-1">
        <b-form-group class="mb-0">
          <b-form-select v-model="perPage" id="perPageSelect" size="sm" :options="pageOptions"></b-form-select>
        </b-form-group>
      </b-col>
      <b-col sm="6" md="4" lg="5" class="my-1">
        <b-form-group align="center" class="mb-0">
          <b-form-checkbox-group v-model="filterOn" class="mt-1">
            <b-form-checkbox value="uid">아이디</b-form-checkbox>
            <b-form-checkbox value="nick">닉네임</b-form-checkbox>
            <b-form-checkbox value="email">이메일</b-form-checkbox>
            <b-form-checkbox value="intro">소개</b-form-checkbox>
            <b-form-checkbox value="level">레벨</b-form-checkbox>
            <b-form-checkbox value="money">재화</b-form-checkbox>
            <b-form-checkbox value="score">점수</b-form-checkbox>
            <b-form-checkbox value="createdAt">생성 날짜</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>
      <b-col sm="4" md="6" lg="6" class="my-1">
        <b-form-group class="mb-0">
          <b-input-group size="sm">
            <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Type to Search">
						</b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
		</b-row>
		<b-row>
      <b-col class="my-1">
        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill"
          size="sm" class="my-0"></b-pagination>
      </b-col>
    </b-row>
		    <!-- Main table element -->
    <b-table show-empty small stacked="md" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage"
      :filter="filter" :filterIncludedFields="filterOn" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
			@filtered="onFiltered":busy="isBusy" ref="uTable">
			<template v-slot:table-busy>
				<div class="text-center text-info my-2">
					<b-spinner class="align-middle"></b-spinner>
					<strong>불러오는 중...</strong>
				</div>
			</template>
      <template v-slot:cell(actions)="row">
        <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
					수정
        </b-button>
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? '접기' : '펼치기' }}
        </b-button>
      </template>
      <template v-slot:row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>
		<b-modal :id="infoModal.id" @hide="resetInfoModal" hide-footer>
		  <template v-slot:modal-header>
				<p>UserID&nbsp;&nbsp;<strong>{{ infoModal.uid }}</strong></p>
				<code>IPv4 {{ infoModal.ip }}</code>
		  </template>
			<b-row>
				<b-col cols="8">
					<b-input-group prepend="Nickname" class="mt-3"><b-form-input v-model="infoModal.nick" disabled /></b-input-group>
				</b-col>
				<b-col cols="4">
					<b-input-group prepend="Lv." class="mt-3"><b-form-input v-model="infoModal.level" /></b-input-group>
				</b-col>
			</b-row>
			<b-input-group prepend="E-Mail"   class="mt-3"><b-form-input v-model="infoModal.email" /></b-input-group>
			<b-input-group prepend="Intro" class="mt-3"><b-form-input v-model="infoModal.intro" /></b-input-group>
			<b-row>
				<b-col cols="8">
					<b-input-group append="$" class="mt-3"><b-form-input v-model="infoModal.money" /></b-input-group>
				</b-col>
				<b-col cols="4">
					<b-input-group append="pt" class="mt-3"><b-form-input v-model="infoModal.score" disabled /></b-input-group>
				</b-col>
			</b-row>
		  <b-form-radio-group buttons button-variant="outline-danger" v-model="infoModal.deletedAt" class="mt-3 w-100">
		    <b-form-radio value="1">Ban</b-form-radio>
		    <b-form-radio value="0">Unban</b-form-radio>
		  </b-form-radio-group>
		  <b-button class="mt-3" block @click="onSubmit" variant="success">Edit</b-button>
		  <b-button block @click="$bvModal.hide(infoModal.id)">Close Me</b-button>
		</b-modal>
  </b-container>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
  export default {
    data() {
      return {
				items: [],
        fields: [
          { key: 'uid', label: '아이디', sortable: true, class: 'text-center' },
          { key: 'nick', label: '닉네임', sortable: true, class: 'text-center' },
          { key: 'email', label: '이메일', sortable: true, class: 'text-center' },
          { key: 'intro', label: '소개', sortable: true, class: 'text-center' },
					{ key: 'level', label: '레벨', sortable: true, class: 'text-center' },
					{ key: 'money', label: '재화', sortable: true, class: 'text-center' },
					{ key: 'score', label: '점수', sortable: true, class: 'text-center' },
					{ key: 'createdAt', label: '가입 날짜', sortable: true, class: 'text-center',
						formatter: (value) => {	return value.replace('T', ' ').substring(2, 19)	}
					},
					{ key: 'deletedAt', label: '차단', sortable: true, class: 'text-center',
						formatter: (value) => { return value != null ? value.replace('T', ' ').substring(2, 19) : 'No Ban' }, sortByFormatted: true,
					},
          { key: 'actions', label: '관리', class:'text-center' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 20,
        pageOptions: [5, 10, 15, 20, 30, 50, 100],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
					uid: '',
					nick: '',
					email: '',
					money: 0,
					level: 1,
					intro: '',
					ip: '',
					score: 0,
					deletedAt: 0,
        },
				isBusy: true,
      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
		created() {
			this.getUserTable()
		},
    methods: {
			...mapActions(['FETCH_USERS_INFO', 'UPDATE_USER']),
			onSubmit() {
				const { uid, email, money, level, intro, deletedAt } = this.infoModal
				if(!uid || !email || !money || !level)
					return alert('누락된 정보가 있습니다.')
				this.UPDATE_USER({ uid, email, money, level, intro, isBan: deletedAt })
				.then(() => {
					this.isBusy = !this.isBusy
					this.getUserTable()
					this.$root.$emit('bv::hide::modal', this.infoModal.id)
				}).catch(err => {
					alert('intro는 최대 32글자입니다.')
				})
			},
			info(item, index, button) {
				this.infoModal.uid	 = item.uid
				this.infoModal.nick	 = item.nick
				this.infoModal.email = item.email
				this.infoModal.money = item.money
				this.infoModal.level = item.level
				this.infoModal.intro = item.intro
				this.infoModal.ip		 = item.ip
				this.infoModal.score = item.score
				this.infoModal.deletedAt = item.deletedAt != null ? 1 : 0
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
			getUserTable() {
				this.FETCH_USERS_INFO().then(data => {
					data.users.map((u) => {
						if(u.deletedAt != null)
							u._rowVariant = 'danger'
						else
							u._rowVariant = 'success'
					})
					this.items = data.users
					this.totalRows = this.items.length
				}).then(() => this.isBusy = !this.isBusy)
			},
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>
<style scoped>
p {
	margin: 0;
}
</style>
