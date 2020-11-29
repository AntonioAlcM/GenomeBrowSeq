<template>
  <div>
    <expedient />
    <div
      v-if="statusLoading"
      class="loading-bar"
      align="center"
      justify="center"
    >
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-data-table
        :headers="headers"
        @click:row="handleRowClick"
        :items="getResults"
        class="elevation-1"
      >
        <template v-slot:item.name="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <td :content="item.name" v-on="on" class="text-xs-right">
                {{ item.name | truncate(20) }}
              </td>
            </template>
            <span>{{ item.name }}</span>
          </v-tooltip>
        </template>
        <template v-slot:item.description="{ item }">
          <v-tooltip bottom max-width="99%">
            <template v-slot:activator="{ on }">
              <td class="text-xs-right" :content="item.description" v-on="on">
                {{ item.description | truncate(20) }}
              </td>
            </template>
            <span>{{ item.description }}</span>
          </v-tooltip>
        </template>
        <template v-slot:item.url="{ item }">
          <td class="text-xs-right" @click.stop>
            <a class="url-link" :href="item.url" target="_black">
              <v-icon justify="center">vertical_align_bottom</v-icon>
            </a>
          </td>
        </template>
      </v-data-table>
    </div>
    <div
      class="loading-bar"
      align="center"
      justify="center"
      v-if="!loading && statusNoData"
    >
      <h3>No data found</h3>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Expedient from './expedient.vue'

export default {
  components: {
    Expedient,
  },
  props: {
    tabName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: true,
      headers: [
        { text: 'Series ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Samples', value: 'n_samples' },
        { text: 'Release date', value: 'releasedate' },
        { text: 'Species', value: 'species' },
        { text: 'experiments', value: 'experiment_type' },
        { text: 'Descripton', value: 'description' },
        { text: 'Database', value: 'bd' },
        { text: 'Download', value: 'url', sortable: false },
      ],
      results: [],
      statusNoData: false,
    }
  },
  computed: {
    ...mapState({
      finishNcbiSearch: (state) => state.store.finishNcbiSearch,
      finishArraySearch: (state) => state.store.finishArraySearch,
      totalResultsNcbi: (state) => state.store.totalResultsNcbi,
      totalResultsArrayExpress: (state) => state.store.totalResultsArrayExpress,
      ncbiResults: (state) => state.store.ncbiResults,
      arrayResults: (state) => state.store.arrayResults,
      tabs: (state) => state.store.tabs,
      tabIndex: (state) => state.store.tabIndex,
    }),
    getResults: {
      get() {
        const self = this
        return self.$nuxt.$store.getters['store/getResults'](self.tabName)
      },
    },
    statusLoading() {
      const self = this
      /* return self.$nuxt.$store.getters['store/statusLoading'](self.tabName) */
      if (self.tabs[self.tabIndex] === 'all') {
        if (self.finishArraySearch && self.finishNcbiSearch) {
          return false
        } else if (
          self.finishArraySearch &&
          (self.arrayResults.length === 0 || self.arrayResults.length > 0) &&
          self.ncbiResults.length > 0
        ) {
          return false
        } else if (
          self.finishNcbiSearch &&
          (self.ncbiResults.length === 0 || self.ncbiResults.length > 0) &&
          self.arrayResults.length > 0
        ) {
          return false
        }
        return true
      } else if (self.tabs[self.tabIndex] === 'ncbi') {
        if (self.finishNcbiSearch) {
          return false
        } else if (self.ncbiResults.length > 0) {
          return false
        }
        return true
      } else if (self.tabs[self.tabIndex] === 'array') {
        if (self.finishArraySearch) {
          return false
        } else if (self.arrayResults.length > 0) {
          return false
        }
        return true
      }
      return false
    },

    checkNoData: () => {
      if (
        self.tabName === 'all' &&
        self.results.length === 0 &&
        self.finishArraySearch &&
        self.finishNcbiSearch
      ) {
        self.statusNoData = true
      } else if (
        self.tabName === 'array' &&
        self.arrayResults.length === 0 &&
        self.finishArraySearch
      ) {
        self.statusNoData = true
      } else if (
        self.tabName === 'ncbi' &&
        (self.ncbiResults.length === 0) & self.finishNcbiSearch
      ) {
        self.statusNoData = true
      }
    },
  },
  created() {
    const self = this
    self.loading = true
  },
  methods: {
    handleRowClick(item, $event) {
      event.stopPropagation()
      this.$nuxt.$emit('open-expedient', item)
    },
  },
}
</script>
<style>
.loading-bar {
  height: 100%;
  margin-top: 10%;
}
.url-link {
  text-decoration: unset;
}
</style>
