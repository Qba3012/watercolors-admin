import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - watercolors-admin',
    title: 'watercolors-admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/img/favicon.ico' },
      { href: 'https://fonts.googleapis.com/css2?family=Cormorant+SC:wght@300;400;500;600;700&display=swap', rel: 'stylesheet' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/main.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '@/plugins/video-bg', ssr: false },
    { src: '@/plugins/repositories'},
    { src: '@/plugins/notifier'},
    { src: '@/plugins/modal'},
    { src: '@/plugins/errorHandler'}
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.SERVER || 'https://watercolors-api.pl', // Used as fallback if no runtime config is provided
    browserBaseURL: 'https://watercolors-api.pl',
    proxyHeaders: true,
    proxy: true,
  },

  auth: {
    strategies: {
      local: false,
      keycloak: {
        scheme: 'oauth2',
        endpoints: {
          authorization: '/auth/realms/myrealm/protocol/openid-connect/auth',
          token: '/auth/realms/myrealm/protocol/openid-connect/token',
          userInfo: '/auth/realms/myrealm/protocol/openid-connect/userinfo',
          logout: '/auth/realms/myrealm/protocol/openid-connect/logout?redirect_uri=' + encodeURIComponent('https://watercolors-console.pl')
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          name: 'Authorization',
          maxAge: 300
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        responseType: 'code',
        grantType: 'authorization_code',
        clientId: 'watercolors-front',
        scope: ['openid', 'profile', 'email'],
        codeChallengeMethod: 'S256'    
      }
    },
    redirect: {
      home: '/',
      login: '/login',
      callback:'/success',
      logout: '/login'
    }
  },

  proxy: {
    '/auth': {
      target: 'https://watercolors-console.pl'
    }
  },

  router: {
    middleware: ['auth']
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      light: true,
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
