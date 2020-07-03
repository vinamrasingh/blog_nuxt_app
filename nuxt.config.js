const bodyParser=require('body-parser')
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Tenali+Ramakrishna&display=swap" }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~assets/styles/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  env: {
    baseUrl: process.env.BASE_URL || 'https://nuxt-blog-98ccd.firebaseio.com',
    fbAPIKey: 'AIzaSyB9yQsBNUiqejHdkGCFeOn5RP8DN4NcI0Q'
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '*',
        component: resolve(__dirname, 'pages/index.vue'),
        linkActiveClass: 'active'
      })
    },
    middleware: 'log'
  },
  pageTransition: {
    name: 'fade',
    mode: 'out-in'
  },
  serverMiddleware: [
    bodyParser.json(),
    '~/api'
  ]
}
