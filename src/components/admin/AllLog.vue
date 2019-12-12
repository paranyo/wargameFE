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
            <b-form-checkbox value="id">Index</b-form-checkbox>
            <b-form-checkbox value="ipAddress">IP</b-form-checkbox>
            <b-form-checkbox value="data">Data</b-form-checkbox>
            <b-form-checkbox value="method">Method</b-form-checkbox>
            <b-form-checkbox value="url">URL</b-form-checkbox>
            <b-form-checkbox value="parsedUA">Browser</b-form-checkbox>
            <b-form-checkbox value="referer">Referer</b-form-checkbox>
            <b-form-checkbox value="isToken">Token</b-form-checkbox>
            <b-form-checkbox value="createdAt">CreatedAt</b-form-checkbox>
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
          { key: 'id', label: 'Index', sortable: true, sortDirection: 'desc' },
          { key: 'ipAddress', label: 'IPv4', sortable: true, sortDirection: 'desc' },
          { key: 'data', label: 'Data',
						formatter: (value, key, item) => {
							return value.slice(0, 64) + '...'
						},
						sortable: true,
						sortByFormatted: true,
						filterByFormatted: false,
					
					},
          { key: 'method', label: 'Method', sortable: true, sortDirection: 'desc' },
          { key: 'url', label: 'URL', sortable: true, sortDirection: 'desc' },
          { key: 'parsedUA', label: 'Browser', sortable: true, sortDirection: 'desc' },
          { key: 'referer', label: 'Referer', sortable: true, sortDirection: 'desc' },
          { key: 'isToken', label: 'Token', sortable: true, sortDirection: 'desc' },
          { key: 'createdAt', label: 'CreatedAt', sortable: true, class: 'text-center' },
					{ key: 'actions', label: 'Actions' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
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
			this.FETCH_LOG({ type: 'all' }).then(data => {
				data.logs.map((l) => {
					l._rowVariant =	this.checkMethod(l.method)
					l.createdAt		= this.dateFormat(new Date(l.createdAt))
					l.parsedUA		= this.parsingAgent(l.userAgent)
					l.isToken			= this.parsingToken(l.token)
				})
							this.items = data.logs
				this.totalRows = this.items.length
			
			}).then(() => this.isBusy = !this.isBusy)
		},
    methods: {
			...mapActions([
				'FETCH_LOG'
			]),
			parsingToken(t) {
				let s = t + ''
				return (s.length === 140) ? '있음' : '-'
			},
			checkMethod(method) {
				if(method == 'GET')				return 'primary'
				else if(method == 'POST') return 'success'
				else if(method == 'PUT')	return 'warning'
				else											return 'danger'
			},
			parsingAgent(ua) {
				let browserName = ''
				switch(true) {
					case /Trident|MSIE/.test(ua):
					browserName = 'IE'
					break
			
				case /Edge/.test(ua):
					browserName = 'MS Edge'
					break
			
				case /Chrome/.test(ua):
					browserName = '크롬'
					break
			
				case /Safari/.test(ua):
					browserName = '사파리'
					break
			
				case /Firefox/.test(ua):
					browserName = '파이어폭스'
					break
			
				case /Opera/.test(ua):
					browserName = '오페라'
					break
			
				default:
					browserName = '미분류'
				}
				return browserName
			},
			dateFormat(t) {
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
