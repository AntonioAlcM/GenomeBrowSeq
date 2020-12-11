<template>
  <div class="content">
    <img class="logoHead" src="/genomebrowseq.png" />
    <v-row justify="center" align="center">
      <v-text-field
        v-model="query"
        label="Search"
        single-line
        append-icon="search"
        @click:append="search"
        @keyup.enter="search"
      ></v-text-field>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
    }
  },
  methods: {
    search() {
      this.$store.commit('store/setQuery', this.query)
      this.$router.push({
        path: 'results',
      })
    },
  },
}
</script>
<style>
.logoHead {
  height: 240px;
  width: 540px;
}
.content {
  margin: 32px 32px;
}
</style>
