<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialogStatus">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          {{ item.accession }}
          <v-spacer></v-spacer>
          <a
            class="url-link"
            :href="item.url"
            target="_black"
            style="paddin-right: 8px"
          >
            <v-icon title="download files" justify="center"
              >vertical_align_bottom</v-icon
            >
          </a>
          <v-icon @click="dialogStatus = false">close</v-icon>
        </v-card-title>
        <v-layout align-center class="expedient-card-content">
          <v-item-group
            v-model="window"
            class="shrink mr-4"
            mandatory
            tag="v-flex"
          >
            <v-item v-for="(value, $index) in windows" :key="$index">
              <div slot-scope="{ active, toggle }">
                <v-btn :input-value="active" icon @click="toggle">
                  <v-icon>fiber_manual_record</v-icon>
                </v-btn>
              </div>
            </v-item>
          </v-item-group>
          <v-flex>
            <v-window v-model="window" vertical>
              <v-window-item v-for="(value, $i) in windows" :key="$i">
                <v-card flat>
                  <v-card-text v-if="value === 'information'">
                    <div>
                      <v-row v-for="(element, $j) in fields" :key="$j">
                        <span class="expedient-information-title"
                          >{{ element.name }}:</span
                        ><span v-if="element.name !== 'Genome'">{{
                          item[element.value]
                        }}</span>
                        <span v-else>{{ genome || 'Not available' }}</span>
                      </v-row>
                    </div>
                  </v-card-text>
                  <v-card-text v-if="value === 'samples'">
                    <v-list two-line subheader dense v-if="samples.length > 0">
                      <v-subheader class="expedient-information-title" inset
                        >Samples</v-subheader
                      >
                      <v-list-item
                        v-for="(sample, $ind) in samples"
                        :key="$ind"
                        avatar
                      >
                        <v-list-item-avatar>
                          <v-icon :class="[sample.iconClass]">{{
                            sample.icon
                          }}</v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title>{{
                            sample.title
                          }}</v-list-item-title>
                          <v-list-item-sub-title v-if="sample.subtitle">{{
                            sample.subtitle
                          }}</v-list-item-sub-title>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-btn icon ripple>
                            <a
                              class="url-link"
                              :href="sample.url"
                              :target="sample.target"
                            >
                              <v-icon color="grey lighten-1">{{
                                sample.icon
                              }}</v-icon>
                            </a>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list>
                    <div v-else align="center" justify="center">
                      <h3>
                        Not samples information available for this expedient
                      </h3>
                    </div>
                  </v-card-text>
                </v-card>
              </v-window-item>
            </v-window>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialogStatus = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      dialogStatus: false,
      item: {},
      fields: [
        { name: 'Title', value: 'name' },
        { name: 'Identifier', value: 'id' },
        { name: 'date', value: 'releasedate' },
        { name: 'Samples', value: 'n_samples' },
        { name: 'Species', value: 'species' },
        { name: 'Experiment type', value: 'experiment_type' },
        { name: 'Genome' },
        { name: 'Description', value: 'description' },
      ],
      windows: ['information', 'samples'],
      window: 0,
      samples: [],
    }
  },
  created() {
    const self = this
    self.$nuxt.$on('open-expedient', (item) => {
      if (item.samples.length > 0) {
        this.$store.commit('store/setGenome', { genome: 'Loading ...' })
        this.socket.emit('get_genome', item, (resp) => {})
      } else {
        this.$store.commit('store/setGenome', { genome: 'Not available' })
      }

      self.dialogStatus = true
      self.item = item
      self.window = 0
      self.samples = []
      self.generateSamples()
    })
  },
  methods: {
    generateSamples() {
      const self = this
      self.samples = []
      for (let i = 0, len = self.item.samples.length; i < len; i += 1) {
        const element = {
          icon: 'folder',
          iconClass: 'grey lighten-1 white--text',
          title: '',
        }
        if (self.item.bd === 'arrayexpress') {
          element.title = self.item.samples[i].assay.name
          element.url = self.item.samples[i].file[0].comment.value
          element.icon = 'get_app'
          element.target = ''
        } else {
          element.title = self.item.samples[i].accession
          element.subtitle = self.item.samples[i].title
          element.url = `https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${self.item.samples[i].accession}`
          element.icon = 'description'
          element.target = '_black'
        }
        self.samples.push(element)
      }
    },
  },
  mounted() {
    this.socket = this.$nuxtSocket({ channel: '/' })
  },
  beforeDestroy() {
    this.$nuxt.$off('open-expedient')
  },
  computed: {
    ...mapState({
      genome: (state) => state.store.genome,
    }),
  },
}
</script>
<style scoped>
.expedient-information-title {
  font-weight: bold;
  padding-right: 8px;
}
.expedient-card-content {
  margin: 24px 8px;
}
</style>
