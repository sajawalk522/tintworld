<template>
  <!-- Nav -->
  <b-navbar class="justify-content-md-start" type="dark" variant="dark">
    <b-navbar-toggle class="border-0" target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <!-- Select Vehicle -->
        <b-nav-item-dropdown text="Select Vehicle" class="s-mobile-vehicle" ref="menuMobileVehicle">
          <template slot="button-content">
            <div class="d-flex flex-row flex-1">
              <div class="w50 d-flex justify-content-center align-items-center">
                <img
                  src="./../assets/img/vehicle-icon.png"
                  alt="vehicle-icon"
                />
              </div>
              <div class="flex-1">
                <div class="lbl-area" v-html="showCurrentVehicle()"></div>
              </div>
              <div class="w25 d-flex justify-content-center align-items-center">
                <i class="fa fa-angle-down" aria-hidden="true"></i
                ><i class="fa fa-angle-up" aria-hidden="true"></i>
              </div>
            </div>
          </template>

          <vehicle-nav @closeDropdown="mobileDropdownToggle($event)" />
        </b-nav-item-dropdown>

        <!-- Select Store -->
        <b-nav-item-dropdown text="Select Store" class="s-mobile-store" ref="menuMobileStore">
          <template slot="button-content">
            <div class="d-flex flex-row flex-1">
              <div class="w50 d-flex justify-content-center align-items-center">
                <img src="./../assets/img/store-icon.png" alt="store-icon" />
              </div>
              <div class="flex-1">
                <div class="lbl-area" v-html="showCurrentStore()"></div>
              </div>
              <div class="w25 d-flex justify-content-center align-items-center">
                <i class="fa fa-angle-down" aria-hidden="true"></i
                ><i class="fa fa-angle-up" aria-hidden="true"></i>
              </div>
            </div>
          </template>

          <store-nav @closeDropdown="mobileDropdownToggle($event)" />
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <!-- / -->
</template>

<script>
import {eventBus} from "./../main"
import VehicleNav from "./VehicleNav";
import StoreNav from "./StoreNav";
export default {
  components: {
    "vehicle-nav": VehicleNav,
    "store-nav": StoreNav,
  },
  data: () => {
    return {
      servicesBanner: {
        title: "Take 20% off",
        subTitle: "Nano Ceramic Coating",
        copy:
          "Tint World residential nano ceramic coating special ends soon. Take advantage of this amazing offer and book now!",
        link: "#",
        linkTitle: "Book Now",
        img: "https://www.tintworld.com/wp-content/uploads/date-icon.png",
      },
      productsBanner: {
        title: "Fall Sale!",
        subTitle: "Take 15% Off!",
        copy:
          "Take 15% off your next online order when you spend $100 or more. Don not miss out on this deal. Limited time only. Enter the code below during checkout",
        link: "#",
        linkTitle: "Use Code: Fall16",
        img: "https://www.tintworld.com/wp-content/uploads/date-icon.png",
      },
      vehicle: null
    };
  },
  mounted(){
    eventBus.$on('updatedVehicleGarage', (new_vehicle) => {
      // console.log("updatedVehicleGarage", new_vehicle)
      this.vehicle = new_vehicle
      function convertToSlug(Text)
      {
        return Text
                .toLowerCase()
                .replace(/ /g,'-')
                .replace(/[^\w-]+/g,'')
                ;
      }
      var future = new Date();
      future.setDate(future.getDate()+30);
      var encYear = new_vehicle.year;
      var encMake = convertToSlug(new_vehicle.make);
      var encModel = convertToSlug(new_vehicle.model);
      var encString = encYear+'-'+encMake+'-'+encModel;
      document.cookie="primaryVehicle="+encString+";expires="+future+"; path=/";
      this.showCurrentVehicle()
    })
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
    products() {
      return this.$store.state.products;
    },
    deals() {
      return this.$store.state.deals;
    },
    abouts() {
      return this.$store.state.abouts;
    },
    myStore() {
      return this.$store.state.myStore
    }
  },
  methods: {
    mobileDropdownToggle(item_label){
      switch(item_label) {
        case 'vehicle':
          this.$refs.menuMobileVehicle.$el.firstChild.click();    
          break;
        case 'store':
          this.$refs.menuMobileStore.$el.firstChild.click();    
          break;
      }
      // this.$refs.menuProduct.$el.firstChild.click();
    },
    showCurrentVehicle() {
      var html = '<span>Select Vehicle</span>'
      if(this.vehicle) {
        let custom_lbl = this.vehicle.year+' '+this.vehicle.make
        html = '<div class="vehicle-info"><span>'+custom_lbl+'</span>'
        html += '<span>'+this.vehicle.model+'</span></div>'
      }
      return html
    },
    showCurrentStore() {
      var html = '<span>Select Store</span>'
      if(this.myStore) {
        let custom_lbl = this.myStore.address.city.toLowerCase()+', '+this.myStore.address.region.toUpperCase()
        html = '<div class="store-info"><span>'+custom_lbl+'</span>'
        html += '<span class="c-green">Open Until '+this.myStore.currentHours+'</span></div>'
      }
      return html
    },
  }
};
</script>
