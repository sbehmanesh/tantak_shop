import colors from 'vuetify/es5/util/colors'
const fa = require('./locales/vuetifyjs.fa.json')


export default {
  ssr: true,
  target: 'server',
  server: {
    port: 4000,
    host: 'localhost',
    // host: '0.0.0.0',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'فروشگاه تن تاک',
    titleTemplate: '%s',
    htmlAttrs: {
      lang: 'fa',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // { hid: 'description', name: 'og:description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'og:site_name', content: 'فروشگاه تن تاک' },
      // { name: 'og:title', content: 'فروشگاه تن تاک' },
      { name: 'og:type', content: 'website' },
      { name: 'og:locale', content: 'fa_IR' },
      { name: 'enamad', content: '661177' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/static/css/fonts.css',
    '~/static/css/app.css',
    '~/static/css/google_font.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios', 
    '~/plugins/helper', 
    '~/plugins/other', 
    { src: '~/plugins/no-ssr.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    'nuxt-leaflet'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://momentjs.com/
    '@nuxtjs/moment',
    // https://www.npmjs.com/package/@nuxtjs/toast
    '@nuxtjs/toast',
    // https://www.npmjs.com/package/cookie-universal-nuxt
    'cookie-universal-nuxt',
  ],

  toast: {
    duration: 3000,
    position: 'bottom-left',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // axios: {
  //   // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
  //   baseURL: '/',
  // },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          accent: colors.grey.darken3,
           primary: '#1a6cd1ff',
           info: '#053e84ff',
          success: colors.green.accent3,
          secondary: colors.blue.darken4,
          error: colors.deepOrange.accent4,
          background1: '#292929',
          background2: '#212121',
          whited:'#212121',      
          blackd:'#ffffff'      
        },
        light: {
          // base main color #142a50
          // base second color #d3830d
          // base accent color #f77fbe  
          info: '#053e84ff',
          error: '#CC3535',
          primary: '#055ac2',
          lightprimary: '#0d67d5ff',
          warning: '#997000',
          accent: '#C2780A',
          success: '#3D853A',
          secondary: '#142a50',
          background1: '#f2f2f2',
          background2: '#ffffff',
          whited:'#ffffff',
          blackd:'#212121',
          gray: '#939292',
          lightgray: '#f4f4f4',
          orange: '#DFA34C',
          light: '#f1ddfc'     

        },
      },
    },
    rtl: true,
    lang: {
      locales: { fa },
      current: 'fa',
    },
    icons: {
      iconfont: 'md',
    },
    materialIcons: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

}
