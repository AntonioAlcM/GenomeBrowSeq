<template>
  <div>
    ------------------- {{ item }}
    <td>{{ item.id }}</td>
    <td class="text-xs-right">{{ item.name }}</td>
    <td class="text-xs-right">{{ item.n_samples }}</td>
    <td class="text-xs-right">{{ item.releasedate }}</td>
    <td class="text-xs-right">{{ item.species }}</td>
    <td class="text-xs-right">{{ item['experiment_type'] }}</td>
    <td class="text-xs-right">{{ item.description }}</td>
    <td class="text-xs-right">{{ item.bd }}</td>
    <td class="text-xs-right">
      <v-icon @click.prevent="downloadItem(item)">arrow-collapse-down</v-icon>
    </td>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  props: {
    item: Object,
  },
  data() {
    return {
      results: [],
    }
  },
  computed: {
    ...mapState({
      ncbiResults: (state) => state.store.ncbiResults,
      arrayResults: (state) => state.store.arrayResults,
    }),
  },
  watch: {
    ncbiResults() {
      const self = this
      self.results.concat(self.ncbiResults)
    },
    arrayResults() {
      const self = this
      self.results.concat(self.arrayResults)
    },
  },
  methods: {
    downloadItem(item) {
      this.$axios
        .get(item.url, { responseType: 'blob' })
        .then((response) => {
          const blob = new Blob([response.data], { type: 'application/pdf' })
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = item.name
          link.click()
          URL.revokeObjectURL(link.href)
        })
        .catch(console.error)
    },
  },
}
</script>
<style>
.loading-bar {
  height: 100%;
}
</style>
