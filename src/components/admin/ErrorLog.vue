<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col sm="2" md="2" lg="1" class="my-1">
        <b-form-group class="mb-0">
          <b-form-select v-model="perPage" id="perPageSelect" size="sm" :options="pageOptions"></b-form-select>
        </b-form-group>
      </b-col>
      <b-col sm="6" md="4" lg="5" class="my-1">
        <b-form-group align="center" class="mb-0">
          <b-form-checkbox-group v-model="filterOn" class="mt-1">
            <b-form-checkbox value="errno">번호</b-form-checkbox>
            <b-form-checkbox value="code">코드</b-form-checkbox>
            <b-form-checkbox value="sqlMessage">메시지</b-form-checkbox>
            <b-form-checkbox value="createdAt">발생 시각</b-form-checkbox>
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
    <b-table
      show-empty
      small
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filterIncludedFields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
			:busy="isBusy"
    >
			<template v-slot:table-busy>
				<div class="text-center text-info my-2">
					<b-spinner class="align-middle"></b-spinner>
					<strong>불러오는 중...</strong>
				</div>
			</template>
      <template v-slot:cell(actions)="row">
        <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
					JSON View
        </b-button>
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
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
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
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
          { key: 'errno', label: '번호', sortable: true, class: 'text-center' },
          { key: 'code', label: '코드', sortable: true, sortDirection: 'desc', class: 'text-center' },
          { key: 'sqlMessage', label: '메시지', sortable: true, sortDirection: 'desc', class: 'text-center' },
					{ key: 'createdAt', label: '발생 시각', sortable: true, sortDirection: 'desc', class: 'text-center' },
          { key: 'actions', label: '보기', class:'text-center' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 15,
        pageOptions: [5, 10, 15, 20, 30, 50, 100],
        sortBy: '',
        sortDesc: true,
        sortDirection: 'desc',
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
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
			this.FETCH_LOG({ type: 'error' }).then(data => {
				data.logs.map((l) => {
					if(l.errno == 1264)
						l._rowVariant = 'danger'
					else
						l._rowVariant = 'success'
					l.createdAt = this.DateFormat(new Date(l.createdAt))
				})
				this.items = data.logs
				this.totalRows = this.items.length
			}).then(() => this.isBusy = !this.isBusy)
		},
    methods: {
			...mapActions([
				'FETCH_LOG'
			]),
			DateFormat(t) {
				let m = t.getMonth()+1
				let d = t.getDate()
				let h = t.getHours()
				let i = t.getMinutes()
				let s = t.getSeconds()
				return t.getFullYear()+'-'+(m>9?m:'0'+m)+'-'+(d>9?d:'0'+d)+' '+(h>9?h:'0'+h)+':'+(i>9?i:'0'+i)+':'+(s>9?s:'0'+s)
				
			},
			info(item, index, button) {
			  this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
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
