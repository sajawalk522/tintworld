<template>
  <div id="app">
    <header class="hidden-xs">
      <!-- Vue Nav -->
      <section class="header-ctn">
        <!-- Top Nav -->
        <div class="d-flex flex-row nav-top">
          <div class="d-flex align-items-center tw-logo">
            <a class="logo" href="/index.php"
              ><img
                style="width: 100%"
                src="https://tint-world.s3.amazonaws.com/uploads/dist/images/tw-logo.png"
            /></a>
          </div>
          <div class="flex-auto">
            <form
              role="search"
              method="get"
              id="yith-ajaxsearchform"
              action="https://www.tintworld.com/"
            >
              <input
                placeholder="Search by Service, Product Type, Part Number, or Brand..."
                type="search"
                value=""
                name="s"
                id="yith-s"
                class="yith-s"
                data-loader-icon=""
                data-min-chars="3"
                autocomplete="off"
              />
              <i class="fa fa-search" aria-hidden="true"></i>
            </form>
          </div>
          <div class="d-flex align-items-center tw-top-right-icons">
            <a href="https://www.tintworld.com/my-account"><i class="fa fa-user" aria-hidden="true"></i> Account</a
            >
            <a href="#"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Cart</a
            >
            <a @click.stop="clickQuoteNow('desktop')" class="quote c-pointer"><i class="fa fa-briefcase" aria-hidden="true"></i> Get Quote</a>
            <a @click.stop="clickBookNow('desktop')" class="book"><i aria-hidden="true" class="fa fa-calendar"></i> Book Now</a>
          </div>
        </div>
        <!-- Nav Desktop -->
        <navbar-desktop />
        <!-- Nav Desktop End -->
      </section>
    </header>
    <header class="d-lg-none-custom d-xl-none mobile-menu">
      <!-- <b-button v-b-toggle.sidebar-backdrop>Toggle Sidebar</b-button> -->
      <section>
        <!-- Top Nav -->
        <div class="d-flex flex-row nav-top">
          <div class="w35 d-flex align-items-center justify-content-center">
            <i
              class="fa fa-bars"
              aria-hidden="true"
              v-b-toggle.sidebar-backdrop
            ></i>
          </div>
          <div class="w35 d-flex align-items-center justify-content-center">
            <a href="/search-page"><i class="fa fa-search" aria-hidden="true"></i></a>
          </div>
          <div class="flex-1 d-flex align-items-center justify-content-center logo-ctn">
            <a class="logo" href="https://www.tintworld.com/"><img style="width: 100%;" src="https://tint-world.s3.amazonaws.com/uploads/dist/images/tw-logo.png"/></a>
          </div>
          <div class="w35 d-flex align-items-center justify-content-center">
            <a href="https://www.tintworld.com/my-account"><i class="fa fa-user" aria-hidden="true"></i></a>
          </div>
          <div class="w35 d-flex align-items-center justify-content-center">
            <a href="/store/checkout"><i class="fa fa-shopping-cart" aria-hidden="true"></i></a>
          </div>
        </div>

        <!-- Nav Mobile -->
        <navbar-mobile />
        <!-- Nav Mobile End -->

        <!-- Sidebar -->
        <b-sidebar
          id="sidebar-backdrop"
          variant="dark"
          width="290px"
          bg-variant="white"
          backdrop
          shadow
          @change="mobileSidebarToggle"
        >
          <div class="s-book-quote d-flex flex-row">
            <div class="flex-1 d-flex align-items-center justify-content-center c-pointer">
              <a @click.stop="clickBookNow('mobile')" class="active"><i aria-hidden="true" class="fa fa-calendar"></i> Book Now</a>
            </div>
            <div class="flex-1 d-flex align-items-center justify-content-center c-pointer">
              <a @click.stop="clickQuoteNow('mobile')"><i class="fa fa-briefcase" aria-hidden="true"></i> Get Quote</a>
            </div>
          </div>
          <div id="level1" v-if="!this.$store.state.mobileMenuOpen1">
            <div
              class="d-flex flex-row w100 level1-item c-pointer"
              @click="desktopMenuOpen('services')"
            >
              <div class="flex-1 level1-label">Services</div>
              <div class="w25 text-right">
                <i class="fa fa-angle-right menu-arrow" aria-hidden="true"></i>
              </div>
            </div>
            <div
              class="d-flex flex-row w100 level1-item c-pointer"
              @click="desktopMenuOpen('products')"
            >
              <div class="flex-1 level1-label">Products</div>
              <div class="w25 text-right">
                <i class="fa fa-angle-right menu-arrow" aria-hidden="true"></i>
              </div>
            </div>
            <div
              class="d-flex flex-row w100 level1-item c-pointer"
              @click="desktopMenuOpen('deals')"
            >
              <div class="flex-1 level1-label">Deals</div>
              <div class="w25 text-right">
                <i class="fa fa-angle-right menu-arrow" aria-hidden="true"></i>
              </div>
            </div>
            <div
              class="d-flex flex-row w100 level1-item c-pointer bk-grey"
              @click="desktopMenuOpen('abouts')"
            >
              <div class="flex-1 level1-label">About</div>
              <div class="w25 text-right">
                <i class="fa fa-angle-right menu-arrow" aria-hidden="true"></i>
              </div>
            </div>
            <div
              class="d-flex flex-row w100 level1-item c-pointer bk-grey"
              @click="mobileToggleMenu3('help')"
            >
              <div class="flex-1 level1-label">Help Center</div>
              <div class="w25 text-right">
                <i class="fa fa-angle-right menu-arrow" aria-hidden="true"></i>
              </div>
            </div>
            <div
              class="d-flex flex-row w100 level1-item c-pointer bk-grey"
              @click="mobileToggleMenu3('resources')"
            >
              <div class="flex-1 level1-label">Resources</div>
              <div class="w25 text-right">
                <i class="fa fa-angle-right menu-arrow" aria-hidden="true"></i>
              </div>
            </div>
            <div
              class="d-flex flex-row w100 level1-item c-pointer bk-grey"
              @click="mobileToggleMenu3('news')"
            >
              <div class="flex-1 level1-label">News / Media</div>
              <div class="w25 text-right">
                <i class="fa fa-angle-right menu-arrow" aria-hidden="true"></i>
              </div>
            </div>
            <div
              class="d-flex flex-row w100 level1-item c-pointer bk-grey"
              @click="gotoLink('#')"
            >
              <div class="flex-1 level1-label">Franchise Opportunity</div>
              <div class="w25 text-right">
                <i class="fa fa-angle-right menu-arrow" aria-hidden="true"></i>
              </div>
            </div>
            <!-- find a store button -->
            <div class="d-flex justify-content-center">
              <div class="find-a-store" v-if="!selectedPlace">
                <a v-b-toggle.sidebar-backdrop class="menu-btn" ref="menuMobileStore" onclick="triggerStoreDropdownMobile()">
                  <i class="fa fa-crosshairs" aria-hidden="true"></i> Find A Store Near You
                </a>
              </div>
            </div>
            <div>
              <div class="current-store level1-item" v-if="selectedPlace">
                <div class="property flex-1 md-b15">
                  <div class="lbl-1 md-b10">
                    {{ selectedPlace.address.city }},
                    {{ selectedPlace.address.region }}
                    <span class="lbl-1-sub store-mobile ">(Store #{{selectedPlace["location-id"]}})</span>
                  </div>

                  <div class="d-flex flex-column lbl-info md-b10 store-mobile">
                    <span>{{ selectedPlace.address.street }}, </span>
                    <span>{{ selectedPlace.address.city }}, {{ selectedPlace.address.region }} {{ selectedPlace.address.postalCode }}</span>
                  </div>
                  <div class="p-distance d-flex flex-column lbl-info store-mobile">
                    <span class="c-blue c-pointer md-b10">{{
                      selectedPlace.mainPhone
                    }}</span>
                    <div class="md-b10">{{selectedPlace.distance.distanceMiles.toFixed(1)}} Miles |
                      <span
                        class="c-blue c-pointer"
                        @click.stop="
                          goToNewTabLink(selectedPlace.directionsURL)
                        "
                        >Get Directions</span>
                    </div>
                  </div>
                </div>
                <div class="flex-1">
                  <a class="menu-btn" @click.stop="gotoLink(selectedPlace.websiteUrl)">
                    Store Details & Offers
                    <i aria-hidden="true" class="fa fa-angle-right text-bold"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div id="level2" v-if="!this.$store.state.mobileMenuOpen2">
              <div
                class="d-flex flex-row w100 align-items-center level2-item c-pointer bk-grey"
                @click="desktopMenuOpen('')"
              >
                <div class="w25">
                  <i class="fa fa-angle-left menu-arrow" aria-hidden="true"></i>
                </div>
                <div class="flex-auto level2-mobile-label text-left pd-l0 t-cap">Main Menu</div>
                <div class="flex-1">
                  <div class="menu-btn" v-html="getSubTitle(this.$store.state.selectedMenu1)"></div>
                </div>
              </div>
              <div
                v-for="(menu2, index) in this.$store.state.menu2Items" :key="index"
                @click="mobileToggleMenu2(index)"
                class="d-flex flex-row w100 align-items-center level2-item c-pointer border-bottom"
              >
                <div v-if="menu2.menuThumb" class="w75">
                  <img :src="menu2.menuThumb ? menu2.menuThumb : 'https://www.tintworld.com/wp-content/uploads/accessory-lighting_ic_5_b566b84d-1.jpg'" alt="" />
                </div>
                <div class="flex-1 level2-mobile-label pd-l10" v-html="showMenu1Label(menu2)"></div>
                <div class="w25 text-right">
                  <i
                    class="fa fa-angle-right menu-arrow"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
            </div>
            <div id="level3" v-bind:class="this.$store.state.selectedMenuAlias" v-else>
              <div
                class="d-flex flex-row w100 align-items-center level2-item c-pointer bk-grey"
                @click="mobileToggleMenu2(-1)"
              >
                <div class="w25">
                  <i class="fa fa-angle-left menu-arrow" aria-hidden="true"></i>
                </div>
                <div class="flex-auto level3-mobile-label text-left pd-l0 t-cap" v-html="getSubTitle(this.$store.state.selectedMenu1)"></div>
                <div class="flex-1">
                  <div class="menu-btn" v-html="getSubTitle(this.$store.state.selectedMenu2)"></div>
                </div>
              </div>
              <div
                v-for="menu3 in this.$store.state.menu3Items"
                :key="menu3.id"
                @click="gotoLink(menu3.url)"
                class="d-flex flex-row w100 align-items-center level2-item c-pointer border-bottom"
              >
                <div class="w75">
                  <img :src="menu3.menuThumb ? menu3.menuThumb : 'https://www.tintworld.com/wp-content/uploads/marine-nano-ceramic-coating.png'" alt="" />
                </div>
                <div class="flex-1 level3-mobile-label pd-l10" v-html="menu3.title"></div>
              </div>
            </div>
          </div>
        </b-sidebar>
        <!-- / Sidebar -->
      </section>
    </header>
    <appointment-modal></appointment-modal>
    <quote-modal></quote-modal>
  </div>
</template>

<script>
// import Vue from 'vue';
// import {eventBus} from "./main"
import { mapMutations } from "vuex";
import axios from "axios";
import { getSubTitle } from "./utils/useful"
import NavbarDesktop from "./components/NavbarDesktop";
import NavbarMobile from "./components/NavbarMobile";
import AppointmentModal from "./components/appointment/AppointmentModal";
import QuoteModal from "./components/quote/QuoteModal";
import { BASE_URL } from './utils/constants'

export default {
  name: "App",
  components: {
    "navbar-desktop": NavbarDesktop,
    "navbar-mobile": NavbarMobile,
    "appointment-modal": AppointmentModal,
    "quote-modal": QuoteModal,
  },
  data: () => {
    return {
      visible: false,
    };
  },
  created: function () {
    var vm = this;
    // console.log("created1");
    axios
      // .get("/json/services.json", { baseURL: window.location.origin })
      .get(`${BASE_URL}/api/get-services`, { baseURL: window.location.origin })
      .then(function (response) {
        // vm.categories = response.data
        vm.$store.commit("setCategories", response.data);
      });
    // axios.get("./json/products.json").then(function (response) {
    axios.get(`${BASE_URL}/api/woocommerce/cats`).then(function (response) {
      vm.$store.commit("setProducts", response.data);
    });
    //axios.get("/api/get-deals").then(function (response) {
    axios.get(`${BASE_URL}/api/get-deals`).then(function (response) {
      vm.$store.commit("setDeals", response.data);
    });
    axios.get(`${BASE_URL}/api/get-about-us`).then(function (response) {
    //axios.get("/api/get-about-us").then(function (response) {
      vm.$store.commit("setAbouts", response.data);
    });
    // axios.get("https://newdev.tintworld.com/api/get-franchise").then(function (response) {
    //   console.log(response.data)
    // });
    axios.get("/json/years.json").then(function (response) {
      vm.$store.commit("setCarYears", response.data.years);
    });
    axios.get("/json/regions.json").then(function (response) { // http://twdev.tintworld.com/api/get-regions/US
      vm.$store.commit("setRegions", response.data);
    });
    axios.get("/json/appointment/appointment-service-options.json").then(function (response) {
      vm.$store.commit("setApptModels", response.data);
      vm.$store.commit("setQuoteModels", response.data);
    });
    // get my store data
    var json_store = localStorage.getItem('my_store')
    var myStore = null
    if(json_store) {
      myStore = JSON.parse(json_store)
      // console.log(myStore)
    }
    this.$store.commit("setStore", myStore);
    // get my appointment
    var json_appt = localStorage.getItem('my_appointment')
    if(json_appt) {
      var myAppt = JSON.parse(json_appt)
      this.$store.commit("setMyAppointment", myAppt);
    }else{
      this.$store.commit('edit_appointment', 'appt_store')
    }
    // get my quote
    var json_quote = localStorage.getItem('my_quote')
    if(json_quote) {
      var myQuote = JSON.parse(json_quote)
      this.$store.commit("setMyQuote", myQuote);
    }else{
      this.$store.commit('edit_quote', 'quote_store')
    }

  },
  computed: {
    selectedPlace() {
      return this.$store.state.myStore
    }
  },
  methods: {
    ...mapMutations(["mobileSidebarToggle"]),
    sidebarToggle(visible) {
      console.log({ visible });
      this.$store.commit("mobileSidebarToggle");
    },
    desktopMenuOpen(menu_label) {
      this.$store.commit("desktopMenuOpen", menu_label);
      console.log(this.$store.state);
    },
    updateStoreLocation(storeID){
      let vm = this;
      axios.get(`${BASE_URL}/api/yext-store?storeID=`+storeID)
          .then(function (response) {
            var cur_place = response.data
            vm.$store.commit("setStore", cur_place);
          });
    },
    mobileToggleMenu2(sel_id) {
      console.log(sel_id);
      this.$store.commit("MOBILE_TOGGLE_MENU2", sel_id);
      console.log(this.$store.state);
    },
    mobileToggleMenu3(state){
      console.log(this.$store.state);
      //this.$store.state = state;
      //this.$store.commit('MOBILE_TOGGLE_MENU2',sel_id);
      this.$store.commit('singleTierOpen',state);
    },
    gotoLink(link) {
      console.log({ link });
      location.href = link;
    },
    goToNewTabLink(url){
      if(url !== '') window.open(url,'_blank');
    },
    getSubTitle(sub_title) {
      return getSubTitle(sub_title);
    },
    setCookie(cname, cvalue, exdays){
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    getCookie(cname){
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    mobileDropdownToggle(item_label){
      switch(item_label) {
        case 'vehicle':
          this.$refs.menuMobileVehicle.$el.firstChild.click();
          break;
        case 'store':
          //this.$store.commit('mobileSidebarToggle','hide');
          this.$emit('desktopDropdownToggle','store');
          //this.$store.state.mobileMenuOpen1 = false;
          //this.$refs.menuMobileStore.$el.firstChild.click();
          break;
      }
      // this.$refs.menuProduct.$el.firstChild.click();
    },
    clickQuoteNow(type){
      console.log('quote click type', type)
      if(this.$store.state.quote.contact) {
        this.$store.commit('edit_quote', 'quote_contact')
      }else if(this.$store.state.quote.datetime){
        this.$store.commit('edit_quote', 'quote_date')
      }else if(this.$store.state.quote.service){
        this.$store.commit('edit_quote', 'quote_service')
      }else if(this.$store.state.quote.store){
        this.$store.commit('edit_quote', 'quote_store')
      }else{
        this.$store.commit('edit_quote', 'quote_store')
      }
      this.$root.$emit('bv::show::modal', 'quote-modal')
      this.$store.commit('TOGGLE_MODAL', 'quote')
    },
    clickBookNow(type) {
      // console.log({type})
      if(type === 'mobile'){
        // this.$store.commit("mobileSidebarToggle");
        // setTimeout(() => {
        //   this.$root.$emit('bv::show::modal', 'appointment-modal')
        // }, 100)
      }else{
        // this.$root.$emit('bv::show::modal', 'appointment-modal')
      }
      if(this.$store.state.appointment.contact) {
        this.$store.commit('edit_appointment', 'appt_contact')
      }else if(this.$store.state.appointment.datetime){
        this.$store.commit('edit_appointment', 'appt_date')
      }else if(this.$store.state.appointment.service){
        this.$store.commit('edit_appointment', 'appt_service')
      }else if(this.$store.state.appointment.store){
        this.$store.commit('edit_appointment', 'appt_store')
      }else{
        this.$store.commit('edit_appointment', 'appt_store')
      }
      console.log(this.$store.state.appointment)
      this.$root.$emit('bv::show::modal', 'appointment-modal')
      this.$store.commit('TOGGLE_MODAL', 'appointment')
    },
    showMenu1Label(menu2) {
      return this.$store.state.selectedMenu1 === 'services' ? menu2.abbrTitle : menu2.title
    }
  },
};
</script>

<style>
.b-sidebar > .b-sidebar-header .close{
  -webkit-mask: url(./assets/img/cancel.svg) no-repeat 100% 100%;
  mask: url(./assets/img/cancel.svg) no-repeat 100% 100%;
}
</style>
