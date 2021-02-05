import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import './style/style.scss'
import './style/quote/index.scss'
import './style/appointment/index.scss'
import './style/appointment/appt_store.scss'
import './style/appointment/appt_service.scss'
import './style/appointment/appt_date.scss'
import './style/appointment/appt_contact.scss'
import './style/appointment/appt_confirm.scss'
import * as VueGoogleMaps from 'vue2-google-maps'
// import 'vue-googlemaps/dist/vue-googlemaps.css'
// import VueGoogleMaps from 'vue-googlemaps'

import store from './store/store';
Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.config.devtools = true;
// Vue.use(VueGoogleMaps, {
//   load: {
//     apiKey: 'AIzaSyB1aX0Ss-xisZEtUnBwyvfiU_zgzQyIP30',
//   },
//   installComponents: false,
// });
// Vue.component('google-map', VueGoogleMaps.Map);
// Vue.component('google-marker', VueGoogleMaps.Marker);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB1aX0Ss-xisZEtUnBwyvfiU_zgzQyIP30',
    libraries: 'places',
    // v: '3.40',
  },
  // Demonstrating how we can customize the name of the components
  installComponents: true,
});
Vue.component('google-map', VueGoogleMaps.Map);
Vue.component('gmap-autocomplete', VueGoogleMaps.Autocomplete);
Vue.component('ground-overlay', VueGoogleMaps.MapElementFactory({
  mappedProps: {
    'opacity': {}
  },
  props: {
    'source': {type: String},
    'bounds': {type: Object},
  },
  events: ['click', 'dblclick'],
  name: 'groundOverlay',
  // eslint-disable-next-line no-undef
  ctr: () => google.maps.GroundOverlay,
  ctrArgs: (options, {source, bounds}) => [source, bounds, options],
}));


export const eventBus = new Vue({
  methods: {
    updatedVehicle(value) {
      this.$emit('updatedVehicleGarage', value)
    },
    changedStageValidationAppointment(value) {
      this.$emit('isChangedApptValidation', value)
    },
    changedStageValidationQuote(value) {
      this.$emit('isChangedQuoteValidation', value)
    },
    updatedStore(value){
      this.$emit('updatedStore',value);
    }
  }
})

var tintworldVue = new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
console.log(tintworldVue);
window.tintworldVue = tintworldVue;