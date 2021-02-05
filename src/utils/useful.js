const DATES = ['sun','mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const DATES_FULL = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const getSubTitle = (sub_title) => {
  var arr = sub_title.split(" ")
  var title_head = arr[0]
  return title_head;
}
const isDateToday = (date) => {
  let today = new Date()
  return date.getDate() == today.getDate() &&
      date.getMonth() == today.getMonth() &&
      date.getFullYear() == today.getFullYear()
}
const isDateBeforeToday = (date) => {
  return new Date(date.toDateString()) < new Date(new Date().toDateString());
}
const getDateInfo = (d, active, disabled) => {
  var date = d.getDay(); // 0-6
  var day = d.getDate(); // 0-31
  // var month= d.getMonth(); // 0-11
  // var year=date.getFullYear(); // yyyy
  return {date: d, lbl_day: day, lbl_date: DATES[date], active, disabled }
}
const getNewDate = (obj_date, type, selected_date) => {
  var date, active = false, disabled = false
  if(type === 'prev'){
    date = new Date(obj_date.date.getTime() - (24 * 60 * 60 * 1000));
  }else{
    date = new Date(obj_date.date.getTime() + (24 * 60 * 60 * 1000));
  }
  if(isDateToday(date) || isDateBeforeToday(date)){
    disabled = true
  }
  if(date.getTime() == selected_date?.date.getTime()) {
    active = selected_date.active
    //disabled = selected_date.disabled
  }
  return getDateInfo(date, active, disabled)
}
const nth = function(d) {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}
const getStrDate = (d) => {
  var date = d.getDay(); // 0-6
  var day = d.getDate(); // 1-31
  var month= d.getMonth(); // 0-11
  return DATES_FULL[date] + ', ' + MONTHS[month] + ' ' + day + nth(day)
}

const wait = (ms) => {
  return (x) => {
      return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}

const validateAppointmentQuoteData = (storeData, type) => {
  let isValidAppointment = true
  let error = null

  /** store */
  if (!storeData.store) {
    isValidAppointment = false
    error = { message: 'Please select store location', redirect: 'store'}
    return { error, isValidAppointment }
  }

  /** service */
  if (!storeData.service) {
    isValidAppointment = false
    error = { message: 'Please select service', redirect: 'service'}
    return { error, isValidAppointment }
  } else {
    if (!storeData.service.service_alias || !storeData.service.sub_service || !Array.isArray(storeData.service.sub_service)) {
      isValidAppointment = false
      error = { message: 'Please select service', redirect: 'service'}
      return { error, isValidAppointment }
    } else {
      switch (storeData.service.service) {
        case 'automotive':
          if (!storeData.contact.year || !storeData.contact.make || !storeData.contact.model || !storeData.contact.door) {
              isValidAppointment = false
              error = { message: 'Please select year/marke/model/door', redirect: 'contact'}
              return { error, isValidAppointment }
          }
          break
        case 'residential':
          if (!storeData.contact.residential) {
            isValidAppointment = false
            error = { message: 'Please select residential type', redirect: 'contact'}
            return { error, isValidAppointment }
          }
          if (storeData.service.off_site) {
            if (!storeData.contact.address) {
              isValidAppointment = false
              error = { message: 'Please select offsite address', redirect: 'contact'}
              return { error, isValidAppointment }
            } else {
              if (!storeData.contact.address.street || !storeData.contact.address.city || !storeData.contact.address.state || !storeData.contact.address.zip) {
                isValidAppointment = false
                error = { message: 'Please select offsite address', redirect: 'contact'}
                return { error, isValidAppointment }
              }
            }
          }
          break
        case 'commercial':
          if (!storeData.contact.building) {
            isValidAppointment = false
            error = { message: 'Please select building type', redirect: 'contact'}
            return { error, isValidAppointment }
          }
          if (storeData.service.off_site) {
            if (!storeData.contact.address) {
              isValidAppointment = false
              error = { message: 'Please select offsite address', redirect: 'contact'}
              return { error, isValidAppointment }
            } else {
              if (!storeData.contact.address.street || !storeData.contact.address.city || !storeData.contact.address.state || !storeData.contact.address.zip) {
                isValidAppointment = false
                error = { message: 'Please select offsite address', redirect: 'contact'}
                return { error, isValidAppointment }
              }
            }
          }
          break
        case 'marine':
          if (!storeData.contact.vessel) {
            isValidAppointment = false
            error = { message: 'Please select vessel type', redirect: 'contact'}
            return { error, isValidAppointment }
          }
          if (storeData.service.off_site) {
            if (!storeData.contact.address) {
              isValidAppointment = false
              error = { message: 'Please select offsite address', redirect: 'contact'}
              return { error, isValidAppointment }
            } else {
              if (!storeData.contact.address.street || !storeData.contact.address.city || !storeData.contact.address.state || !storeData.contact.address.zip) {
                isValidAppointment = false
                error = { message: 'Please select offsite address', redirect: 'contact'}
                return { error, isValidAppointment }
              }
            }
          }
          break
        default:
          break
      }
    }
  }

  /** datetime */
  if (type === 'appointment') {
    if (!storeData.datetime) {
      isValidAppointment = false
      error = { message: 'Please select date and time', redirect: 'date'}
      return { error, isValidAppointment }
    } else {
      if (!storeData.datetime.time || !storeData.datetime.date) {
        isValidAppointment = false
        error = { message: 'Please select date and time', redirect: 'date'}
        return { error, isValidAppointment }
      }
    }
  }

  /** contact */
  console.log('_____________________')
  console.log(storeData.contact)
  if (!storeData.contact) {
    isValidAppointment = false
    error = { message: 'Please input contact information', redirect: 'contact'}
    return { error, isValidAppointment }
  } else {
    if (!storeData.contact.first_name || !storeData.contact.last_name || !storeData.contact.email || !storeData.contact.phone) {
      isValidAppointment = false
      error = { message: 'Please input contact information', redirect: 'contact'}
      return { error, isValidAppointment }
    }
  }

  return { error, isValidAppointment}
}

export { getSubTitle, getDateInfo, getNewDate, getStrDate, wait, validateAppointmentQuoteData, isDateToday }
