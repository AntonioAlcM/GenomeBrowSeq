import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - client',
    title: 'client',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~plugins/filters.js', '~plugins/vue-tippy.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/axios', 'nuxt-socket-io'],
  io: {
    sockets: [
      // Required
      {
        // At least one entry is required
        name: 'home',
        url: 'http://0.0.0.0:9000',
        default: true,
        vuex: {
          mutations: [
            'setQuery',
            'setNcbiExpedients',
            { returngenome: 'store/setGenome' },
          ],
          actions: [
            { sendncbi: 'store/send_expedients_ncbi' },
            { finishncbi: 'store/finish_ncbi' },
            { sendarrayexpress: 'store/send_expedients_array_express' },
            { finisharrayexpress: 'store/finish_array_express' },
            { totalresultsncbi: 'store/total_results_ncbi' },
            { totalresultsarrayexpress: 'store/total_results_array_express' },
          ],
          emitBacks: [],
        },
        namespaces: {
          /* see section below */
        },
      },
    ],
  },
  axios: {},
  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#3f51b5',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c',
        },
      },
    },
    defaultAssets: {
      font: true,
      icons: 'md',
    },
    icons: {
      iconfont: 'md',
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
