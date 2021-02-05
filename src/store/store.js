import Vue from 'vue';
import Vuex from 'vuex';

// import stocks from './modules/stocks';
// import portfolio from './modules/portfolio';

import * as actions from './actions';
import * as mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /* menus */
    categories: [],
    products: [],
    deals: [],
    abouts: [],
    // step: 0,
    /* vehicle */
    myVehicles: [],
    carYears: [],
    carMakes: [],
    /** location */
    myStore: null,
    // userLocation: {},
    // searchLocation: '',
    regions: [],
    /** mobile menu nav */
    mobileMenuOpen1: false,
    selectedMenu1: '',
    mobileMenuOpen2: false,
    selectedMenu2: '',
    menu2Items: [],
    menu3Items: [],
    /* appointment modal */
    appointment_modal: false,
    appt_cur_stage: 'appt_store', // appt_store | appt_service | appt_date | appt_contact | appt_confirm | appt_book
    appointment: {
      store: null,
      service: null,
      datetime: null,
      contact: null,
    },
    appt_options_marine: [],
    appt_options_residential: [],
    appt_options_commercial: [],
    /** quote modal */
    quote_modal: false,
    quote_cur_stage: 'quote_store', // quote_store | quote_service | quote_date | quote_contact | quote_confirm | quote_book
    quote: {
      store: null,
      service: null,
      contact: null,
    },
    quote_options_marine: [],
    quote_options_residential: [],
    quote_options_commercial: [],
  },
  mutations,
  actions,
  modules: {
      // stocks,
      // portfolio
  }
});
