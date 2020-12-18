<template>
  <v-sheet
    width="100%"
    height="100%"
    class="overflow-hidden"
    style="position: absolute, z-index: -1;"
  >
    <v-app-bar color="accent-4" dense dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click.stop="loadPage(item.title)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      items: [
        {
          title: 'GenomeBrowSeq',
          icon: 'mdi-view-dashboard',
        },
        {
          title: 'BiomarkeRs',
          icon: 'mdi-forum',
        },
      ],
    }
  },
  methods: {
    loadPage(page) {
      if (page === 'GenomeBrowSeq') {
        this.$router.push({
          path: '/',
        })
      } else if (page === 'BiomarkeRs') {
        this.$router.push({
          path: 'biomarkeRs',
        })
      }
    },
  },
}
</script>
