<template>
  <div column>
    <v-menu bottom>
      <template v-slot:activator="{ on }">
        <v-icon class="results-status-icon" title="Status query" v-on="on">
          arrow_circle_down
        </v-icon>
      </template>

      <v-list dense>
        <v-list-item v-for="(item, index) in getStatusSearch" :key="index" row>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <span class="dot" :class="item.statusClass"></span>
        </v-list-item>
      </v-list>
    </v-menu>
    <div class="search-bar" justify="center" align="center" row>
      <v-text-field
        v-model="query"
        class="search-line"
        label="Search"
        append-icon="search"
        @keyup.enter="search"
        @click:append="search"
      ></v-text-field>
    </div>
    <div row class="query-search-row">
      <span class="results-Search-title">Search:</span
      ><span>{{ queryStore }}</span>
    </div>
    <v-toolbar tabs>
      <v-tabs
        v-model="showTabs"
        slider-color="#3b3b3b"
        color="#3b3b3b"
        @change="setTabIndex($event)"
      >
        <v-tab v-for="tab in tabs" :key="tab"> {{ tab }} </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="showTabs">
      <v-tab-item v-for="(tab, $index) in tabs" :key="$index">
        <tab-panel :tabName="tab" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import TabPanel from '../components/tabPanel.vue'

export default {
  components: {
    TabPanel,
  },
  data() {
    return {
      showTabs: false,
      query: '',
      socket: {},
    }
  },
  computed: {
    ...mapState({
      tabs: (state) => state.store.tabs,
      finishNcbiSearch: (state) => state.store.finishNcbiSearch,
      finishArraySearch: (state) => state.store.finishArraySearch,
      queryStore: (state) => state.store.query,
    }),
    getStatusSearch: {
      get() {
        const self = this
        const statusList = []
        if (self.finishNcbiSearch) {
          statusList.push({ title: 'NCBI', statusClass: 'dot__color_finish ' })
        } else if (!self.finishNcbiSearch) {
          statusList.push({ title: 'NCBI', statusClass: 'dot__color_pending ' })
        }
        if (self.finishArraySearch) {
          statusList.push({
            title: 'Arrayexpress',
            statusClass: 'dot__color_finish ',
          })
        } else if (!self.finishArraySearch) {
          statusList.push({
            title: 'Arrayexpress',
            statusClass: 'dot__color_pending ',
          })
        }
        return statusList
      },
    },
  },
  created() {
    const self = this
    self.socket = this.$nuxtSocket({
      name: 'home',
      channel: '/',
      teardown: false,
      persist: true,
    })
    if (self.queryStore) {
      self.socket.emit('emit_search', self.queryStore, (resp) => {})
    }
    if (self.tabs.length > 0) {
      self.showTabs = true
    }
  },
  methods: {
    search() {
      const self = this
      self.$store.commit('store/setQuery', this.query)
      self.socket.emit('emit_search', this.query)
    },
    setTabIndex(event) {
      const self = this
      self.$store.commit('store/setTab', event)
    },
  },
}
</script>
<style>
.search-bar {
  margin: 16px 0;
  padding: 16px;
}
.search-line {
  width: 50%;
}
.query-search-row {
  margin-bottom: 16px;
}
.dot {
  height: 14px;
  width: 14px;
  border-radius: 50%;
  margin-left: 8px;
  display: inline-block;
}
.dot__color_finish {
  background-color: rgb(53, 169, 53);
}
.dot__color_pending {
  background-color: goldenrod;
}
.results-Search-title {
  font-weight: bold;
  padding-right: 8px;
}
.results-status-icon {
  position: absolute !important;
  top: 62px;
  right: 56px;
}
</style>
