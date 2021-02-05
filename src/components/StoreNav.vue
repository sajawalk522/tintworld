<template>
  <b-row class="nav-container">
    <b-col class="dropdown-ctn">
      <div>
        <b-card no-body>
          <div class="store-container">
            <div class="map-area">
              <gmap-map
                :center="center"
                :zoom="map_zoom"
                style="width: 100%; height: 400px"
              >
                <gmap-marker
                  :key="index"
                  v-for="(m, index) in markers"
                  :position="m.position"
                  @click="center = m.position"
                ></gmap-marker>
              </gmap-map>
            </div>
            <div class="location-area">
              <div
                class="close-btn c-pointer"
                @click="desktopDropdownToggle('store')"
              >
                <close-img></close-img>
              </div>
              <div class="store-header pd-15"
                v-if="
                  cur_step == 'step_state' ||
                  cur_step == 'step_city' ||
                  cur_step == 'step_place'
                ">
                <div
                  class="geolocate-area"
                >
                  <div class="search">
                    <gmap-autocomplete
                      class="input-auto-complete"
                      @place_changed="updatePlace"
                      placeholder="Search for a store by City, State, or Zip"
                      enable-geolocation=true
                    ></gmap-autocomplete>
                    <i
                      aria-hidden="true"
                      class="fa_search fa fa-search"
                    ></i>
                  </div>
                  <div class="btn-location">
                    <a
                      class="getLocation c-pointer"
                      @click.stop="getCurrentLocation()"
                    >
                      <div class="b-loc">
                        <img
                          src="./../assets/geolocation.png"
                          alt="geolocation-icon"
                        />
                        <span>Current Location</span>
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  class="radio-area store-mobile"
                  v-if="
                    cur_step === 'step_place'
                  "
                >
                  <b-form-group label="">
                    <b-form-radio-group
                      v-model="view_selector"
                      :options="options"
                      class="lbl-radio"
                      value-field="item"
                      text-field="name"
                      disabled-field="notEnabled"
                    ></b-form-radio-group>
                  </b-form-group>
                </div>
              </div>
              <div
                class="scroll-area"
                :class="{
                  full: cur_step == 'step_place_detail',
                  us_city: cur_step == 'step_state' || cur_step == 'step_city',
                  }"
              >
                <div class="state-area" v-if="cur_step == 'step_state'">
                  <div class="us-area pd-15">
                    <div class="sub-lbl">UNITED STATES</div>
                    <div class="sub-states">
                      <div
                        class="lbl-state c-pointer"
                        v-for="(r, index) in this.$store.state.regions"
                        :key="index"
                        @click.stop="selRegion(r)"
                      >
                        {{ r.region }}
                      </div>
                    </div>
                  </div>
                  <div class="line-mobile md-lr15"></div>
                  <div class="international-area">
                    <div class="sub-lbl">INTERNATIONAL</div>
                    <div class="d-flex flex-column">
                      <div class="">
                        <div class="lbl-country t-bold">Canada</div>
                        <div class="lbl-state flex1 c-pointer" @click.stop="selRegion({region_code: 'ON'})">Ontario</div>
                      </div>
                      <div class="">
                        <div class="lbl-country t-bold">Saudi Arabia</div>
                        <div class="lbl-state flex1 c-pointer" @click.stop="selRegion({region_code: 'Riyadh Province'})">Riyadh Province</div>
                      </div>
                      <div class="">
                        <div class="lbl-country t-bold">
                          United Arab Emirates
                        </div>
                        <div class="lbl-state flex1 c-pointer" @click.stop="selRegion({region_code: 'Abu Dhabi'})">Dubai</div>
                      </div>
                    </div>
                    <div class="line-mobile"></div>
                    <div class="up-btn-custom" style="margin-top: auto">
                      <div class="btn-custom" @click.stop="gotoLink('https://www.tintworld.com/locations/')">
                        View All Locations
                        <i aria-hidden="true" class="fa fa-angle-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="city-area" v-if="cur_step == 'step_city'">
                  <div class="us-area pd-15">
                    <div class="sub-lbl text-uppercase">{{sel_country}}</div>
                    <div class="lbl-country t-bold">{{sel_state}}</div>
                    <div class="sub-states city" v-if="this.cities.length > 0">
                      <div
                        class="lbl-state c-pointer"
                        @click.stop="selCity(c)"
                        v-for="(c, index) in this.cities"
                        :key="index"
                      >
                        {{ c.city }}
                      </div>
                    </div>
                    <div class="flex-1" v-else>
                      <div class="lbl-info">
                        There is no cities in this region
                      </div>
                    </div>
                    <div style="margin-top: auto">
                      <div @click.stop="gotoBack('')" class="btn-custom mw-200">
                        <i aria-hidden="true" class="fa fa-angle-left"></i> Back
                        to Store Search
                      </div>
                    </div>
                  </div>
                </div>
                <div class="map-area store-mobile" v-if="view_selector === 'map' && cur_step === 'step_place' ">
                  <gmap-map
                    :center="center"
                    :zoom="6"
                    style="width: 100%; height: 400px"
                  >
                    <gmap-marker
                      :key="index"
                      v-for="(m, index) in markers"
                      :position="m.position"
                      @click="center = m.position"
                    ></gmap-marker>
                  </gmap-map>
                </div>
                <div class="place-area" v-if="cur_step == 'step_place'">

                  <div class="empty-result">
                    <div class="flex-1" v-if="this.places.length !== 0">
                      <div
                        class="place-row"
                        v-for="(p, index) in this.places"
                        :key="index"
                      >
                        <div class="place-info1">
                          <div class="p-address1">
                            {{ p.address.street }} {{ p.address.street2 }}
                          </div>
                          <div class="p-address2 md-b15">
                            {{ p.address.city }}, {{ p.address.region }}
                            {{ p.address.postalCode }}
                          </div>
                          <div class="p-contact c-blue c-pointer">
                            {{ p.mainPhone }}
                          </div>
                          <div class="mobile-place-info2">
                            <div class="text-bold p-time c-green">
                              Open Until {{ p.currentHours }}
                            </div>
                            <div class="p-distance md-b15">
                              {{ p.distance.distanceMiles.toFixed(1) }} Miles |
                              <span
                                class="c-blue c-pointer"
                                @click.stop="goToNewTabLink(p.directionsURL)"
                                >Get Directions</span
                              >
                            </div>
                            <div
                              class="p-contact c-blue c-pointer details-btn"
                              @click.stop="showDetail(p)"
                            >
                              See Store Details
                            </div>
                          </div>
                        </div>
                        <div class="place-info2">
                          <div class="text-bold p-time c-green">
                            Open Until {{ p.currentHours }}
                          </div>
                          <div class="p-distance md-b15">
                            {{ p.distance.distanceMiles.toFixed(1) }} Miles |
                            <span
                              class="c-blue c-pointer"
                              @click.stop="goToNewTabLink(p.directionsURL)"
                              >Get Directions</span
                            >
                          </div>
                          <div
                            class="p-contact c-blue c-pointer details-btn"
                            @click.stop="showDetail(p)"
                          >
                            See Store Details
                          </div>
                        </div>
                        <div class="place-info3">
                          <div
                            class="heart-area active c-pointer"
                            v-if="isMyStore(p['location-id'])"
                          >
                            <i aria-hidden="true" class="fa fa-heart"></i>
                            <p>My</p>
                            <p>Store</p>
                          </div>
                          <div
                            class="heart-area c-pointer"
                            v-else
                            @click.stop="setStore(p['location-id'])"
                          >
                            <i aria-hidden="true" class="fa fa-heart-o"></i>
                            <p>Set as</p>
                            <p>My Store</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="lbl-info pd-15 flex-1" v-if="this.places.length === 0">
                      There is no result.
                    </div>
                    <div class="pd-15">
                      <div @click.stop="gotoBack('')" class="btn-custom mw-200">
                        <i aria-hidden="true" class="fa fa-angle-left"></i> Back
                        to Store Search
                      </div>
                    </div>
                  </div>
                </div>
                <div class="place-detail-area" v-if="cur_step == 'step_place_detail'">
                  <div class="cap1-area d-flex pd-15">
                    <div
                      class="heart-area active c-pointer"
                      v-if="isMyStore(selectedPlace['location-id'])"
                    >
                      <i aria-hidden="true" class="fa fa-heart"></i>
                      <p>My</p>
                      <p>Store</p>
                    </div>
                    <div
                      class="heart-area c-pointer"
                      v-else
                      @click.stop="setStore(selectedPlace['location-id'])"
                    >
                      <i aria-hidden="true" class="fa fa-heart-o"></i>
                      <p>Set as</p>
                      <p>My Store</p>
                    </div>
                    <div class="property flex-1">
                      <div class="lbl-1">
                        {{ selectedPlace.address.city }},
                        {{ selectedPlace.address.region }}
                        <span class="lbl-1-sub store-desktop"
                          >(Store #{{
                            sprintf(selectedPlace["location-id"])
                          }})</span
                        >
                      </div>
                      <div class="lbl-1-sub store-mobile md-b10 "
                        >(Store #{{
                          sprintf(selectedPlace["location-id"])
                        }})
                      </div>
                      <div class="lbl-info md-b10 store-desktop">
                        {{ selectedPlace.address.street }},
                        {{ selectedPlace.address.city }},
                        {{ selectedPlace.address.region }}
                        {{ selectedPlace.address.postalCode }}
                      </div>
                      <div class="d-flex flex-column lbl-info md-b10 store-mobile">
                        <span>{{ selectedPlace.address.street }}, </span>
                        <span>{{ selectedPlace.address.city }}, {{ selectedPlace.address.region }} {{ selectedPlace.address.postalCode }}</span>
                      </div>
                      <div class="p-distance lbl-info store-desktop">
                        <span class="c-blue c-pointer">{{
                          selectedPlace.mainPhone
                        }}</span>
                        |
                        {{
                          selectedPlace.distance.distanceMiles.toFixed(1)
                        }}
                        Miles |
                        <span
                          class="c-blue c-pointer"
                          @click.stop="
                            goToNewTabLink(selectedPlace.directionsURL)
                          "
                          >Get Directions</span
                        >
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
                        <div class="switch-map md-b10 store-mobile">
                          <span>Map</span>
                          <b-form-checkbox v-model="map_checked" name="check-button" switch></b-form-checkbox>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="map_checked" class="store-mobile">
                    <gmap-map
                      :center="center"
                      :zoom="6"
                      style="width: 100%; height: 400px; margin-bottom: 15px;"
                    >
                      <gmap-marker
                        :key="index"
                        v-for="(m, index) in markers"
                        :position="m.position"
                        @click="center = m.position"
                      ></gmap-marker>
                    </gmap-map>
                  </div>
                  <div class="place-property">
                    <div class="w170 bk-grey">
                      <div class="c-green lbl-info t-bold md-b10">
                        Open Until {{ selectedPlace.currentHours }}
                      </div>
                      <div v-html="showHours(selectedPlace.hours)" class="day-available"></div>
                    </div>
                    <div class="store-amenity flex-1 bk-grey">
                      <div class="lbl-info t-bold md-b10">
                        Store Amenities & Specialties:
                      </div>
                      <div class="place-service">
                        <div class="service-row">
                          <img src="../assets/img/icon_anchor.png" alt="" />
                          <span class="lbl-info">Marine Services</span>
                        </div>
                        <div class="service-row">
                          <img src="../assets/img/icon_wrench.png" alt="" />
                          <span class="lbl-info">Auto Repair Services</span>
                        </div>
                        <div class="service-row">
                          <img src="../assets/img/icon_truck.png" alt="" />
                          <span class="lbl-info">Oversized Vehicles</span>
                        </div>
                        <div class="service-row">
                          <img src="../assets/img/icon_handcap.png" alt="" />
                          <span class="lbl-info">Accessible</span>
                        </div>
                        <div class="service-row">
                          <img src="../assets/img/icon_wifi.png" alt="" />
                          <span class="lbl-info">Free Wifi</span>
                        </div>
                        <div class="service-row">
                          <img src="../assets/img/icon_coffee.png" alt="" />
                          <span class="lbl-info">Free Coffee & Snacks</span>
                        </div>
                        <div class="service-row">
                          <img src="../assets/img/icon_moon.png" alt="" />
                          <span class="lbl-info">Overnight Drop-Off</span>
                        </div>
                        <div class="service-row">
                          <img src="../assets/img/icon_pet.png" alt="" />
                          <span class="lbl-info">Pet Friendly</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="btn-actions">
                    <div
                      class="btn-custom mw-200 disable"
                      @click.stop="gotoBack('place')"
                    >
                      <i aria-hidden="true" class="fa fa-angle-left"></i>
                      <span>Back to Store Search</span>
                    </div>
                    <div
                      @click.stop="gotoLink(selectedPlace.websiteUrl)"
                      class="btn-custom mw-200 bk-blue"
                    >
                      <span class="store-detail-link">Store Details & Offers</span>
                      <i aria-hidden="true" class="fa fa-angle-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-card>
      </div>
    </b-col>
  </b-row>
</template>

<script>
// import Vue from 'vue'
// import { mapMutations } from "vuex";
import {eventBus} from "../main";
import axios from "axios";
import {gmapApi} from 'vue2-google-maps'
import CloseImg from "./CloseImg";
import { BASE_URL } from '../utils/constants'

var config = {
    // crossdomain: true,
    // headers: {'Access-Control-Allow-Origin': '*'},
  };
export default {
  components: {
    CloseImg
  },
  data: () => {
    return {
      searchLocation: '',
      cur_step: 'step_state', // state | city | place | place_detail | result
      map_zoom: 6,
      center: { lat: 26.40, lng: -80.08 },
      markers: [
        {position: {
          lat: 26.409868200000002,
          lng: -80.0852433
        }}
      ],
      cities: [],
      temp_places: [],
      places: [],
      selectedPlace: null,
      view_selector: 'list',
      options: [
        { item: 'list', name: 'List View' },
        { item: 'map', name: 'Map View' }
      ],
      map_checked: false,
      // myStore: 'text'
    }
  },
  created: function() {

  },
  mounted: function() {
    setTimeout( () => {
      this.loadCurrentLocation()
    }, 100);
    eventBus.$on('updatedStore', (new_store) => {
      this.store = new_store
      this.setStore(new_store);
    });
  },
  computed: {
    google: gmapApi,
    myStore() {
      return this.$store.state.myStore
    }
  },
  methods: {
    desktopDropdownToggle(item_label){
      this.$emit('closeDropdown', item_label)
    },
    loadCurrentLocation(){
      // console.log("myStore", this.$store.state.myStore)
      var cur_loc = this.$store.state.myStore
      if(cur_loc){
        this.center =  { lat: cur_loc.address.coordinates.latitude, lng: cur_loc.address.coordinates.longitude }
        this.map_zoom = 7
        this.markers = [
          {position: this.center}
        ]
        this.selectedPlace = cur_loc
        this.cur_step = "step_place_detail"
      }
    },
    selPlace(place) {
      this.currentPlace = place;
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.map_zoom = 7
      });
    },
    getCurrentLocation() {
      var self = this
      axios.get('https://ipinfo.io/?token=762408ef747fbe',config)
        .then(function (response) {
          var geo = response.data.loc.split(',');
          var lat = geo[0];
          var long = geo[1];
          var userLocation = response.data
          var sel_city = userLocation.city
          var sel_location = userLocation.region
          self.center = {lat: parseFloat(lat), lng: parseFloat(long)}
          self.selCity({city: sel_city, region: sel_location})
        })
    },
    updateCenter(location) {
      this.center = {
        lat: location.lat(),
        lng: location.lng(),
      }
    },
    updatePlace(place) {
      var sel_city = ""
      var sel_location = ""
      var userLocation = {}
      if (place) {
        userLocation.lat = place.geometry.location.lat()
        userLocation.lon = place.geometry.location.lng()
        for (var i=0; i<place.address_components.length; i++) {
            for (var b=0; b<place.address_components[i].types.length;b++) {
            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
              if (place.address_components[i].types[b] == "locality") {
                  //this is the object you are looking for
                  sel_city= place.address_components[i].long_name;
              }
            }
            for (var c=0; c<place.address_components[i].types.length;c++) {
              if (place.address_components[i].types[c] == "administrative_area_level_1") {
                  //this is the object you are looking for
                  sel_location= place.address_components[i].long_name;
              }
            }
        }
      }
      self.center = {lat: parseFloat(userLocation.lat), lng: parseFloat(userLocation.lon)}
      // console.log(sel_city+ ',' + sel_location)
      // this.updateCenter(place.geometry.location); // test zip 03079
      this.selCity({city: sel_city, region: sel_location})
    },
    selCountry(region){
      // let vm = this;
      axios.get(`${BASE_URL}/api/get-regions/`+region, config)
        .then(function (response) {
          console.log("response",response)
          // var cities = response.data
          // if(cities.length > 0) {
          //   var new_makers = []
          //   for(let k of cities) {
          //     // console.log({k})
          //     new_makers.push({
          //       position: {
          //         lat: parseFloat(k.latitude), lng: parseFloat(k.longitude)
          //       }
          //     })
          //   }
          //   // console.log(new_makers)
          //   vm.center = new_makers[0].position
          //   vm.markers = new_makers
          //   vm.cities = cities
          //   vm.sel_country = region.country_code == 'US' ? "United States" : region.country_code
          //   vm.sel_state = region.region
          //   vm.cur_step = "step_city"
          // }
        })
    },
    selRegion(region){
      let vm = this;
      axios.get(`${BASE_URL}/api/get-cities/`+region.region_code, config)
        .then(function (response) {
          var cities = response.data
          if(cities.length > 0) {
            if(cities.length == 1){
              console.log(cities);
              vm.selCity(cities[0]);
            } else {
              var new_makers = []
              for(let k of cities) {
                // console.log({k})
                new_makers.push({
                  position: {
                    lat: parseFloat(k.latitude), lng: parseFloat(k.longitude)
                  }
                })
              }
              // console.log(new_makers)
              vm.center = new_makers[0].position
              vm.markers = new_makers
              vm.cities = cities
              vm.sel_country = region.country_code == 'US' ? "United States" : region.country_code
              vm.sel_state = region.region
              vm.cur_step = "step_city"
            }

          }
        })
    },
    selCity(city){
      let vm = this;
      console.log({city})
      console.log(city.city + ", " + city.region)
      var bodyFormData = new FormData();
      bodyFormData.append("location-search", city.city + ", " + city.region);
      axios.post(`${BASE_URL}/api/geolocate`, bodyFormData)
        .then(function (response) {
          var res_places = response.data
          // console.log({res_places})
          if(res_places.results !== 0) {
            var new_makers = []
            for(let k of res_places['nearby-locations']) {
              // console.log({k})
              new_makers.push({
                position: {
                  lat: parseFloat(k.address.coordinates.latitude), lng: parseFloat(k.address.coordinates.longitude)
                }
              })
            }
            vm.center = new_makers[0].position
            vm.markers = new_makers
            vm.places = res_places['nearby-locations']
            vm.cur_step = "step_place"
          }else{
            vm.center = { lat: 26.40, lng: -80.08 }
            vm.markers = []
            vm.places = []
            vm.cur_step = "step_place"
          }
        })

    },
    showDetail(place) {
      this.selectedPlace = place
      this.cur_step = "step_place_detail"
    },
    gotoBack(step) {
      if(step === ''){
        this.center = { lat: 26.40, lng: -80.08 }
        this.map_zoom = 6
        this.markers = [
          {position: {
            lat: 26.40,
            lng: -80.0852433
          }}
        ]
        var cur_loc = this.$store.state.myStore
        if(cur_loc){
          this.center =  { lat: cur_loc.address.coordinates.latitude, lng: cur_loc.address.coordinates.longitude }
          this.markers = [
            {position: this.center}
          ]
          this.map_zoom = 7
          this.selectedPlace = cur_loc
        }
        this.cur_step = "step_state"
      }else if(step === 'place'){
        if(this.places.length > 0){
          this.cur_step = 'step_place'
        }else{
          this.gotoBack('')
        }
      }
    },
    sprintf(str) {
      // if(str.length.length > 3) {
      //   return str
      // }else if(str.length.length > 2){
      //   return "0"+str
      // }else if(str.length.length > 1){
      //   return "00"+str
      // }else if(str.length.length > 0){
      //   return "000"+str
      // }
      return str
    },
    formatDay(day){
      return day.substring(0,3)
    },
    convertTime(strTime){
      //  08:00
      let time_h = parseInt(strTime.substring(0,2))
      if(time_h > 12) {
        time_h = time_h - 12
        if(time_h > 9) {
          return time_h + 'pm'
        }else{
          return time_h + 'pm'
        }
      }else{
        if(time_h > 9) {
          return time_h + 'am'
        }else{
          return time_h + 'am'
        }
      }

    },
    formatHour(hours){
      if(hours['openIntervals']){
        var tx = hours['openIntervals'][0]
        return this.convertTime(tx.start) + ' - ' + this.convertTime(tx.end)
      }else if(hours['isClosed']){
        return 'Closed'
      }else{
        return ''
      }

    },
    showHours(data) {
      var html = ''
      for (const [key, value] of Object.entries(data)) {
        // console.log(key, value);
        if(key !== 'holidayHours'){
          html += '<div class="d-flex flex-row md-b2">'
          html += '<span class="lbl-info t-bold w65 t-cap">'+this.formatDay(key)+'</span><span class="lbl-info">'+this.formatHour(value)+'</span>'
          html += '</div>'
        }
      }
      return html
    },
    gotoLink(url) {
      if(url !== '') location.href = url
    },
    goToNewTabLink(url){
      if(url !== '') window.open(url,'_blank');
    },
    setStore(store_id){
      if(store_id === '') {
        this.$store.commit("setStore", null);
      }else{
        const cur_place = this.places.find( k => k['location-id'] === store_id)
        this.$store.commit("setStore", cur_place);
      }
    },
    isMyStore(store_id){
      if(this.myStore && this.myStore['location-id'] === store_id) {
        return true
      }else {
        return false
      }
    },
  }
};
//@TODO - Add v-model with data code to control the b-tabs: https://bootstrap-vue.org/docs/components/tabs#advanced-examples
</script>

<style scoped>
</style>
