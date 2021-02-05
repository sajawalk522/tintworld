<template>
  <div class="appt-confirm">
    <div class="appt-confirm-stages">
      <div class="confirm-stage active">
        <div class="d-title">
          <span class="lbl-cap8 text-bold">Store Selected</span>
          <div class="action-edit" @click="gotoEdit('store')" v-if="appointment.store">Edit</div>
        </div>
        <div class="d-detail" v-if="appointment.store">
          <div class="lbl-cap6 text-bold">Tint World<sup>&reg;</sup> {{appointment.store.address.city}}</div>
          <div class="lbl-cap6">{{appointment.store.address.street}}, Suite #{{appointment.store['location-id']}}</div>
          <div class="lbl-cap6">{{appointment.store.address.city}}, {{appointment.store.address.region}} {{appointment.store.address.postalCode}}</div>
        </div>
      </div>
      <div class="confirm-stage active">
        <div class="d-title">
          <span class="lbl-cap8 text-bold">Service(s) Selected</span>
          <div class="action-edit" @click="gotoEdit('service')" v-if="appointment.service">Edit</div>
        </div>
        <div class="d-detail" v-if="appointment.service">
          <div class="lbl-cap6 text-cap">- {{appointment.service.service}} {{appointment.service.sub_service_arr.join(', ')}}</div>
          <div class="off-site-btn-area" v-if="appointment.service.off_site">
            <div class="off-site-btn">Off-Site Visit</div>
          </div>
        </div>
      </div>
      <div class="confirm-stage active">
        <div class="d-title">
          <span class="lbl-cap8 text-bold">Date & Time:</span>
          <div class="action-edit" @click="gotoEdit('date')" v-if="appointment.datetime">Edit</div>
        </div>
        <div class="d-detail" v-if="appointment.datetime">
          <div class="lbl-cap6">{{appointment.datetime.label}}</div>
        </div>
      </div>
      <div class="confirm-stage active">
        <div class="d-title">
          <span class="lbl-cap8 text-bold">Contact Info:</span>
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
            <div class="flex-1 md-b15" v-if="appointment.service.off_site">
              <div class="lbl-cap7 text-bold">Off-Site Visit Location:</div>
              <div class="lbl-cap6" v-if="appointment.contact.address">{{appointment.contact.address.street}}</div>
              <div class="lbl-cap6" v-if="appointment.contact.address">{{appointment.contact.address.city}}, {{appointment.contact.address.state}} {{appointment.contact.address.zip}}</div>
              <div class="lbl-cap6 font-italic font-weight-bold">Contact your Tint World store to confirm your off-site visit & appointment.</div>
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
      appointment() {
        return this.$store.state.appointment
      },
      service_type() {
        return this.$store.state.appointment.service.service
      },
    },
    methods: { 
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