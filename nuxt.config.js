export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'server',
  server: {
    // host: '192.168.217.234'
  },
  head: {
    title: 'Gachakata',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Ayo gacha untuk menemukan kata-kata para tokoh diseluruh dunia' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-modal.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    'cookie-universal-nuxt',
    '@nuxtjs/pwa',
    '@nuxtjs/axios'
  ],

  serverMiddleware: ['~/api/index'],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'GachaKata',
      short_name: 'GachaKata',
      description: 'GachaKata adalah sebuah web yang akan memberikan kata-kata dari berbagai tokoh didunia dengan sistem gacha',
      lang: 'en',
    },
    icon: {
      purpose: 'maskable'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
