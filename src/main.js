import Vue from 'vue';
import App from './App.vue';
import router from './routes';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/main.css';

Vue.config.productionTip = false;
Vue.use(VueLoading);
Vue.use(VueAxios, axios);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
