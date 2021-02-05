<template>
  <b-modal
    id="appointment-modal"
    :hide-header="true"
    :hide-footer="true"
  >
    <div class="appointment-container" :class="{appointment_confirm_view: cur_stage === 'appt_confirm'}">
      <div class="modal-header">
        <div class="dropdown-ctn appt-modal-ctn">
        <div class="modal-logo">
          <a class="logo" href="/index.php">
            <img style="width: 100%" src="https://tint-world.s3.amazonaws.com/uploads/dist/images/tw-logo.png"/>
          </a>
        </div>
        <div class="call-info">
          <span class="lbl-call">Call today!</span>
          <span class="lbl-call-number">800.767.8468</span>
        </div>
        <div class="close-btn c-pointer" @click="hideModal">
          <close-img></close-img>
        </div>
        </div>
      </div>
      <div class="scheduler-area">
        <div class="scheduler">
          <div class="appt-icon-back mobile" @click="back_appointment"></div>
          <div class="sch-title">
            <div class="lbl-appt-title">APPOINTMENT SCHEDULER</div>
          </div>
          <div class="sch-control">
            <div class="widget-container">
              <div class="appt-ctl-item" :class="{'complete' : is_complete('appt_store'), 'active': is_active('appt_store')}">
                <div class="item-pointer"></div>
                <div class="item-label">Store</div>
                <div class="item-line after"></div>
              </div>
              <div class="appt-ctl-item" :class="{'complete' : is_complete('appt_service'), 'active': is_active('appt_service')}">
                <div class="item-pointer"></div>
                <div class="item-label">Services</div>
                <div class="item-line before-after"></div>
              </div>
              <div class="appt-ctl-item " :class="{'complete' : is_complete('appt_date'), 'active': is_active('appt_date')}">
                <div class="item-pointer"></div>
                <div class="item-label">Date / Time</div>
                <div class="item-line before-after"></div>
              </div>
              <div class="appt-ctl-item " :class="{'complete' : is_complete('appt_contact'), 'active': is_active('appt_contact')}">
                <div class="item-pointer"></div>
                <div class="item-label">Contact info</div>
                <div class="item-line before-after"></div>
              </div>
              <div class="appt-ctl-item " :class="{'complete' : is_complete('appt_confirm'), 'active': is_active('appt_confirm')}">
                <div class="item-pointer"></div>
                <div class="item-label">Confirm</div>
                <div class="item-line before"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="appt-content d-flex flex-row" :class="{bk_f3: cur_stage === 'appt_confirm'}">
        <div class="select-area pd-30 scroll-area" :class="{appt_confirm: cur_stage === 'appt_confirm'}" v-if="cur_stage !== 'appt_book'">
          <div class="appt-cap1 t-bold">{{label_controller()}}</div>
          <div class="appt-sub-comp">
            <appt-store v-if="cur_stage === 'appt_store'"></appt-store>
            <appt-service v-if="cur_stage === 'appt_service'"></appt-service>
            <appt-date-time v-if="cur_stage === 'appt_date'"></appt-date-time>
            <appt-contact v-if="cur_stage === 'appt_contact'"></appt-contact>
            <appt-confirm v-if="cur_stage === 'appt_confirm'" />
          </div>
          <div class="goto-next">
            <div class="btn-cancel c-pointer" v-if="cur_stage === 'appt_store'" @click="hideModal">Cancel</div>
            <div class="btn-back c-pointer" v-else @click="back_appointment">Back</div>
            <div class="btn-next add-next"
              :class="{'active c-pointer': stage_validation}"
              v-if="cur_stage !== 'appt_confirm'" @click="goto_appointment">{{label_next_btn()}}</div>
            <div class="btn-next btn-book c-pointer active" @click="goto_book" v-else >Book Now</div>
          </div>
        </div>
        <div v-if="cur_stage === 'appt_book'" class="appt-book">
          <div class="book-title">APPOINTMENT<br>REQUESTED!</div>
          <div class="book-description">
            Thank you for requesting an appointment with Tint World<sup>&reg;</sup>. The appointment is a request for a date and time,
            please contact your store to confirm your appointment request and the date/time availability.
          </div>
          <div class="book-btn" @click="gotoLink('#')">BROWSE OUR SITE</div>
        </div>
        <div class="appt-details pd-30 scroll-area" v-if="cur_stage !== 'appt_confirm' && cur_stage !== 'appt_book'">
          <div class="appt-cap1">Appointment Details</div>
          <!-- <div class="appt-detail-stages">
            <div class="detail-stage" :class="{'active': is_complete_active('appt_store')}">1. Select a Store</div>
            <div class="detail-stage" :class="{'active': is_complete_active('appt_service')}">2. Service(s)</div>
            <div class="detail-stage" :class="{'active': is_complete_active('appt_date')}">3. Date & Time</div>
            <div class="detail-stage" :class="{'active': is_complete_active('appt_contact')}">4. Contact Info</div>
            <div class="detail-stage">5. Confirm Appointment</div>
          </div> -->
          <div class="appt-confirm-stages">
            <div class="confirm-stage" :class="{'active': appointment.store}">
              <div class="d-title">
                <span class="lbl-cap8 text-bold">1. Store Selected</span>
                <div class="action-edit" @click="gotoEdit('store')" v-if="appointment.store">Edit</div>
              </div>
              <div class="d-detail" v-if="appointment.store">
                <div class="lbl-cap6 text-bold">Tint World<sup>&reg;</sup> {{appointment.store.address.city}}</div>
                <div class="lbl-cap6">{{appointment.store.address.street}}, Suite #{{appointment.store['location-id']}}</div>
                <div class="lbl-cap6">{{appointment.store.address.city}}, {{appointment.store.address.region}} {{appointment.store.address.postalCode}}</div>
              </div>
            </div>
            <div class="confirm-stage" :class="{'active': appointment.service}">
              <div class="d-title">
                <span class="lbl-cap8 text-bold">2. Service(s) Selected</span>
                <div class="action-edit" @click="gotoEdit('service')" v-if="appointment.service">Edit</div>
              </div>
              <div class="d-detail" v-if="appointment.service">
                <div class="lbl-cap6 text-cap">- {{appointment.service.service}} {{appointment.service.sub_service_arr.join(', ')}}</div>
                <div class="off-site-btn-area" v-if="appointment.service.off_site">
                  <div class="off-site-btn">Off-Site Visit</div>
                </div>
              </div>
            </div>
            <div class="confirm-stage"  :class="{'active': appointment.datetime}">
              <div class="d-title">
                <span class="lbl-cap8 text-bold">3. Date & Time:</span>
                <div class="action-edit" @click="gotoEdit('date')" v-if="appointment.datetime">Edit</div>
              </div>
              <div class="d-detail" v-if="appointment.datetime">
                <div class="lbl-cap6">{{appointment.datetime.label}}</div>
              </div>
            </div>
            <div class="confirm-stage" :class="{'active': appointment.contact}">
              <div class="d-title">
                <span class="lbl-cap8 text-bold">4. Contact Info:</span>
                <div class="action-edit" @click="gotoEdit('contact')" v-if="appointment.contact">Edit</div>
              </div>
              <div class="d-detail" v-if="appointment.contact">
                <div class="flex-1 d-flex flex-column">
                  <div class="flex-1 md-b15">
                    <div v-html="show_service_contact()"></div>
                  </div>
                  <div class="flex-1 md-b15">
                    <div class="lbl-cap7 text-bold">Your Info</div>
                    <div class="lbl-cap6">{{appointment.contact.first_name}} {{appointment.contact.last_name}}</div>
                    <div class="lbl-cap6">{{appointment.contact.phone}}</div>
                    <div class="lbl-cap6">{{appointment.contact.email}}</div>
                  </div>
                  <div class="flex-1 md-b15">
                    <div class="lbl-cap7 text-bold">About My Project</div>
                    <div class="lbl-cap6">{{appointment.contact.description}}</div>
                  </div>
                  <div class="flex-1 photos-area" v-if="appointment.contact.photos.length > 0">
                    <div class="flex-1 md-b15">
                      <div class="lbl-cap7 text-bold">Uploaded Files</div>
                      <div class="lbl-cap6" v-for="(p, i) in appointment.contact.photos" :key="i">{{p}}</div>
                    </div>
                  </div>
                  <div class="flex-1 md-b15" v-if="appointment.service.off_site" v-html="showOffSiteLocation()"></div>
                </div>
              </div>
            </div>
            <div class="confirm-stage">
              <div class="d-title">
                <span class="lbl-cap8 text-bold">5. Confirm Appointment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="appt-footer">
        Copyright &copy; 2020 Tint World&reg; Franchise. All rights reserved.
      </div>
    </div>
  </b-modal>
</template>

<script>
import {eventBus} from "./../../main"
import CloseImg from "./../CloseImg";
import ApptStore from "./ApptStore";
import ApptService from "./ApptService";
import ApptDateTime from "./ApptDateTime";
import ApptContact from "./ApptContact";
import ApptConfirm from "./ApptConfirm";
import { book } from "./../../utils/api";
import { validateAppointmentQuoteData } from "./../../utils/useful";

  export default {
    components: {
      CloseImg,
      ApptStore,
      ApptService,
      ApptDateTime,
      ApptContact,
      ApptConfirm,
    },
    data: () => {
      return {
        list_appt_states : ['appt_store', 'appt_service', 'appt_date', 'appt_contact', 'appt_confirm', 'appt_book'],
        // cur_stage: '' // appt_store | appt_service | appt_date | appt_contact | appt_confirm
        stage_validation: false,
      }
    },
    created() {
      eventBus.$on('isChangedApptValidation', (val) => {
        this.stage_validation = val
      })
    },
    computed: {
      appointment_modal() {
        return this.$store.state.appointment_modal
      },
      cur_stage() {
        return this.$store.state.appt_cur_stage
      },
      cur_index() {
        return this.list_appt_states.findIndex( l => l === this.cur_stage)
      },
      appointment() {
        return this.$store.state.appointment
      },
      service_type() {
        if(this.$store.state.appointment.service)
          return this.$store.state.appointment.service.service
        else{
          return null
        }
      },
    },
    methods: {
      showOffSiteLocation(){
        let html = '<div class="lbl-cap7 text-bold">Off-Site Visit Location:</div>'
        if(this.appointment.contact.address) {
          // console.log('test : ', this.appointment.contact.address)
          html += '<div class="lbl-cap6">' + this.appointment.contact.address.street + '</div>'
          html += '<div class="lbl-cap6">' + this.appointment.contact.address.city + ', ' + this.appointment.contact.address.state + ' ' + this.appointment.contact.address.zip + '</div>'
        }
        return html
      },
      gotoLink(url){
        location.href = url
        this.hideModal()
      },
      hideModal() {
        this.$root.$emit('bv::hide::modal', 'appointment-modal')
        this.$store.commit('TOGGLE_MODAL', 'appointment')
      },
      toggleModal() {
        this.$root.$emit('bv::toggle::modal', 'appointment-modal')
        this.$store.commit('TOGGLE_MODAL', 'appointment')
      },
      back_appointment() {
        this.$store.commit('update_appointment', 'back')
      },
      goto_appointment() {
        if(this.stage_validation) {
          eventBus.$emit('isChangedApptValidation', false)
          this.$store.commit('update_appointment', 'next')
        }
      },
      goto_book() {
        const { isValidAppointment, error } = validateAppointmentQuoteData(this.$store.state.appointment, 'appointment')
        if (!isValidAppointment) {
          alert(error.message)
          this.$store.commit('edit_appointment', 'appt_' + error.redirect)
        } else {
          book('appointment', this.$store.state.appointment)
                  .then(x => {
                    console.log(x)
                    if(x.data.responseCode == 0){
                      console.log('Form Invalid');
                      this.$store.commit('update_appointment','back')
                      //@TODO - Add validation here
                    } else if(x.data.responseCode == 1){
                      this.$store.commit("setAppointment", {type: 'init',data: {}});
                      // remove localStorage
                      localStorage.removeItem('my_appointment')
                      this.$store.commit('update_appointment', 'next')
                    }
                  })
                  .catch(err => {
                    console.log('Axios FileUpload.js Error Reported');
                    console.log(err)
                    //this.$store.commit("setAppointment", {type: 'init',data: {}});
                    // remove localStorage
                    //localStorage.removeItem('my_appointment')
                    this.$store.commit('update_appointment', 'back')
                  });
        }
      },
      is_complete(lbl_stage) {
        var index = this.list_appt_states.findIndex( l => l === lbl_stage)
        if(index < this.cur_index) {
          return true
        }else{
          return false
        }
      },
      is_active(lbl_stage) {
        var index = this.list_appt_states.findIndex( l => l === lbl_stage)
        if(index === this.cur_index) {
          return true
        }else{
          return false
        }
      },
      is_complete_active(lbl_stage) {
        var index = this.list_appt_states.findIndex( l => l === lbl_stage)
        if(index <= this.cur_index) {
          return true
        }else{
          return false
        }
      },
      label_next_btn() {
        const appt_next_labels = {
          appt_store: 'Continue to Services',
          appt_service: 'Next',
          appt_date: 'Next',
          appt_contact: 'Next',
          appt_confirm: 'Next',
        }
        // console.log(this.cur_stage)
        // console.log(appt_next_labels[this.cur_stage])
        return appt_next_labels[this.cur_stage]
      },
      label_controller() {
        const appt_controller_labels = {
          appt_store: '1. Select a Store',
          appt_service: '2. Select Your Service(s)',
          appt_date: '3. Select Your Date & Time',
          appt_contact: '4. Contact Info',
          appt_confirm: 'Confirm Appointment Details',
        }
        return appt_controller_labels[this.cur_stage]
      },
      gotoEdit(state){
        console.log({state})
        // appt_store | appt_service | appt_date | appt_contact | appt_confirm
        this.$store.commit('edit_appointment', 'appt_' + state)
      },
      show_service_contact(){
        var title = ''
        var description = ''
        switch(this.service_type){
          case 'automotive':
            title = 'Vehicle Info'
            description = this.appointment.contact.year + ' ' + this.appointment.contact.make + ' ' + this.appointment.contact.model + ' (' + this.appointment.contact.door + ' Doors)'
            break;
          case 'residential':
            title = 'Residential Type'
            description = this.appointment.contact.residential
            break;
          case 'commercial':
            title = 'Building Info'
            description = this.appointment.contact.building
            break;
          case 'marine':
            title = 'Vessel Info'
            description = this.appointment.contact.vessel
            break;
        }
        var html = ''
        html += '<div class="lbl-cap7 text-bold text-cap">'+title+'</div>'
        html += '<div class="lbl-cap6">'+description+'</div>'
        return html
      },
    }
  }
</script>
