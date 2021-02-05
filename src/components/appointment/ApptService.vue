<template>
  <div class="appt-store">
    <div class="tabs">
      <div class="accordion" v-for="(service, index) in services" :key="index">
        <input type="checkbox" :checked="level1_chks[getIDByService(service.alias)]" :id="getIDByService(service.alias)">
        <label class="accordion-label" :for="service.alias" @click="selectAccordion(service.alias)">
          <div class="label-content c-pointer" :class="{active: level1_selector === service.alias}">
            <div class="radio-area chk-radio">
              <b-form-group label="" @input="selOption">
                <b-form-radio v-model="level1_selector" name="some-radios" :value="service.alias"></b-form-radio>
              </b-form-group>
            </div>
            <div class="cap-img">
              <img :src="service.menuThumb" alt="test">
            </div>
            <div class="appt-cap5">
              {{getSubTitle(service.title)}}
            </div>
          </div>
        </label>
        <div class="accordion-content">
          <b-form-group label="" class="checkbox-area">
            <b-form-checkbox-group
              class="level2-checkbox"
              v-model="level2_selector[getIDByService(service.alias)]"
              :options="customOptions(service.children)"
              @change="selCheckbox"
              :name="service.alias"
            ></b-form-checkbox-group>
          </b-form-group>
          <div class="off-site-area" v-if="getIDByService(service.alias) != 'automotive'">
            <b-form-checkbox @change="selCheckboxOff" v-model="off_site_checked[getIDByService(service.alias)]" name="check-button" switch>
              <span><span class="desktop">An </span>Off-Site Visit?</span>
            </b-form-checkbox>
            <i class="fa fa-exclamation-circle" :id="'tooltip-'+getIDByService(service.alias)"></i>
            <b-tooltip ref="tooltip" :target="'tooltip-'+getIDByService(service.alias)">
              We can come to your location to perform work and provide estimates. <br>
              Select this option if you require an off-site visit.
            </b-tooltip>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import {eventBus} from "./../../main"
import { getSubTitle } from "./../../utils/useful"
  export default {
    data:() =>{
      return {
        level1_selector: '',
        level2_selector: {
          automotive: [],
          residential: [],
          commercial: [],
          marine: [],
        },
        service_options: ['automotive', 'residential', 'commercial', 'marine'],
        level1_chks: {
          automotive: false,
          residential: false,
          commercial: false,
          marine: false,
        },
        off_site_checked: {
          automotive: false,
          residential: false,
          commercial: false,
          marine: false,
        },
      }
    },
    mounted(){
      if(this.$store.state.appointment.service) {
        // console.log("my store : ", this.$store.state)
        var load_service = this.$store.state.appointment.service
        eventBus.$emit('isChangedApptValidation', true)
        this.level1_selector = load_service.service_alias
        var get_id = load_service.service
        this.service_options.forEach( s => {
          if(s != get_id){
            this.level1_chks[s] = false
          }else{
            this.level1_chks[s] = true
            this.off_site_checked[s] = load_service.off_site
            this.level2_selector[s] = load_service.sub_service
          }
        })
      }
    },
    computed: {
      services() {
        return this.$store.state.categories
      }
    },
    methods: {
      getSubTitle(sub_title){
        return getSubTitle(sub_title)
      },
      customOptions(children){
        var level_options = []
        children.forEach(element => {
          level_options.push({text: element.title, value: element.alias})
        });
        // console.log({level_options})
        return level_options
      },
      selCheckbox(values) {
        console.log(values) 
        console.log(JSON.stringify(this.level2_selector)) 
        if(values.length > 0) {
          // console.log("here1")
          var service = this.getIDByService(this.level1_selector)
          this.level2_selector[service] = values
          var sub_service_arr = []
          const s_serv = this.services.find( s => s.alias === this.level1_selector)
          for( var k of s_serv.children) {
            if(this.level2_selector[service].includes(k.alias)){
              sub_service_arr.push(k.title)
            }
          }
          console.log({sub_service_arr})
          var param = {
            'service_alias': this.level1_selector,
            'service': service,
            'sub_service': this.level2_selector[service],
            'sub_service_arr': sub_service_arr,
            'off_site': this.off_site_checked[this.getIDByService(this.level1_selector)],
          }
          // console.log(param)
          eventBus.$emit('isChangedApptValidation', true)
          this.$store.commit("setAppointment", {type: 'service',data: param});
        }else{
          eventBus.$emit('isChangedApptValidation', false)
        }
        // console.log("values", JSON.stringify(this.level2_selector))
      },
      selCheckboxOff(val) {
        var get_id = this.getIDByService(this.level1_selector)
        var values = this.level2_selector[get_id]
        var sub_service_arr = []
        const s_serv = this.services.find( s => s.alias === this.level1_selector)
        for( var k of s_serv.children) {
          if(this.level2_selector[get_id].includes(k.alias)){
            sub_service_arr.push(k.title)
          }
        }
        if(values.length > 0) {
          // console.log("here1")
          var param = {
            'service_alias': this.level1_selector,
            'service': this.getIDByService(this.level1_selector),
            'sub_service': values,
            'sub_service_arr': sub_service_arr,
            'off_site': val,
          }
          // console.log(param)
          eventBus.$emit('isChangedApptValidation', true)
          this.$store.commit("setAppointment", {type: 'service',data: param});
        }else{
          eventBus.$emit('isChangedApptValidation', false)
        }
        // console.log("values", JSON.stringify(this.level2_selector))
      },
      getIDByService(alias){
        let custom_id = ''
        switch(alias) {
          case 'automotive-services':
            custom_id =  'automotive';
            break;
          case 'residential-services':
            custom_id =  'residential';
            break;
          case 'commercial-services':
            custom_id =  'commercial';
            break;
          case 'marine-services':
            custom_id =  'marine';
            break;
          default:
            custom_id = 'automotive'
        }
        return custom_id
      },
      selOption(){
        console.log("here1", this.level1_selector)
        // this.selectAccordion(this.level1_selector)
      },
      selectAccordion(title) {
        var get_id = this.getIDByService(title)
        // console.log("title", title)
        console.log("focus id", get_id)
        this.service_options.forEach( s => {
          if(s != get_id){
            this.level1_chks[s] = false
            this.level2_selector[s] = []
          }else{
            this.level1_chks[s] = !this.level1_chks[s]
          }
        })
        // console.log("option ", JSON.stringify(this.level1_chks))
        this.level1_selector = title
      },
      checkboxToggle(value) {
        console.log("click checkbox", value)
      },
      onTooltipOpen() {
        this.$refs.tooltip.$emit('open')
      },
      onTooltipClose() {
        this.$refs.tooltip.$emit('close')
      },
    }
  }
</script>