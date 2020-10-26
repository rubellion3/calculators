import Vue from 'vue'
import App from './App.vue'
import router from  './router';
import './global'

global.axios = require('axios');
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
let token = document.head.querySelector('meta[name="csrf-token"]');
// axios.defaults.headers.common['X-CSRF-TOKEN'] = (token) ? token.content: '';
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);
// Vue.axios.defaults.baseURL = ;
Vue.router = router;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
