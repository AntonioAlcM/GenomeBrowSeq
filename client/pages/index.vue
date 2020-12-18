<template>
  <div>
    <Menu />
    <v-row justify="center" align="center">
      <div class="text-center">
        <Search style="margin-top: 32px"></Search>
      </div>
    </v-row>
  </div>
</template>

<script>
import Menu from '../components/menu.vue'
import Search from '~/components/Search.vue'

export default {
  components: {
    Search,
    Menu,
  },
}
</script>
