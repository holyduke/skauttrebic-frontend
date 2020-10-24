module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  configureWebpack: {
    devtool: 'source-map'
  },

  devServer:  {
    // proxy: 'https://cdn.skauting.cz/',
    // proxy: 'http://localhost:1337',
    // https: true
  },

  pluginOptions: {
    i18n: {
      locale: 'cs',
      fallbackLocale: 'cs',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
