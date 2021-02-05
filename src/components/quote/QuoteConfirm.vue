<template>
  <div class="appt-confirm">
    <div class="appt-confirm-stages">
      <div class="confirm-stage active">
        <div class="d-title">
          <span class="lbl-cap8 text-bold">Store Selected</span>
          <div class="action-edit" @click="gotoEdit('store')" v-if="quote.store">Edit</div>
        </div>
        <div class="d-detail" v-if="quote.store">
          <div class="lbl-cap6 text-bold">Tint World<sup>&reg;</sup> {{quote.store.address.city}}</div>
          <div class="lbl-cap6">{{quote.store.address.street}}, Suite #{{quote.store['location-id']}}</div>
          <div class="lbl-cap6">{{quote.store.address.city}}, {{quote.store.address.region}} {{quote.store.address.postalCode}}</div>
        </div>
      </div>
      <div class="confirm-stage active">
        <div class="d-title">
          <span class="lbl-cap8 text-bold">Service(s) Selected</span>
          <div class="action-edit" @click="gotoEdit('service')" v-if="quote.service">Edit</div>
        </div>
        <div class="d-detail" v-if="quote.service">
          <div class="lbl-cap6 text-cap">- {{quote.service.service}} {{quote.service.sub_service_arr.join(', ')}}</div>
          <div class="off-site-btn-area" v-if="quote.service.off_site">
            <div class="off-site-btn">Off-Site Visit</div>
          </div>
        </div>
      </div>
      <div class="confirm-stage active">
        <div class="d-title">
          <span class="lbl-cap8 text-bold">Contact Info:</span>
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
            <div class="flex-1 md-b15" v-if="quote.service.off_site">
              <div class="lbl-cap7 text-bold">Off-Site Visit Location:</div>
              <div class="lbl-cap6" v-if="quote.contact.address">{{quote.contact.address.street}}</div>
              <div class="lbl-cap6" v-if="quote.contact.address">{{quote.contact.address.city}}, {{quote.contact.address.state}} {{quote.contact.address.zip}}</div>
              <div class="lbl-cap6 font-italic font-weight-bold">Contact your Tint World store to confirm your off-site visit & to setup a date/time for your quote request.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data:() =>{
      return {
        
      }
    },
    computed: {
      quote() {
        return this.$store.state.quote
      },
      service_type() {
        return this.$store.state.quote.service.service
      },
    },
    methods: { 
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