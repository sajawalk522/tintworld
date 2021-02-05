<template>
  <div class="appt-date">
    <div class="sel-day-container">
      <div class="btn-prev btn-arrow" @click="arrowDay('prev')"><i class="fa fa-angle-left"></i></div>
      <button type="button" class="btn-day-area" v-for="(d, index) in days" :key="index" @click="selectDate(index)">
        <div class="btn-day" :class="{active: d.active, disabled: d.disabled}">
          <span class="lbl-date">{{d.lbl_date}}</span>
          <span class="lbl-day">{{d.lbl_day}}</span>
        </div>
      </button>
      <div class="btn-next btn-arrow" @click="arrowDay('next')"><i class="fa fa-angle-right"></i></div>
    </div>
    <div class="sel-time-container">
      <div class="selected-date">{{showDateTime}}</div>
      <div class="time-area">
        <div class="time-row" v-for="(k, index) in times" :key="k.value"
          :class="{active: k.active, disabled: k.disabled}"  
          @click="selectTime(index)"
        >
          {{k.label}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {eventBus} from "./../../main"
import { getDateInfo, getNewDate, getStrDate } from "./../../utils/useful"

  export default {
    data:() =>{
      return {
        windowWidth: window.innerWidth,
        selected_date: null,
        selected_time: null,
        days: [], // lbl_date, lbl_day, active, date
        times: [
          {value: '8:00', label: '8:00 am', disabled: false, active: false},
          {value: '8:30', label: '8:30 am', disabled: false, active: false},
          {value: '9:00', label: '9:00 am', disabled: false, active: false},
          {value: '9:30', label: '9:30 am', disabled: false, active: false},
          {value: '10:00', label: '10:00 am', disabled: false, active: false},
          {value: '10:30', label: '10:30 am', disabled: false, active: false},
          {value: '11:00', label: '11:00 am', disabled: false, active: false},
          {value: '11:30', label: '11:30 am', disabled: false, active: false},
          {value: '12:00', label: '12:00 pm', disabled: false, active: false},
          {value: '12:30', label: '12:30 pm', disabled: false, active: false},
          {value: '1:00', label: '1:00 pm', disabled: false, active: false},
          {value: '1:30', label: '1:30 pm', disabled: false, active: false},
          {value: '2:00', label: '2:00 pm', disabled: false, active: false},
          {value: '2:30', label: '2:30 pm', disabled: false, active: false},
          {value: '3:00', label: '3:00 pm', disabled: false, active: false},
          {value: '3:30', label: '3:30 pm', disabled: false, active: false},
          {value: '4:00', label: '4:00 pm', disabled: false, active: false},
          {value: '4:30', label: '4:30 pm', disabled: false, active: false},
          {value: '5:00', label: '5:00 pm', disabled: false, active: false},
          {value: '5:30', label: '5:30 pm', disabled: false, active: false},
        ],
      }
    },
    watch: {
      windowWidth(newHeight, oldHeight) {
      this.txt = `it changed to ${newHeight} from ${oldHeight}`;
      }
    },
    mounted() {
      if(this.$store.state.appointment.datetime) {
        var load_datetime = this.$store.state.appointment.datetime
        this.selected_date = load_datetime.date
        this.selected_time = load_datetime.time
        this.times.forEach( t => {
          if(t.value === this.selected_time.value){
            t.active = this.selected_time.active
          }
        })
        this.generate_day_nav()
        eventBus.$emit('isChangedApptValidation', true)
      }else{
        this.generate_day_nav()
      }
      this.$nextTick(() => {
        window.addEventListener('resize', this.onResize);
      })
    },
    computed: {
      showDateTime() {
        // Friday, October 4th @ 11:am
        var show_label = 'Choose An Available Time Slot'
        if(this.selected_date && this.isDateBeforeToday(this.selected_date.date) && this.isDateToday(this.selected_date.date)){
          return show_label
        }
          if(this.selected_date) {
            show_label = getStrDate(this.selected_date.date)
          }
          if (this.selected_time){
            show_label += ' @ ' + this.selected_time.label
          }
          if(this.selected_date && this.selected_time) {
            var param = {
              date: this.selected_date,
              time: this.selected_time,
              label: show_label
            }
            eventBus.$emit('isChangedApptValidation', true)
            this.$store.commit("setAppointment", {type: 'datetime',data: param});
          }

        return show_label
      }
    },
    methods: {
      isDateBeforeToday(date) {
        return new Date(date.toDateString()) < new Date(new Date().toDateString());
      },
      isDateToday(date) {
        let today = new Date()
        return date.getDate() == today.getDate() &&
            date.getMonth() == today.getMonth() &&
            date.getFullYear() == today.getFullYear()
      },
      onResize() {
        this.windowWidth = window.innerWidth
        var center_date = this.days[parseInt(this.days.length / 2)].date
        var has_active = false
        if(this.selected_date){
          center_date = this.selected_date.date
          has_active = true
        }
        this.days = this.generate_days(center_date, has_active)
      },
      generate_day_nav(){
        var center_date = new Date()
        center_date.setDate(center_date.getDate()+1)
        var has_active = true
        if(this.selected_date){
          //@TODO - Will submit during next build
          if(!this.isDateBeforeToday(this.selected_date.date) && !this.isDateToday(this.selected_date.date)){
            center_date = this.selected_date.date
            has_active = true
          }
        } else {
          this.selected_date = getDateInfo(center_date, true, false)
        }
        this.days = this.generate_days(center_date, has_active)
      },
      isSameDate(d1, d2){
        if(d1.getDate() !== d2.getDate()){
          return false
        }
        if(d1.getMonth() !== d2.getMonth()){
          return false
        }
        if(d1.getFullYear() !== d2.getFullYear()){
          return false
        }
        return true
      },
      getMaxColumnsFromWidth(){
        var max_day = 7
        if(this.windowWidth > 1300) {
          max_day = 7
        }else if(this.windowWidth > 1100){
          max_day = 6
        }else if(this.windowWidth > 1024){
          max_day = 5
        }else if(this.windowWidth > 800){
          max_day = 6
        }else if(this.windowWidth > 700){
          max_day = 5
        }else if(this.windowWidth > 600){
          max_day = 4
        }else if(this.windowWidth > 411){
          max_day = 3
        }else if(this.windowWidth > 350){
          max_day = 2
        }else{
          max_day = 1
        }
        return max_day
      },
      generate_days(center_date, has_active){
        var max_day = this.getMaxColumnsFromWidth()
        var days = [] // Days you want to subtract
        // console.log("center_date ", center_date)
        var from_date = new Date(center_date.getTime() - parseInt(max_day/2) * (24 * 60 * 60 * 1000))
        var date  
        for(var k = 0; k < max_day; k ++) {
          var disabled = false;
          if(k === 0) {
            date = from_date
          }else{
            date = new Date(date.getTime() + (24 * 60 * 60 * 1000));
          }

          if(this.isDateBeforeToday(date)){
            disabled = true;
          }

          if(this.isDateToday(date)){
            disabled = true;
          }
          var is_active_day = has_active && this.isSameDate(center_date,date)
          // console.log((center_date == date))
          days.push(getDateInfo(date, is_active_day, disabled))
        }
        return days
      },
      selectTime(index) {
        if(!this.times[index].disabled){
          this.times.forEach( (t, i) => {
            if(i === index) {
              t.active = !t.active
              if(t.active) this.selected_time = t
            }else{
              t.active = false
            }
          });
        }
      },
      selectDate(index) {
        if(!this.days[index].disabled){
          this.days.forEach( (d, i) => {
            if(i === index) {
              d.active = !d.active
              if(d.active) this.selected_date = d
            }else{
              d.active = false
            }
          });
        }
      },
      arrowDay(type){
        var cur_days = this.days
        if(type === 'prev'){
          cur_days.pop() // remove last el
          cur_days.unshift(getNewDate(cur_days[0], type, this.selected_date)) // add last el
        }else {
          cur_days.shift() // remove first el
          cur_days.push(getNewDate(cur_days[cur_days.length - 1], type, this.selected_date)) // add first el
        }
      },
    }
  }
</script>