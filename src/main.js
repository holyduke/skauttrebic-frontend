import Vue from "vue";
import App from "./App";
import router from "./router";
import Vuetify from "vuetify";
import store from './store/store'
import axios from "axios";
import i18n from './i18n'
import cs from 'vuetify/es5/locale/zh-Hans'
import VuePictureSwipe from 'vue-picture-swipe';
Vue.component('vue-picture-swipe', VuePictureSwipe);

import CKEditor from '@ckeditor/ckeditor5-vue';
Vue.use( CKEditor );

require('@/store/subscriber');
axios.defaults.baseURL = store.getters.getBackendAPI;
if (store.getters.getJwt) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters.getJwt;
}
else  {
  delete axios.defaults.headers.common['Authorization'];
}


const vuetify = new Vuetify({
  lang: {
    // If you change the language here, then it changes in the editor itself
    current: "cs", // en | es | fr | pl | ru
    locales: cs
  }
});


Vue.use(Vuetify);

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  router,
  vuetify,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
