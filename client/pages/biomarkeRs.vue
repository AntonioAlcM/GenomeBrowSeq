<template>
  <div>
    <Menu />
    <iframe
      width="100%"
      height="1000"
      frameBorder="0"
      style="margin-top: 24px"
      src="http://localhost:3838/ "
    ></iframe>
  </div>
</template>

<script>
import Menu from '../components/menu.vue'
export default {
  components: { Menu },
  data() {
    return {
      query: '',
      html: '',
      shinyUrl: process.env.SHINY_URL,
    }
  },
  methods: {
    async fetchSomething() {
      const config = {
        headers: { 'Access-Control-Allow-Origin': '*' },
      }
      this.html = await this.$axios.get('/shiny', config)
      console.log(' -*-*-*-*-*-* ', this.html)
    },
  },
}
</script>
