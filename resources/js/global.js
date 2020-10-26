import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import _ from 'lodash'
import Swal from 'sweetalert2'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

global.Swal = Swal;