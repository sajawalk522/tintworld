<template>
  <b-row class="nav-container vehicle-container">
    <b-col>
      <b-card no-body>
        <div class="bg-white">
          <div class="dropdown-ctn d-flex flex-row">
            <div class="close-btn c-pointer" @click="desktopDropdownToggle('vehicle')">
              <close-img></close-img>
            </div>
          <div class="flex-auto v-selector">
            <div
              class="tab-btn"
              v-for="(vehicle, index) in vehicles"
              :key="index"
              @click="selVehicle(vehicle.tabType)"
              :class="{active: vehicle.active }"
            >{{vehicle.title}}</div>       
          </div>
          <div class="w300 d-flex align-items-center search-area">
            <b-form-input
              placeholder="Search Year"
              class="d-none d-md-block"
              v-model="searchYear"
              v-if="vehicleSelector && step == 0"
            ></b-form-input>
            <b-form-input
              placeholder="Search Make"
              class="d-none d-md-block"
              v-model="searchMake"
              v-if="vehicleSelector && step == 1"
            ></b-form-input>
            <b-form-input
              placeholder="Search Model"
              class="d-none d-md-block"
              v-model="searchModel"
              v-if="vehicleSelector && step == 2"
            ></b-form-input>
            <i v-if="vehicleSelector && (step == 0 || step == 1 || step == 2)" aria-hidden="true" class="d-none d-md-block fa_search fa fa-search"></i>
            <div v-if="!vehicleSelector" class="w100 d-flex justify-content-end">
              <div 
                @click.stop="addNewVehicle"
                class="new-vehicle-btn c-pointer transition">
                <i class="fa fa-plus" aria-hidden="true"></i>Add New Vehicle
              </div>
            </div>
          </div>
        </div></div>
        <div 
          v-if="vehicleSelector && (step == 0 || step == 1 || step == 2)"
          class="d-flex align-items-center search-area mobile d-block d-xl-none d-lg-none-custom d-md-none">
          <b-form-input
            placeholder="Search Year"
            v-model="searchYear"
            v-if="vehicleSelector && step == 0"
          ></b-form-input>
          <b-form-input
            placeholder="Search Make"
            v-model="searchMake"
            v-if="vehicleSelector && step == 1"
          ></b-form-input>
          <b-form-input
            placeholder="Search Model"
            v-model="searchModel"
            v-if="vehicleSelector && step == 2"
          ></b-form-input>
          <i v-if="vehicleSelector && (step == 0 || step == 1 || step == 2)" aria-hidden="true" class="fa_search fa fa-search mobile" ></i>
        </div>
        <div v-if="vehicleSelector" class="dropdown-ctn">
          <div class="pd-15 bk-grey breadcrumb-area ">
            <div class="bcb-area">
              <span 
                class="r-y c-pointer" 
                :class="{selected: step > 0, active: step == 0, }" 
                @click="selYear()">Year</span>
              <span 
                class="r-line"
                :class="{ active: step >= 1, deactive: step < 1 }" 
                >/</span>
              <span 
                class="r-y c-pointer" 
                :class="{selected: step > 1, active: step == 1, deactive: step < 1 }" 
                @click="getMake(selectedYear)">Make</span>
              <span 
                class="r-line"
                :class="{ active: step >= 2, deactive: step < 2 }" 
                >/</span>
              <span 
                class="r-y c-pointer" 
                :class="{selected: step > 2, active: step == 2, deactive: step < 2 }" 
                @click="selMake(selectedMake)">Model</span>
            </div>
            <div class="w300 status-area" @click.stop="goto_vehicle" v-html="status_area()"></div>
          </div>
          <div class="d-flex pd-15 bk-grey items-area">
            <div class="flex-1 d-flex flex-wrap " v-if="step == 0">
              <div class="item r-year transition c-pointer" v-for="y in filteredYears" :key="y" @click.stop="getMake(y)">
                {{y}}
              </div>
            </div>
            <div class="flex-1 r-make d-flex flex-wrap " v-if="step == 1">
              <div class="item transition c-pointer" v-for="mk in filteredMakes" :key="mk.make" @click.stop="selMake(mk.make)">
                {{mk.make}}
              </div>
            </div>
            <div class="flex-1 r-make d-flex flex-wrap " v-if="step == 2">
              <div class="item transition c-pointer" v-for="md in carModels" :key="md" @click.stop="selModel(md)">
                {{md}}
              </div>
            </div>
          </div>
        </div>
        <div v-else class="dropdown-ctn">
           <div class="d-flex flex-wrap pd-15 bk-grey vehicle-area">
              <div class="vehicle transition" v-for="(s_vehicle, index) in myVehicle" :key="index">
                <div @click.stop="removeVehicle(index)" class="close-btn c-pointer">
                  <close-img></close-img>
                </div>
                <div 
                  class="tai-area" 
                  @click.stop="setPrimary(index)"
                  :class="{primary: s_vehicle.type == 'primary'}">
                  {{s_vehicle.type === 'primary' ? 'Primary Vehicle' : 'Make Primary Vehicle'}}
                </div>
                <div class="year-made-label d-flex flex-column">
                  <div>{{s_vehicle.year}} {{s_vehicle.make}}</div>
                  <div class="model-label">{{s_vehicle.model}}</div>
                </div>
                <div class="shop-area">
                  <a class="shop-btn" href="/store/">
                    Shop Now
                    <i aria-hidden="true" class="fa fa-angle-right"></i>
                  </a>
                  <div class="actions">
                    <div 
                      class="action-btn c-pointer"
                      @click.stop="editVehicle(index)"
                    ><i class="fa fa-edit" aria-hidden="true"></i> Edit Vehicle</div>
                    <div class="action-btn c-pointer" style="display:none;"><i class="fa fa-download" aria-hidden="true"></i> Save To My Account</div>
                    <div 
                      class="action-btn c-pointer"
                      @click.stop="removeVehicle(index)"
                    ><i class="fa fa-trash" aria-hidden="true"></i> Remove</div>
                  </div>
                </div>
              </div>
              <div class="vehicle transition new">
                <div 
                  @click.stop="addNewVehicle"
                  class="new-btn d-flex flex-column align-items-center justify-contents-center c-pointer transition">
                  <div><i class="fa fa-plus" aria-hidden="true"></i></div>
                  <div>Add New Vehicle</div>
                </div>
              </div>
            </div>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import {eventBus} from "./../main"
import CloseImg from "./CloseImg";

export default {
  components: {
    CloseImg
  },
  data: () => {
    return {
      vehicles: [],
      myVehicle: [],
      vehicleSelector: true,
      step: 0,
      searchYear: '',
      searchMake: '',
      searchModel: '',
      selectedYear: '',
      selectedMake: '',
      isEditVehicle: false,
      editVehicleIndex: -1
    }
  },
  created: function() {
    var json_vehicles = localStorage.getItem('my_vehicles')
    this.vehicles = []
    if(json_vehicles) {
      this.vehicles = JSON.parse(json_vehicles)
      var temp_vehicle = this.vehicles.find(v => v.tabType === 'mine')
      if(temp_vehicle){
        this.myVehicle = temp_vehicle.children
        this.vehicles.forEach( v => {
          if( v.tabType === 'mine') {
            if(v.active) {this.vehicleSelector = false;}
            v = temp_vehicle
          }
        })
        setTimeout(()=> {
          eventBus.$emit('updatedVehicleGarage', temp_vehicle.children.find(c => c.type === 'primary'))
        }, 100)
      }
    }else{
      this.vehicles = [{
        tabType: 'new',
        title: 'VEHICLE SELECTOR',
        active: true,
      }]
    }
    this.$store.commit("setVehicles", this.vehicles);

    // init 
    // this.selectedYear = ''
    // this.step = 0
    // this.selectedMake = ''
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    eventBus.$on('updatedVehicleGarage', (new_vehicle) => {
      this.vehicles = this.$store.state.myVehicles
      var temp_vehicle = this.vehicles.find(v => v.tabType === 'mine')
      if(temp_vehicle){
        this.myVehicle = temp_vehicle.children
        if(temp_vehicle.active) {this.vehicleSelector = false;}
        // this.vehicleSelector = false
      }
    })
  },
  computed: {
    filteredYears: function () {
      return this.carYears.filter((carYear) => {
        return carYear.toLowerCase().match(this.searchYear.toLowerCase());
      });
    },
    filteredMakes: function () {
      if(this.carMakes.length > 0){
        return this.carMakes.filter((carMake) => {
          return carMake.make.toLowerCase().match(this.searchMake.toLowerCase());
        });
      }else{
        return []
      }
    },
    carModels: function () {
      if(this.carMakes){
        const selModels = this.carMakes.find( m => m.make === this.selectedMake ).models
        return selModels.filter((carModel) => {
          return carModel.toLowerCase().match(this.searchModel.toLowerCase());
        });
      }else
        return []
    },
    carYears: {
      get(){
        return this.$store.state.carYears
      },
      set(data){
        this.$store.emit('setCarYears', data)
      }
    },
    carMakes: {
      get(){
        return this.$store.state.carMakes
      }
    }
  },
  methods: {
    initSelectVihicle(){
      this.vehicleSelector = true
      this.step = 0
      this.selectedYear = ''
      this.selectedMake = ''
    },
    selVehicle(selector) {
      console.log(selector)
      this.vehicles.forEach( v => {
        v.active = false
      })
      var selIndex = this.vehicles.findIndex( v => v.tabType === selector)
      this.vehicles[selIndex].active = true
      if(selector === 'new') {
        this.initSelectVihicle()
      }else{
        this.vehicleSelector = false 
        this.myVehicle = this.vehicles[selIndex].children
      }
    },
    desktopDropdownToggle(item_label){
      this.$emit('closeDropdown', item_label)
    },
    selYear() {
      this.step = 0
      this.selectedYear = ''
      this.selectedMake = ''
    },
    getMake(year) {
      if(year == '') return
      this.selectedYear = year
      this.$store.dispatch('loadCarMakes', year)
      this.step = 1
      this.selectedMake = ''
    },
    selMake(make) {
      if(make == '') return
      this.step = 2
      this.selectedMake = make
    },
    selModel(model) {
      if(model === '') return
      // completed select vehicle
      var new_vehicle = {
        year: this.selectedYear,
        make: this.selectedMake,
        model: model
      }
      if(this.isEditVehicle){
        var temp_edit_vehicle = this.vehicles.find(v => v.tabType === 'mine')
        temp_edit_vehicle.children.forEach( (c, index) => {
          if(index === this.editVehicleIndex) {
            c.year = this.selectedYear
            c.make = this.selectedMake
            c.model = model
          }
        })
        this.vehicles.forEach( v => {if( v.tabType === 'mine') v = temp_edit_vehicle})
        this.vehicleSelector = false
        eventBus.$emit('updatedVehicleGarage', temp_edit_vehicle.children.find(c => c.type === 'primary'))
        this.$store.commit("setVehicles", this.vehicles);
        this.isEditVehicle = false
        this.editVehicleIndex = -1
      }else{
        var temp_vehicle = this.vehicles.find(v => v.tabType === 'mine')
        console.log("add vehicle :", temp_vehicle)
        if(temp_vehicle) {
          new_vehicle.type = 'secondary'
          this.vehicles.forEach( v => {
            if( v.tabType === 'mine') {
              v.active = true
              v.children.push(new_vehicle)
            }else{
              v.active = false
            }
          })
        }else{
          new_vehicle.type = 'primary'
          this.vehicles.push({
            tabType: 'mine',
            title: 'MY VEHICLES',
            active: true,
            children: [new_vehicle]
          })
          this.vehicles[0].active = false
          eventBus.$emit('updatedVehicleGarage', new_vehicle)
        }
        this.myVehicle = this.vehicles.find( v => v.tabType === 'mine').children
        this.vehicleSelector = false
        this.$store.commit("setVehicles", this.vehicles);
      }
    },
    addNewVehicle(){
      this.vehicles.forEach( v => {if( v.tabType === 'mine') v.active = false})
      if(this.vehicles.find( k => k.tabType === 'new')) {
        this.vehicles[0].active = true
      }else{
        this.vehicles.unshift({
          tabType: 'new',
          title: 'VEHICLE SELECTOR',
          active: true,
        })
      }
      this.initSelectVihicle()
    },
    setPrimary(index){
      var temp_vehicle = this.vehicles.find(v => v.tabType === 'mine')
      temp_vehicle.children.forEach( (c, k) => {
        if(k === index) {
          c.type = 'primary'
        }else{
          c.type = 'secondary'
        }
      })
      this.vehicles.forEach( v => {if( v.tabType === 'mine') v = temp_vehicle})
      this.vehicleSelector = false
      eventBus.$emit('updatedVehicleGarage', temp_vehicle.children.find(c => c.type === 'primary'))
      this.$store.commit("setVehicles", this.vehicles);
    },
    removeVehicle(index){
      var temp_vehicle = this.vehicles.find(v => v.tabType === 'mine')
      var temp_children = temp_vehicle.children.filter( (c, k) => k !== index)
      if(temp_children.length === 0) {
        this.vehicles = [{
          tabType: 'new',
          title: 'VEHICLE SELECTOR',
          active: true,
        }]
        this.$store.commit("setVehicles", this.vehicles);
        eventBus.$emit('updatedVehicleGarage', null)
        this.initSelectVihicle()
      }else{
        let check_primary = temp_children.find( t => t.type === 'primary')
        if(!check_primary){
          temp_children[0].type = 'primary'
        }
        this.vehicles.forEach( v => {if( v.tabType === 'mine') v.children = temp_children})
        this.myVehicle = this.vehicles[0].children
        eventBus.$emit('updatedVehicleGarage', temp_children.find(c => c.type === 'primary'))
        this.vehicleSelector = false
        this.$store.commit("setVehicles", this.vehicles);
      }
    },
    editVehicle(index){
      var temp_vehicle = this.vehicles.find(v => v.tabType === 'mine')
      var temp_children = temp_vehicle.children.find( (c, k) => k === index)
      this.editVehicleIndex = index
      this.isEditVehicle = true
      this.vehicles.forEach( v => {if( v.tabType === 'mine') v.active = false})
      let new_vehicle = {
        tabType: 'new',
        title: 'VEHICLE SELECTOR',
        active: true,
      }
      // select year
      this.selectedYear = temp_children.year
      this.selectedMake = temp_children.make
      this.$store.dispatch('loadCarMakes', this.selectedYear)
      setTimeout(() => {
        this.vehicleSelector = true
        this.step = 2
        if(this.vehicles[0].tabType !== 'mine'){
          this.vehicles[0] = new_vehicle
        }else{
          this.vehicles.unshift(new_vehicle)
        }
      }, 500)
    },
    status_area() {
      var html = ''
      var temp_vehicle = this.vehicles.find(v => v.tabType === 'mine')
      if(this.vehicleSelector) {
        if(this.step == 0) {
          html = 'You currently have no vehicle selected.'
          if(temp_vehicle){
            if(temp_vehicle.children.length > 0) {
              let att_lbl  = temp_vehicle.children.length + ' vehicle'
              if(temp_vehicle.children.length > 1) {
                att_lbl = temp_vehicle.children.length + ' vehicles'
              }
              html = '<span>You currently have <span class="c-blue c-pointer">'+att_lbl+' is your garage</span></span>'
            }
          }
        }else{
          html +='<div class="cap-year">'+this.selectedYear+' '+ this.selectedMake+'</div>';
        }
        // html += '<div class="cap-model">Acura</div>';
      }
      return html
    },
    goto_vehicle() {
      var temp_vehicle = this.vehicles.find(v => v.tabType === 'mine')
      if(this.vehicleSelector && temp_vehicle.children.length > 0) {
        this.selVehicle('mine')
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
