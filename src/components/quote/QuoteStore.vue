<template>
  <div class="appt-store">
    <div class="cur-my-store" v-if="myStore">
      <div class="store-row c-pointer" :class="{active: checkActiveStore(myStore['location-id']) }"
        @click="selLocation(myStore)">
        <div class="radio-area chk-radio">
          <b-form-group label="">
            <b-form-radio v-model="store_selector" name="place_radio" :value="myStore['location-id']"></b-form-radio>
          </b-form-group>
        </div>
        <div class="store-location1 appt-cap3 desktop">
          Tint World&reg;<br>
          {{myStore.address.city}}, {{myStore.address.region}}
        </div>
        <div class="store-location2 appt-cap4">
          <div class="mobile">
            <span class="appt-cap3">Tint World&reg; {{myStore.address.city}}, {{myStore.address.region}} </span><span class="appt-cap4">&nbsp;({{myStore.distance.distanceMiles.toFixed(1)}} mi)</span>
          </div>
          {{myStore.address.street}}, Suite #{{myStore['location-id']}}<br>
          {{myStore.address.city}}, {{myStore.address.region}} {{myStore.address.postalCode}}
        </div>
      </div>
      <div class="split-row appt-cap3">Or</div>
    </div>
    <div class="geolocate-area md-b15">
      <div class="search">
        <gmap-autocomplete
          class="input-auto-complete"
          @place_changed="updatePlace"
          placeholder="Search for a store by City, State, or Zip"
        ></gmap-autocomplete>
        <i aria-hidden="true" class="fa_search fa fa-search"></i>
      </div>
      <div class="btn-location">
        <a class="getLocation c-pointer" @click.stop="getCurrentLocation()">
          <div class="b-loc">
            <img src="./../../assets/geolocation.png" alt="geolocation-icon"/>
            <span>Current Location</span>
          </div>
        </a>
      </div>
    </div>
    <div class="radio-area mobile">
        <b-form-group label="">
          <b-form-radio-group v-model="view_selector" :options="options" class="lbl-radio"
            value-field="item" text-field="name" disabled-field="notEnabled"></b-form-radio-group>
        </b-form-group>
      </div>
    <div class="store-map-area" v-if="view_selector === 'map'">
      <gmap-map :center="center" :zoom="map_zoom" style="width: 100%; height: 300px">
        <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" @click="center = m.position"></gmap-marker>
      </gmap-map>
    </div>
    <div class="store-result-area" v-if="places.length > 0">
      <div class="store-row c-pointer"
        v-for="(place, i) in places" :key="i"
        :class="{active: checkActiveStore(place['location-id'])}"
        @click="selLocation(place)">
        <div class="radio-area chk-radio">
          <b-form-group label="">
            <b-form-radio v-model="store_selector" name="place_radio" :value="place['location-id']"></b-form-radio>
          </b-form-group>
        </div>
        <div class="store-location1 appt-cap3 desktop">
          Tint World&reg;<br>
          {{place.address.city}}, {{place.address.region}}
        </div>
        <div class="store-location2 appt-cap4">
          <div class="mobile">
            <span class="appt-cap3">Tint World&reg; {{place.address.city}}, {{place.address.region}} </span><span class="appt-cap4">&nbsp;({{place.distance.distanceMiles.toFixed(1)}} mi)</span>
          </div>
          {{place.address.street}}, Suite #{{place['location-id']}}<br>
          {{place.address.city}}, {{place.address.region}} {{place.address.postalCode}}
        </div>
      </div>
    </div>
    <div class="store-no-result text-italic text-center" v-else>
      {{no_store_selected()}}
    </div>
  </div>
</template>
<script>
  import {eventBus} from "./../../main"
  import axios from 'axios'
  import {gmapApi} from 'vue2-google-maps'
  import { BASE_URL } from '../../utils/constants'

  export default {
    data:() =>{
      return {
        store_selector: '',
        center: { lat: 20.40, lng: -80.08 },
        map_zoom: 4,
        markers: [
          // {position: {
          //   lat: 26.409868200000002,
          //   lng: -80.0852433
          // }}
        ],
        places: [],
        view_selector: 'map',
        options: [
          { item: 'map', name: 'Map View' },
          { item: 'list', name: 'List View' },
        ],
      }
    },
    mounted(){
      if(this.$store.state.quote.store){
        this.selLocation(this.$store.state.quote.store)
      }else if(this.$store.state.myStore) {
        // console.log("my store : ", this.$store.state)
        this.selLocation(this.$store.state.myStore)
        // this.$store.commit("setQuote", {type: 'store',data: this.$store.state.myStore});
      }
    },
    computed: {
      google: gmapApi,
      myStore() {
        if(this.$store.state.quote.store){
          return this.$store.state.quote.store
        }else{
          return this.$store.state.myStore
        }
      },
      quote() {
        return this.$store.state.quote
      },
    },
    methods: {
      no_store_selected(){
        let lbl = 'You currently have no store selected.'
        if(this.$store.state.quote.store){
          lbl = 'Search for a different store above.'
        }else{
          lbl = 'Search for a different store above.'
        }
        return lbl
      },
      updatePlace(place) {
        var sel_city = ""
        var sel_location = ""
        var userLocation = {}
        console.log({place})
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
      getCurrentLocation() {
        var self = this
        axios.get('https://ipinfo.io/?token=762408ef747fbe')
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
              vm.markers = new_makers.slice(0,5)
              vm.map_zoom = 7
              var new_places = res_places['nearby-locations']
              if(vm.myStore){
                new_places = new_places.filter( p => p['location-id'] !== vm.myStore['location-id'] )
              }
              vm.places = new_places.slice(0,5)
            }else{
              vm.center = { lat: 20.40, lng: -80.08 }
              vm.markers = []
              vm.places = []
              vm.map_zoom = 4
            }
          })

      },
      selLocation(place) {
        var new_makers = []
        new_makers.push({
          position: {
            lat: parseFloat(place.address.coordinates.latitude), lng: parseFloat(place.address.coordinates.longitude)
          }
        })
        this.store_selector = place['location-id']
        this.center = new_makers[0].position
        this.map_zoom = 7
        this.markers = new_makers
        eventBus.$emit('isChangedQuoteValidation', true)
        this.$store.commit("setQuote", {type: 'store',data: place});
      },
      checkActiveStore(location_id) {
        console.log(this.quote)
        if(this.quote.store) {
          if(this.store_selector === location_id){ return true } else { return false }
        }else{
          return false
        }
      },
    }
  }
</script>
