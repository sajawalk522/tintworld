<template>
  <!-- Nav -->
  <b-navbar
    class="justify-content-md-start desktop-menu"
    toggleable="lg"
    type="dark"
    variant="dark"
  >
    <b-navbar-toggle class="border-0" target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <!-- Services -->
        <b-nav-item-dropdown text="Services" ref="menuService" lazy>
          <template slot="button-content">
            Services <i class="fa fa-angle-down" aria-hidden="true"></i
            ><i class="fa fa-angle-up" aria-hidden="true"></i>
          </template>

          <b-row class="nav-container">
            <b-col class="dropdown-ctn">
              <div>
                <b-card no-body>
                  <b-tabs pills card vertical class="tab-col">
                    <b-tab
                      v-for="category in categories"
                      :title="category.abbrTitle"
                      :key="category.id"
                    >
                      <template v-slot:title>
                        <div class="d-flex flex-row w100 align-items-center level2-item c-pointer border-bottom">
                          <div v-if="category.menuThumb" class="w75">
                            <img :src="category.menuThumb" alt="" />
                          </div>
                          <div class="flex-1 level2-label" v-html="category.abbrTitle"></div>
                          <div class="w25 text-right">
                            <i
                              class="fa fa-angle-right menu-arrow"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                        <!-- {{ category.title }} <i class="fa fa-chevron-right float-right"></i> -->
                      </template>
                      <b-card-text v-bind:class="category.alias">
                        <b-row class="d-flex">
                          <b-col class="middle-content-ctn">
                            <b-row>
                              <div class="category-title">
                                <!-- <span class="sub-title">{{ category.title }}</span> -->
                                <span v-html="getSubTitle(category.title)"></span>
                                <a :href="category.url">View All <i class="fa fa-arrow-right"></i></a>
                              </div>
                            </b-row>
                            <div class="row">
                              <div v-for="item in category.children" :key="item.id" class="menu-item-wrapper mb-3 pr-2">
                                <div class="menu-item-ctn mb-2 mt-2">
                                <a :href="item.url" class="menu-item">
                                <img class="img-fluid menu-thumbnail" :src="item.menuThumb ? item.menuThumb : 'https://via.placeholder.com/200x100'"/>
                                <span class="menu-item-description pl-3 mr-1">{{ item.title }}</span>
                                </a>
                                </div>
                              </div>
                            </div>
                          </b-col>
                          <b-col v-if="category.carouselToggle" class="w400 banner" v-bind:class="category.alias">
                            <div class="banner-ad" v-html="category.carouselTemplate"></div>
                          </b-col>
                        </b-row>
                      </b-card-text>
                    </b-tab>
                    <template #tabs-end>
                      <div class="d-flex flex-row w100 align-items-center level2-item c-pointer h64">
                        <div class="flex-1 level2-label text-center view-all">
                          <a class="view-all" @click="gotoLink('https://www.tintworld.com/services/')">View All Services</a>
                        </div>
                      </div>
                    </template>
                  </b-tabs>
                </b-card>
              </div>
              <div class="close-btn c-pointer" @click="desktopDropdownToggle('service')">
                <close-img></close-img>
              </div>
            </b-col>

            <!--<div class="hidden-xs w400">
              <div class="banner-ad">
                <div>
                  <h3>
                    {{ servicesBanner.title }}
                    <span>{{ servicesBanner.subTitle }}</span>
                  </h3>
                  <p>{{ servicesBanner.copy }}</p>
                  <a :href="servicesBanner.link"
                    ><img :src="servicesBanner.img" />
                    {{ servicesBanner.linkTitle }}</a
                  >
                </div>
              </div>
            </div>-->

          </b-row>
        </b-nav-item-dropdown>

        <!-- Products -->
        <b-nav-item-dropdown text="Products" ref="menuProduct" lazy>
          <template slot="button-content">
            Products <i class="fa fa-angle-down" aria-hidden="true"></i
            ><i class="fa fa-angle-up" aria-hidden="true"></i>
          </template>

          <b-row class="nav-container">
            <b-col class="dropdown-ctn">
              <div>
                <b-card no-body>
                  <b-tabs pills card vertical>
                    <b-tab
                      :title="product.title"
                      v-for="product in products"
                      :key="product.id"
                    >
                      <template v-slot:title>
                        <div
                          class="d-flex flex-row w100 align-items-center level2-item c-pointer border-bottom"
                        >
                          <div v-if="product.menuThumb" class="w75">
                            <img :src="product.menuThumb" alt="" />
                          </div>
                          <div class="flex-1 level2-label" v-html="product.title"></div>
                          <div class="w25 text-right">
                            <i
                              class="fa fa-angle-right menu-arrow"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                        <!-- {{ product.title }} <i class="fa fa-chevron-right float-right"></i> -->
                      </template>
                      <b-card-text>
                        <b-row class="d-flex">
                          <b-col class="middle-content-ctn">
                            <b-row>
                              <div class="category-title">
                                <span v-html="getSubTitle(product.title)"></span>
                                <a :href="product.url"
                                >View All <i class="fa fa-arrow-right"></i
                                ></a>
                              </div>
                            </b-row>
                              <div class="row">
                                <div v-for="(item,index) in product.children" :key="index" class="menu-item-wrapper mb-3 pr-2">
                                  <div class="menu-item-ctn mb-2 mt-2">
                                    <a :href="item.url" class="menu-item">
                                      <img class="img-fluid menu-thumbnail" :src="item.menuThumb ? item.menuThumb : 'https://via.placeholder.com/200x100'"/>
                                      <span class="menu-item-description pl-3 mr-1" v-html="item.title">{{ item.title }}</span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                          </b-col>
                          <b-col v-if="product.categoryTitle" class="w400 banner" v-bind:class="product.alias">
                            <div class="banner-ad" v-html="product.carouselTemplate"></div>
                          </b-col>
                        </b-row>
                      </b-card-text>
                    </b-tab>
                  </b-tabs>
                </b-card>
              </div>
              <div class="close-btn c-pointer" @click="desktopDropdownToggle('product')">
                <close-img></close-img>
              </div>
            </b-col>

          </b-row>
        </b-nav-item-dropdown>

        <!-- Deals -->
        <b-nav-item-dropdown text="Deals" ref="menuDeal" lazy>
          <template slot="button-content">
            Deals <i class="fa fa-angle-down" aria-hidden="true"></i
            ><i class="fa fa-angle-up" aria-hidden="true"></i>
          </template>

          <b-row class="nav-container deals-ctn">
            <b-col class="dropdown-ctn">
              <div>
                <b-card no-body>
                  <b-tabs pills card vertical>
                    <b-tab
                      :title="deal.title"
                      v-for="(deal, index) in deals"
                      :key="index"
                      v-bind:class="deal.alias"
                    >
                      <!-- Start Loop -->
                        <template v-slot:title>
                            <div
                                    class="d-flex flex-row w100 align-items-center level2-item c-pointer border-bottom"
                            >
                              <div v-if="deal.menuThumb" class="w75 tab-icon">
                                <img :src="deal.menuThumb" alt="" />
                              </div>
                              <div class="flex-1 level2-label" v-html="deal.title"></div>
                              <div class="w25 text-right">
                                <i
                                        class="fa fa-angle-right menu-arrow"
                                        aria-hidden="true"
                                ></i>
                              </div>
                            </div>
                          </template>
                          <b-card-text>
                            <b-row class="d-flex">
                              <b-col class="middle-content-ctn" v-html="deal.html"></b-col>
                              <b-col v-if="deal.carouselToggle" class="w400 banner" v-bind:class="deal.alias">
                                <div class="banner-ad" v-html="deal.carouselTemplate"></div>
                              </b-col>
                            </b-row>
                          </b-card-text>
                    <!--End of Loop-->
                    </b-tab>
                  </b-tabs>
                </b-card>
              </div>
              <div class="close-btn c-pointer" @click="desktopDropdownToggle('deal')">
                <close-img></close-img>
              </div>
            </b-col>
            <!-- <div class="hidden-xs w400">
              <div class="banner-ad">
                <div v-html="">
                </div>
              </div>
            </div> -->

          </b-row>
        </b-nav-item-dropdown>

        <!-- About -->
        <b-nav-item-dropdown text="About" ref="menuAbout" lazy>
          <template slot="button-content">
            About <i class="fa fa-angle-down" aria-hidden="true"></i><i class="fa fa-angle-up" aria-hidden="true"></i>
          </template>

          <b-row class="nav-container about-ctn">
            <b-col class="dropdown-ctn">
              <div>
                <b-card no-body>
                  <b-tabs pills card vertical>
                    <b-tab
                      :title="about.title"
                      v-for="(about, index) in abouts"
                      :key="index"
                      v-bind:class="about.alias"
                    >
                      <template v-slot:title>
                        <div
                          class="d-flex flex-row w100 align-items-center level2-item c-pointer border-bottom"
                        >
                          <div v-if="about.menuThumb" class="w75">
                            <img :src="about.menuThumb" alt="" />
                          </div>
                          <div class="flex-1 level2-label" v-html="about.title"></div>
                          <div class="w25 text-right">
                            <i
                              class="fa fa-angle-right menu-arrow"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                      </template>
                      <b-card-text>
                        <b-row class="d-flex">
                          <b-col class="middle-content-ctn" v-bind:class="about.alias" v-html="about.html"></b-col>
                          <b-col v-if="about.carouselToggle" class="w400 banner" v-bind:class="about.alias">
                            <div class="banner-ad" v-html="about.carouselTemplate"></div>
                          </b-col>
                        </b-row>
                      </b-card-text>
                    </b-tab>
                  </b-tabs>
                </b-card>
              </div>
              <div class="close-btn c-pointer" @click="desktopDropdownToggle('about')">
                <close-img></close-img>
              </div>
            </b-col>
          </b-row>
        </b-nav-item-dropdown>

        <!-- Franchise -->
        <li class="nav-item b-nav-dropdown dropdown" id="__BVID__22">
          <div class="nav-link" @click="gotoLink('https://www.tintworld.com/franchise-opportunities')">
            FRANCHISE <i class="fa fa-angle-right" aria-hidden="true"></i>
          </div>
        </li>

        <!-- Select Vehicle -->
        <b-nav-item-dropdown text="Select Vehicle" class="s-vehicle" ref="menuVehicle" lazy>
          <template slot="button-content">
            <img src="./../assets/img/vehicle-icon.png" alt="vehicle-icon" />
            <div class="lbl-area" v-html="showCurrentVehicle()"></div>
            <i class="fa fa-angle-down" aria-hidden="true"></i
            ><i class="fa fa-angle-up" aria-hidden="true"></i>
          </template>
          <vehicle-nav @closeDropdown="desktopDropdownToggle($event)" />
        </b-nav-item-dropdown>

        <!-- Select Store -->
        <b-nav-item-dropdown text="Select Store" class="s-store" ref="menuStore" lazy>
          <template slot="button-content">
            <img src="./../assets/img/store-icon.png" alt="store-icon" />
            <div class="lbl-area" v-html="showCurrentStore()"></div>
            <i class="fa fa-angle-down" aria-hidden="true"></i
            ><i class="fa fa-angle-up" aria-hidden="true"></i>
          </template>
          <store-nav @closeDropdown="desktopDropdownToggle($event)"/>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <!-- / -->
</template>

<script>
// import { mapMutations } from 'vuex'
import {eventBus} from "./../main"
import VehicleNav from "./VehicleNav";
import StoreNav from "./StoreNav";
import CloseImg from "./CloseImg";
export default {
  components: {
    "vehicle-nav": VehicleNav,
    "store-nav": StoreNav,
    CloseImg
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
      expandedNav: false,
      vehicle: null,
      // myStore: null
    };
  },
  mounted(){
    eventBus.$on('updatedVehicleGarage', (new_vehicle) => {
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
      //@TODO - Need to set the path of the cookie below
      document.cookie="primaryVehicle="+encString+";expires="+future+"; path=/";
      this.vehicle = new_vehicle
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
    convertStringToHtml(str) {
      var encodedStr = str.replace(/[\u00A0-\u9999<>]/gim, function(i) {
        return '&#'+i.charCodeAt(0)+';';
      });
      return encodedStr
    },
    gotoLink(link) {
      location.href = link;
    },
    desktopDropdownToggle(item_label){
      switch(item_label) {
        case 'service':
          this.$refs.menuService.$el.firstChild.click();    
          break;
        case 'product':
          this.$refs.menuProduct.$el.firstChild.click();    
          break;
        case 'deal':
          this.$refs.menuDeal.$el.firstChild.click();    
          break;
        case 'about':
          this.$refs.menuAbout.$el.firstChild.click();    
          break;
        case 'franchise':
          this.$refs.menuFranchise.$el.firstChild.click();    
          break;
        case 'vehicle':
          this.$refs.menuVehicle.$el.firstChild.click();    
          break;
        case 'store':
          this.$refs.menuStore.$el.firstChild.click();    
          break;
      }
      // this.$refs.menuProduct.$el.firstChild.click();
    },
    getSubTitle(sub_title) {
      var arr = sub_title.split(" ")
      var title_head = arr[0]
      var title_sub = arr.slice(1).join(" ")
      return '<span class="sub-title sub-title-short">'+title_head+'</span><span class="sub-title"> '+title_sub+'</span>';
    },
    desktopMenuOpen(menu_label) {
      this.$store.commit("desktopMenuOpen", menu_label);
    },
    showCurrentVehicle() {
      var html = '<span>Select Vehicle</span>'
      if(this.vehicle) {
        let custom_lbl = this.vehicle.year+' '+this.vehicle.make
        html = '<div class="vehicle-info"><span class="text-uppercase year-make">'+custom_lbl+'</span>'
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

<style lang="scss" scoped>
.menu-level3-item{
  width: 33.333%;
  margin: 1.25rem 0;
  .lbl{
    color: #0a92f1;
    font-size: 14px;
  }  
  @media screen and (max-width: 1600px){
    width: 50%;
  }
  @media screen and (max-width: 1450px){
    width: 100%;
  }
}
</style>