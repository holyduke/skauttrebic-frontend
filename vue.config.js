const path = require('path');
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

module.exports = {
  "transpileDependencies": [
    "vuetify",
    /ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/,
  ],

  configureWebpack: {
    devtool: 'source-map'
  },

  // configureWebpack: {
  //   plugins: [
  //     // CKEditor needs its own plugin to be built using webpack.
  //     new CKEditorWebpackPlugin({
  //       // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
  //       language: 'en',

  //       // Append translations to the file matching the `app` name.
  //       translationsOutputFile: /app/
  //     })
  //   ]
  // },

  devServer: {
    // proxy: 'https://cdn.skauting.cz/',
    // proxy: 'http://localhost:1337',
    https: true
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
