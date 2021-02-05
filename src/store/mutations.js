// import Vue from 'vue';

//import * as tough from "../../node_modules/tough-cookie";
//export const {CookieJar, Cookie} = require('tough-cookie');
//export const newCookie = new Cookie({key:'test',value:'value'});
/*
export const cookieError = (err) => {
  if(err){
    console.log(err)
  }
}
export const newCookie = (index, string) => {
  var Cookie = require('tough-cookie');
  new Cookie({key: index, value: string});
}

 */
//const got = require('got');
//@TODO - Clean up the Cookies code below to be more functionally performant
const {CookieJar} = require('tough-cookie');
const util = require('util');
const tintworldCookie = async() => {
  const cookieJar = new CookieJar();
  const setCookie = util.promisify(cookieJar.setCookie.bind(cookieJar));
  await setCookie('foo=bar','http://10.1.10.50');
  //got.get('http://10.1.10.50',{cookieJar});
}
export const setCategories = (state, data) => {
    // console.log('setCategories', data)
    state.categories = data
}
export const setProducts = (state, data) => {
    // console.log('setProducts', data)
    state.products = data

}
export const setDeals = (state, data) => {
    state.deals = data
}
export const setAbouts = (state, data) => {
    state.abouts = data
}
export const setCarYears = (state, data) => {
    state.carYears = data
}
export const setRegions = (state, data) => {
    state.regions = data
}
export const setVehicles = (state, data) => {
 // var cookiejar = new tough.CookieJar();
  if(data){
    console.log(data[1]);
    //var CookieJar = require('tough-cookie');
    // console.log("save data ", JSON.stringify(data))
    localStorage.setItem('my_vehicles', JSON.stringify(data))
    //CookieJar.setCookie(newCookie('test','value'),'http://10.1.10.50/', cookieError);
    tintworldCookie();
    var future = new Date();
    future.setDate(future.getDate()+30);
    document.cookie="test=value;expires="+future;
  }else{
    // console.log("vehicle empty")
    localStorage.removeItem('my_vehicles')
  }
  state.myVehicles = data
}
export const setStore = (state, data) => {
  if(data){
    // console.log("save store data ", JSON.stringify(data))
    localStorage.setItem('my_store', JSON.stringify(data))
    var future = new Date();
    future.setDate(future.getDate()+30);
    var encString = data['location-id']
    document.cookie="userTwStore="+encString+"; expires="+future+"; path=/";
  }else{
    // console.log("store empty")
    localStorage.removeItem('my_store')
  }
  state.myStore = data
}
export const setCarMakes = (state, data) => {
    state.carMakes = data
}
/* appointment */
export const setApptModels = (state, data) => {
    state.appt_options_marine = data['marine-options']
    state.appt_options_residential = data['residential-options']
    state.appt_options_commercial = data['commercial-options']
}
export const setAppointment = (state, {data, type}) => {
  //@TODO - Extend this to track data points more effectively
  // console.log(data, type)
  if(type === 'store') state.appointment.store = data
  if(type === 'service') state.appointment.service = data
  if(type === 'datetime') state.appointment.datetime = data
  if(type === 'contact') state.appointment.contact = data
  if(type === 'confirm') state.appointment.confirm = data
  if(type === 'init') state.appointment = {
    store: null,
    service: null,
    datetime: null,
    contact: null,
  }
  // console.log("set my appointment")
  localStorage.setItem('my_appointment', JSON.stringify(state.appointment))
}
export const setMyAppointment = (state, data) => {
  // console.log(data)
  if(data.datetime){
    // 2020-10-23T15:46:55.773Z
    var str_date = data.datetime.date.date
    // console.log("datetime", data.datetime.date.date)
    var milisec = Date.parse(str_date)
    // console.log("milisec", milisec)
    data.datetime.date.date = new Date(milisec)
  }
  state.appointment = data
}
export const update_appointment = (state, type) => {
  // appt_store | appt_service | appt_date | appt_contact | appt_confirm | appt_book
  const list_appt_states = ['appt_store', 'appt_service', 'appt_date', 'appt_contact', 'appt_confirm', 'appt_book']
  var index = list_appt_states.findIndex( l => l === state.appt_cur_stage)
  if(type === 'next') {
    index ++
  }else{
    index --
    if(index < 0) index = 0
  }
  state.appt_cur_stage = list_appt_states[index]
}
export const edit_appointment = (state, stage) => {
  state.appt_cur_stage = stage
}
/* quote */
export const setQuoteModels = (state, data) => {
  state.appt_options_marine = data['marine-options']
  state.appt_options_residential = data['residential-options']
  state.appt_options_commercial = data['commercial-options']
}
export const setQuote = (state, {data, type}) => {
  // console.log(data, type)
  if(type === 'store') state.quote.store = data
  if(type === 'service') state.quote.service = data
  if(type === 'contact') state.quote.contact = data
  if(type === 'confirm') state.quote.confirm = data
  if(type === 'init') state.quote = {
    store: null,
    service: null,
    contact: null,
  }
  // console.log("set my quote")
  localStorage.setItem('my_quote', JSON.stringify(state.quote))
}
export const setMyQuote = (state, data) => {
// console.log(data)
  state.quote = data
}
export const update_quote = (state, type) => {
  // quote_store | quote_service | quote_date | quote_contact | quote_confirm | quote_book
  const list_quote_states = ['quote_store', 'quote_service', 'quote_contact', 'quote_confirm', 'quote_book']
  var index = list_quote_states.findIndex( l => l === state.quote_cur_stage)
  if(type === 'next') {
    index ++
  }else{
    index --
    if(index < 0) index = 0
  }
  state.quote_cur_stage = list_quote_states[index]
}
export const edit_quote = (state, stage) => {
  state.quote_cur_stage = stage
}
export const mobileSidebarToggle = (state) => {
  console.log("mobile menu hide")
  state.mobileMenuOpen1 = false
  state.selectedMenu1 = ''
  state.mobileMenuOpen2 = false
  state.selectedMenu2 = ''
  state.menu2Items = []
  state.menu3Items = []
}
export const desktopDropdownToggle = () => {
  console.log("mobile menu hide")
}
export const desktopMenuOpen = (state, menu_label) => {
  console.log(menu_label)
  state.mobileMenuOpen1 = !state.mobileMenuOpen1;
  state.selectedMenu1 = menu_label
  switch(menu_label) {
    case 'services':
      state.menu2Items = state.categories
      break;
    case 'products':
      state.menu2Items = state.products
      break;
    case 'deals':
      state.menu2Items = state.deals
      break;
    case 'abouts':
      state.menu2Items = state.abouts
      break;
    case 'help':
      state.menu2Items[1] = state.abouts[1]
      break;
    case 'resources':
      state.menu2Items = state.abouts[2]
      break;
    case 'news':
      state.menu2Items = state.abouts[3]
      break;
  }
}
export const singleTierOpen = (state, menu_label) => {
  console.log(menu_label)
  state.mobileMenuOpen1 = !state.mobileMenuOpen1;
  //state.selectedMenu1 = menu_label
  switch(menu_label) {
    case 'abouts':
      state.menu2Items = state.abouts
      break;
    case 'help':
      state.selectedMenu1 = 'Help Center';
      state.mobileMenuOpen1 = true;
      state.menu2Items = state.abouts[1].children
      break;
    case 'resources':
      state.selectedMenu1 = 'Resources';
      state.mobileMenuOpen1 = true;
      state.menu2Items = state.abouts[2].children
      break;
    case 'news':
      state.selectedMenu1 = 'News & media';
      state.mobileMenuOpen1 = true;
      state.menu2Items = state.abouts[3].children
      break;
  }
}
export const TOGGLE_MODAL = (state, type) => {
  if(type === 'appointment'){
    // console.log("cur modal state " + state.appointment_modal)
    state.appointment_modal = !state.appointment_modal
  }else if(type === 'quote'){
    state.quote_modal = !state.quote_modal
  }
}
export const MOBILE_TOGGLE_MENU2 = (state, sel_id) => {
  if(sel_id !== -1){
    const active_item = state.menu2Items[sel_id]
    if(active_item.children !== undefined) {
      state.mobileMenuOpen2 = !state.mobileMenuOpen2;
      state.selectedMenu2 = active_item.title ? active_item.title : ''
      state.menu3Items = active_item.children ? active_item.children : []
      state.selectedMenuAlias = active_item.alias ? active_item.alias : ''
    }else{
      // state.gotoLink(active_item.url)
      location.href = active_item.url
      return;
    }
  }else{
    state.mobileMenuOpen2 = !state.mobileMenuOpen2;
    state.selectedMenu2 = ''
    state.menu3Items = []
  }
}
