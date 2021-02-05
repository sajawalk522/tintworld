import * as axios from 'axios';
import { BASE_URL } from './constants'

function upload(formData) {
    const url = `${BASE_URL}/api/upload-photos`;
    // const url = `${BASE_URL}/api/upload-photos/quote`;
    // const url = `${BASE_URL}/api/quote`;
    return axios.post(url, formData)
        // get data
        .then(x => x.data)
        // add url field
        .then(x => x.map(img => Object.assign({},img, { url: `${BASE_URL}/${img.fileInfo.replace('/var/www/tintworld/', '')}` })));
}

function book(category, data) {
    const url = `${BASE_URL}/api/quote`;

    /*
    var data = {}
    if(category === 'quote') {
        var json_quote = localStorage.getItem('my_quote')
        if(json_quote) {
            //@TODO - Field Check Validation Here Instead?
            data = JSON.parse(json_quote)
        }
    }else{ // appointment
        var json_appt = localStorage.getItem('my_appointment')
        if(json_appt) {
            //@TODO - Field Check Validation Here Instead?
            data = JSON.parse(json_appt)
        }
    }
    */
    let formData = new FormData();
    // append the files to FormData
    formData.append('formType', category);
    //@TODO - Need to add FCID into /geolocate/ data payload, and pull that value vs. random ID value
    formData.append('storeID', data.store['location-id']);
    formData.append('firstName', data.contact.first_name);
    formData.append('lastName', data.contact.last_name);
    formData.append('emailAddress', data.contact.email);
    formData.append('phoneNumber', data.contact.phone);
    if (data.contact.photos) {
      formData.append('photos', data.contact.photos);
    }

    if (data.service.service === 'automotive') {
      formData.append('vehicleYear', data.contact.year);
      formData.append('vehicleMake', data.contact.make);
      formData.append('vehicleModel', data.contact.model);
      formData.append('vehicleDoors', data.contact.door || '');
    } else if (data.service.service === 'residential') {
      formData.append('residentialType', data.contact.residential);
    } else if (data.service.service === 'commercial') {
      formData.append('buildingType', data.contact.building);
    } else if (data.service.service === 'marine') {
      formData.append('vesselType', data.contact.vessel || '');
    }

    if (data.contact.address) {
      formData.append('offsiteLocation', JSON.stringify(data.contact.address))
    }
    formData.append('department', '');
    formData.append('services', data.service.service_alias);
    formData.append('subService', data.service.sub_service);
    formData.append('projectNotes', data.contact.description);
    formData.append('campaign', '');
    if(category === 'appointment') {
        var appointmentData = {
            'timeSelect': data.datetime.time.label,
            'dateSelect': data.datetime.date.lbl_date,
            'dateText': data.datetime.date.date
        };
        formData.append('appointmentData',JSON.stringify(appointmentData));
    }
    // save it
    return axios.post(url, formData)
        // get data
        .then(x => x).catch(err => err);
}

export { upload, book }
