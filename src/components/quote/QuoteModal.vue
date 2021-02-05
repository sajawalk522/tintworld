<template>
  <b-modal
    id="quote-modal"
    :hide-header="true"
    :hide-footer="true"
  >
    <div class="appointment-container" :class="{quote_confirm_view: cur_stage === 'quote_confirm'}">
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
          <div class="appt-icon-back mobile" @click="back_quote"></div>
          <div class="sch-title">
            <div class="lbl-appt-title">QUOTE SCHEDULER</div>
          </div>
          <div class="sch-control">
            <div class="widget-container">
              <div class="appt-ctl-item" :class="{'complete' : is_complete('quote_store'), 'active': is_active('quote_store')}">
                <div class="item-pointer"></div>
                <div class="item-label">Store</div>
                <div class="item-line after"></div>
              </div>
              <div class="appt-ctl-item" :class="{'complete' : is_complete('quote_service'), 'active': is_active('quote_service')}">
                <div class="item-pointer"></div>
                <div class="item-label">Services</div>
                <div class="item-line before-after"></div>
              </div>
              <div class="appt-ctl-item " :class="{'complete' : is_complete('quote_contact'), 'active': is_active('quote_contact')}">
                <div class="item-pointer"></div>
                <div class="item-label">Contact info</div>
                <div class="item-line before-after"></div>
              </div>
              <div class="appt-ctl-item " :class="{'complete' : is_complete('quote_confirm'), 'active': is_active('quote_confirm')}">
                <div class="item-pointer"></div>
                <div class="item-label">Confirm</div>
                <div class="item-line before"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="appt-content d-flex flex-row" :class="{bk_f3: cur_stage === 'quote_confirm'}">
        <div class="select-area pd-30 scroll-area" :class="{appt_confirm: cur_stage === 'quote_confirm'}" v-if="cur_stage !== 'quote_book'">
          <div class="appt-cap1 t-bold">{{label_controller()}}</div>
          <div class="appt-sub-comp">
            <quote-store v-if="cur_stage === 'quote_store'"></quote-store>
            <quote-service v-if="cur_stage === 'quote_service'"></quote-service>
            <quote-contact v-if="cur_stage === 'quote_contact'"></quote-contact>
            <quote-confirm v-if="cur_stage === 'quote_confirm'" />
          </div>
          <div class="goto-next">
            <div class="btn-cancel c-pointer" v-if="cur_stage === 'quote_store'" @click="hideModal">Cancel</div>
            <div class="btn-back c-pointer" v-else @click="back_quote">Back</div>
            <div class="btn-next add-next"
              :class="{'active c-pointer': stage_validation}"
              v-if="cur_stage !== 'quote_confirm'" @click="goto_quote">{{label_next_btn()}}</div>
            <div class="btn-next btn-book c-pointer active" @click.stop="goto_book" v-else >Book Now</div>
          </div>
        </div>
        <div v-if="cur_stage === 'quote_book'" class="appt-book">
          <div class="book-title">QUOTE<br>BOOKED!</div>
          <div class="book-description">
            Thank you for requesting a quote from Tint World<sup>&reg;</sup>. Someone will reach out to you to go over service details and pricing.
          </div>
          <div class="book-btn" @click="gotoLink('#')">BROWSE OUR SITE</div>
        </div>
        <div class="appt-details pd-30 scroll-area" v-if="cur_stage !== 'quote_confirm' && cur_stage !== 'quote_book'">
          <div class="appt-cap1">Quote Details</div>
          <div class="appt-confirm-stages">
            <div class="confirm-stage" :class="{'active': quote.store}">
              <div class="d-title">
                <span class="lbl-cap8 text-bold">1. Store Selected</span>
                <div class="action-edit" @click="gotoEdit('store')" v-if="quote.store">Edit</div>
              </div>
              <div class="d-detail" v-if="quote.store">
                <div class="lbl-cap6 text-bold">Tint World<sup>&reg;</sup> {{quote.store.address.city}}</div>
                <div class="lbl-cap6">{{quote.store.address.street}}, Suite #{{quote.store['location-id']}}</div>
                <div class="lbl-cap6">{{quote.store.address.city}}, {{quote.store.address.region}} {{quote.store.address.postalCode}}</div>
              </div>
            </div>
            <div class="confirm-stage" :class="{'active': quote.service}">
              <div class="d-title">
                <span class="lbl-cap8 text-bold">2. Service(s) Selected</span>
                <div class="action-edit" @click="gotoEdit('service')" v-if="quote.service">Edit</div>
              </div>
              <div class="d-detail" v-if="quote.service">
                <div class="lbl-cap6 text-cap">- {{quote.service.service}} {{quote.service.sub_service_arr.join(', ')}}</div>
                <div class="off-site-btn-area" v-if="quote.service.off_site">
                  <div class="off-site-btn">Off-Site Visit</div>
                </div>
              </div>
            </div>
            <div class="confirm-stage" :class="{'active': quote.contact}">
              <div class="d-title">
                <span class="lbl-cap8 text-bold">3. Contact Info:</span>
                <div class="action-edit" @click="gotoEdit('contact')" v-if="quote.contact">Edit</div>
              </div>
              <div class="d-detail" v-if="quote.contact">
                <div class="flex-1 d-flex flex-column">
                  <div class="flex-1 md-b15">
                    <div v-html="show_service_contact()"></div>
                  </div>
                  <div class="flex-1 md-b15">
                    <div class="lbl-cap7 text-bold">Your Info</div>
                    <div class="lbl-cap6">{{quote.contact.first_name}} {{quote.contact.last_name}}</div>
                    <div class="lbl-cap6">{{quote.contact.phone}}</div>
                    <div class="lbl-cap6">{{quote.contact.email}}</div>
                  </div>
                  <div class="flex-1 md-b15">
                    <div class="lbl-cap7 text-bold">About My Project</div>
                    <div class="lbl-cap6">{{quote.contact.description}}</div>
                  </div>
                  <div class="flex-1 photos-area" v-if="quote.contact.photos.length > 0">
                    <div class="flex-1 md-b15">
                      <div class="lbl-cap7 text-bold">Uploaded Files</div>
                      <div class="lbl-cap6" v-for="(p, i) in quote.contact.photos" :key="i">{{p}}</div>
                    </div>
                  </div>
                  <div class="flex-1 md-b15" v-if="quote.service.off_site" v-html="showOffSiteLocation()"></div>
                </div>
              </div>
            </div>
            <div class="confirm-stage">
              <div class="d-title">
                <span class="lbl-cap8 text-bold">4. Confirm Quote</span>
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
import QuoteStore from "./QuoteStore";
import QuoteService from "./QuoteService";
import QuoteContact from "./QuoteContact";
import QuoteConfirm from "./QuoteConfirm";
import { book } from "./../../utils/api"
import { validateAppointmentQuoteData } from "./../../utils/useful";

  export default {
    components: {
      CloseImg,
      QuoteStore,
      QuoteService,
      QuoteContact,
      QuoteConfirm,
    },
    data: () => {
      return {
        list_quote_states : ['quote_store', 'quote_service', 'quote_contact', 'quote_confirm', 'quote_book'],
        stage_validation: false,
      }
    },
    created() {
      eventBus.$on('isChangedQuoteValidation', (val) => {
        this.stage_validation = val
      })
    },
    computed: {
      quote_modal() {
        return this.$store.state.quote_modal
      },
      cur_stage() {
        return this.$store.state.quote_cur_stage
      },
      cur_index() {
        return this.list_quote_states.findIndex( l => l === this.cur_stage)
      },
      quote() {
        return this.$store.state.quote
      },
      service_type() {
        if(this.$store.state.quote.service)
          return this.$store.state.quote.service.service
        else{
          return null
        }
      },
    },
    methods: {
      showOffSiteLocation(){
        let html = '<div class="lbl-cap7 text-bold">Off-Site Visit Location:</div>'
        if(this.quote.contact.address) {
          // console.log('test : ', this.quote.contact.address)
          html += '<div class="lbl-cap6">' + this.quote.contact.address.street + '</div>'
          html += '<div class="lbl-cap6">' + this.quote.contact.address.city + ', ' + this.quote.contact.address.state + ' ' + this.quote.contact.address.zip + '</div>'
        }
        return html
      },
      gotoLink(url){
        location.href = url
        this.hideModal()
      },
      hideModal() {
        this.$root.$emit('bv::hide::modal', 'quote-modal')
        this.$store.commit('TOGGLE_MODAL', 'quote')
      },
      toggleModal() {
        this.$root.$emit('bv::toggle::modal', 'quote-modal')
        this.$store.commit('TOGGLE_MODAL', 'quote')
      },
      back_quote() {
        this.$store.commit('update_quote', 'back')
      },
      goto_quote() {
        if(this.stage_validation) {
          eventBus.$emit('isChangedQuoteValidation', false)
          this.$store.commit('update_quote', 'next')
        }
      },
      goto_book() {
        // book
        // submit data
        const { isValidAppointment, error } = validateAppointmentQuoteData(this.$store.state.quote, 'quote')
        if (!isValidAppointment) {
          alert(error.message)
          this.$store.commit('edit_quote', 'quote_' + error.redirect)
        } else {
          book('quote', this.$store.state.quote)
          .then(x => {
            console.log(x)
            if(x.data.responseCode == 0){
              console.log('Form Invalid');
              this.$store.commit('update_quote','back')
              //@TODO - Add validation here
            } else if(x.data.responseCode == 1){
              this.$store.commit("setQuote", {type: 'init',data: {}});
              // remove localStorage
              localStorage.removeItem('my_quote')
              this.$store.commit('update_quote', 'next')
            }
          })
          .catch(err => {
            console.log('Axios FileUpload.js Error Reported');
            console.log(err)
            //this.$store.commit("setQuote", {type: 'init',data: {}});
            // remove localStorage
            //localStorage.removeItem('my_quote')
            this.$store.commit('update_quote', 'back')
          });
        }
      },
      is_complete(lbl_stage) {
        var index = this.list_quote_states.findIndex( l => l === lbl_stage)
        if(index < this.cur_index) {
          return true
        }else{
          return false
        }
      },
      is_active(lbl_stage) {
        var index = this.list_quote_states.findIndex( l => l === lbl_stage)
        if(index === this.cur_index) {
          return true
        }else{
          return false
        }
      },
      is_complete_active(lbl_stage) {
        var index = this.list_quote_states.findIndex( l => l === lbl_stage)
        if(index <= this.cur_index) {
          return true
        }else{
          return false
        }
      },
      label_next_btn() {
        const quote_next_labels = {
          quote_store: 'Continue to Services',
          quote_service: 'Next',
          quote_contact: 'Next',
          quote_confirm: 'Next',
        }
        // console.log(this.cur_stage)
        // console.log(quote_next_labels[this.cur_stage])
        return quote_next_labels[this.cur_stage]
      },
      label_controller() {
        const quote_controller_labels = {
          quote_store: '1. Select a Store',
          quote_service: '2. Select Your Service(s)',
          quote_contact: '3. Contact Info',
          quote_confirm: 'Confirm Quote Details',
        }
        return quote_controller_labels[this.cur_stage]
      },
      gotoEdit(state){
        console.log({state})
        this.$store.commit('edit_quote', 'quote_' + state)
      },
      show_service_contact(){
        var title = ''
        var description = ''
        switch(this.service_type){
          case 'automotive':
            title = 'Vehicle Info'
            description = this.quote.contact.year + ' ' + this.quote.contact.make + ' ' + this.quote.contact.model + ' (' + this.quote.contact.door + ' Doors)'
            break;
          case 'residential':
            title = 'Residential Type'
            description = this.quote.contact.residential
            break;
          case 'commercial':
            title = 'Building Info'
            description = this.quote.contact.building
            break;
          case 'marine':
            title = 'Vessel Info'
            description = this.quote.contact.vessel
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
