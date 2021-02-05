<template>
  <div class="appt-contact">
    <div class="vehicle-info-area">
      <div class="lbl-information">{{ sel_label() }}:</div>
      <div class="vehicle-sel-area" v-if="service_type === 'automotive'">
        <div class="d-flex flex-1 flex-row">
          <div
            class="sel-area sel-year"
            :class="{ activated: activeErrorYear }"
          >
            <b-form-select
              class="custom-select-vehicle"
              @change="selYear"
              v-model="sel_year"
              :options="options_year"
            ></b-form-select>
          </div>
          <div
            class="sel-area sel-make"
            :class="{ activated: activeErrorMake }"
          >
            <b-form-select
              class="custom-select-vehicle"
              @change="selMake"
              v-model="sel_make"
              :options="options_make"
            ></b-form-select>
          </div>
        </div>
        <div class="d-flex flex-1 flex-row">
          <div
            class="sel-area sel-model"
            :class="{ activated: activeErrorModel }"
          >
            <b-form-select
              class="custom-select-vehicle"
              @change="changeSelect"
              v-model="sel_model"
              :options="options_model"
            ></b-form-select>
          </div>
          <div
            class="sel-area sel-door"
            :class="{ activated: activeErrorDoor }"
          >
            <b-form-select
              class="custom-select-vehicle"
              @change="changeSelect"
              v-model="sel_door"
              :options="options_door"
            ></b-form-select>
          </div>
        </div>
      </div>
      <div class="vehicle-sel-area" v-if="service_type === 'residential'">
        <div class="sel-area sel-residential" :class="{ activated: active }">
          <b-form-select
            class="custom-select-vehicle"
            @change="changeSelect"
            v-model="sel_residential"
            :options="options_residential"
          ></b-form-select>
        </div>
      </div>
      <div class="vehicle-sel-area" v-if="service_type === 'commercial'">
        <div class="sel-area sel-building" :class="{ activated: active }">
          <b-form-select
            class="custom-select-vehicle"
            @change="changeSelect"
            v-model="sel_building"
            :options="options_building"
          ></b-form-select>
        </div>
      </div>
      <div class="vehicle-sel-area" v-if="service_type === 'marine'">
        <div class="sel-area sel-vessel" :class="{ activated: active }">
          <b-form-select
            class="custom-select-vehicle"
            @change="changeSelect"
            v-model="sel_vessel"
            :options="options_vessel"
          ></b-form-select>
        </div>
      </div>
    </div>
    <div class="person-info-area">
      <div class="lbl-information">Your Information:</div>
      <b-form>
        <div class="person-info">
          <div class="flex-1 form-ctrl" :class="{ activated: firstNameError }">
            <b-input
              class="custom-input"
              placeholder="First Name*"
              v-model="form.first_name"
              @change="changeInput"
              type="text"
              required
            ></b-input>
          </div>
          <div class="flex-1 form-ctrl" :class="{ activated: lastNameError }">
            <b-input
              class="custom-input"
              placeholder="Last Name*"
              v-model="form.last_name"
              @change="changeInput"
              type="text"
              required
            ></b-input>
          </div>
        </div>
        <div class="person-info">
          <div class="flex-1 form-ctrl">
            <b-input
              class="custom-input"
              placeholder="Phone*"
              v-model="form.phone"
              @input="changeInput"
              type="text"
              required
              :state="isPhoneValid()"
            ></b-input>
          </div>
          <div class="flex-1 form-ctrl">
            <b-input
              class="custom-input"
              placeholder="Email*"
              v-model="form.email"
              @change="changeInput"
              type="email"
              :state="isEmailValid()"
              required
            ></b-input>
          </div>
        </div>
        <div class="person-info">
          <div class="flex-1 form-ctrl">
            <b-form-textarea
              id="textarea"
              v-model="form.description"
              @change="changeInput"
              class="custom-textarea"
              placeholder="Tell us about your project*"
            ></b-form-textarea>
          </div>
        </div>
        <div class="person-info">
          <div class="upload-files-area" v-if="form.photos.length !== 0">
            <div class="dropbox-cap2 text-bold text-italic">
              Uploaded Files:
            </div>
            <div class="upload-files">
              <div class="uploaded-img">
                <span><i class="fa fa-times"></i></span
                ><span class="dropbox-cap2 text-italic">my-ca-image01.jpg</span>
              </div>
              <div class="uploaded-img">
                <span><i class="fa fa-times"></i></span
                ><span class="dropbox-cap2 text-italic">my-ca-image02.jpg</span>
              </div>
              <div class="uploaded-img">
                <span><i class="fa fa-times"></i></span
                ><span class="dropbox-cap2 text-italic">my-ca-image03.jpg</span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="address-form"
          v-if="this.$store.state.appointment.service.off_site"
        >
          <div class="lbl-information">
            Off-Site Visit Location:
            <i class="fa fa-exclamation-circle" id="tooltip123"></i>
          </div>
          <b-tooltip ref="tooltip" target="tooltip123">
            We can come to your location to perform work and provide estimates.
            <br />
            Select this option if you require an off-site visit.
          </b-tooltip>
          <div class="person-info">
            <div class="flex-1 form-ctrl">
              <b-input
                class="custom-input"
                placeholder="Address Line 1*"
                v-model="address.street"
                @change="changeInput"
                type="text"
                required
              ></b-input>
            </div>
            <div class="flex-1 form-ctrl">
              <b-input
                class="custom-input"
                placeholder="Apt, Suite, Building (optional)"
                v-model="address.apt"
                type="text"
                required
              ></b-input>
            </div>
          </div>
          <div class="person-info">
            <div class="flex-1 form-ctrl">
              <b-input
                class="custom-input"
                placeholder="City*"
                v-model="address.city"
                @change="changeInput"
                type="text"
                required
              ></b-input>
            </div>
            <div class="flex-1 form-ctrl">
              <div class="person-info">
                <div class="flex-1 pd-lr5">
                  <b-form-select
                    class="custom-select-vehicle"
                    v-model="address.state"
                    @change="changeSelect"
                    :options="options_state"
                  ></b-form-select>
                </div>
                <div class="flex-1 pd-lr5">
                  <b-input
                    class="custom-input"
                    placeholder="Zip*"
                    v-model="address.zip"
                    @change="changeInput"
                    type="text"
                    required
                  ></b-input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-form>
    </div>
    <!-- <button id="show-modal" @click="showModal = true">Show Modal</button> -->
    <transition v-if="showModal" @close="showModal = false">
      <div class="c-modal-mask">
        <div class="c-modal-wrapper">
          <div class="c-modal-container">
            <div class="c-modal-header">
              <img src="./../../assets/img/upload.png" alt="upload image" />
              <div class="file-title">FILES UPLOADING</div>
              <div class="file-description">
                Window will close when upload is complete.
              </div>
            </div>
            <div class="c-modal-body">
              <div class="file-row d-flex flex-row">
                <img src="./../../assets/img/icon-file.png" alt="icon file" />
                <div class="file-process-area d-flex flex-column flex-1">
                  <div class="file-description">my-photo-name.jpg</div>
                  <div class="file-process">
                    <div
                      class="process active"
                      :style="{ width: fileProcess + '%' }"
                    ></div>
                  </div>
                  <div class="text-right complete">100%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { eventBus } from "./../../main";
import { upload } from "./../../utils/api";
import { wait } from "./../../utils/useful";
const default_opt_year = { value: null, text: "Year" };
const default_opt_make = { value: null, text: "Make" };
const default_opt_model = { value: null, text: "Model" };
const default_opt_residential = {
  value: null,
  text: "Select Residential Type",
};
const default_opt_building = { value: null, text: "Select Building Type" };
const default_opt_vessel = { value: null, text: "Select Vessel Type" };
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;
// eslint-disable-next-line no-useless-escape
const reg_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
// eslint-disable-next-line no-useless-escape
const reg_phone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

export default {
  data: () => {
    return {
      activeErrorDoor: false,
      activeErrorYear: false,
      activeErrorMake: false,
      activeErrorModel: false,
      firstNameError: false,
      lastNameError: false,
      active: true,
      showModal: false,
      fileProcess: 85,
      // service_type: 'automotive' | residential | commercial | marine
      sel_year: null,
      // options_year: [default_opt_year],
      sel_make: null,
      // options_make: [default_opt_make],
      sel_model: null,
      //options_model: [default_opt_model],
      sel_door: null,
      options_door: [
        { value: null, text: "# of Doors" },
        { value: "1", text: "1" },
        { value: "2", text: "2" },
        { value: "3", text: "3" },
        { value: "4", text: "4" },
        { value: "5", text: "5" },
        { value: "6", text: "6" },
      ],
      sel_residential: null,
      // options_residential: [default_opt_residential],
      sel_building: null,
      // options_building: [default_opt_building],
      sel_vessel: null,
      // options_vessel: [default_opt_vessel],
      form: {
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        description: "",
        photos: [],
      },
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "file",
      address: {
        street: "",
        apt: "",
        city: "",
        state: null,
        zip: "",
      },
    };
  },
  mounted() {
    this.reset();
    if (this.sel_year == null) {
      this.activeErrorYear = true;
    }
    if (this.sel_make == null) {
      this.activeErrorMake = true;
    }
    if (this.sel_model == null) {
      this.activeErrorModel = true;
    }
    if (this.sel_door == null) {
      this.activeErrorDoor = true;
    }

    if (this.$store.state.appointment.contact) {
      var load_contact = this.$store.state.appointment.contact;
      switch (this.service_type) {
        case "automotive":
          this.sel_year = load_contact.year;
          this.sel_make = load_contact.make;
          this.sel_model = load_contact.model;
          this.sel_door = load_contact.door;
          break;
        case "residential":
          this.sel_residential = load_contact.residential;
          break;
        case "commercial":
          this.sel_building = load_contact.building;
          break;
        case "marine":
          this.sel_vessel = load_contact.vessel;
          break;
      }
      this.form = {
        email: load_contact.email,
        first_name: load_contact.first_name,
        last_name: load_contact.last_name,
        phone: load_contact.phone,
        description: load_contact.description,
        photos: load_contact.photos,
      };
      if (load_contact.address) {
        this.address = load_contact.address;
      }
      if (!this.sel_residential) {
        this.active = true;
      } else {
        this.active = false;
        eventBus.$emit("isChangedApptValidation", true);
      }
      if (!this.sel_vessel) {
        this.active = true;
      } else {
        this.active = false;
        eventBus.$emit("isChangedApptValidation", true);
      }
      if (!this.sel_building) {
        this.active = true;
      } else {
        this.active = false;
        eventBus.$emit("isChangedApptValidation", true);
      }
    } else {
      eventBus.$emit("isChangedApptValidation", false);
    }
  },
  computed: {
    service_type() {
      return this.$store.state.appointment.service.service;
    },
    options_year() {
      var years = [];
      years.push(default_opt_year);
      if (this.$store.state.carYears && this.$store.state.carYears.length > 0) {
        for (var k of this.$store.state.carYears) {
          years.push({ value: k, text: k });
        }
      }
      return years;
    },
    options_make() {
      var makes = [];
      makes.push(default_opt_make);
      if (this.$store.state.carMakes && this.$store.state.carMakes.length > 0) {
        for (var k of this.$store.state.carMakes) {
          makes.push({ value: k.make, text: k.make });
        }
      }
      return makes;
    },
    options_model() {
      //@TODO - Check this area out, may need to make a secondary data variable for tracking the non-selected versions
      var models = [];
      if (!this.sel_make) {
        models.push({ value: null, text: "Model" });
        return models;
      }
      if (this.$store.state.carMakes && this.$store.state.carMakes.length > 0) {
        var findModels = this.$store.state.carMakes.find(
          (m) => m.make === this.sel_make
        ).models;
        for (var k of findModels) {
          models.push({ value: k, text: k });
        }
      }
      return models;
    },
    options_residential() {
      var data = [];
      data.push(default_opt_residential);
      if (
        this.$store.state.appt_options_residential &&
        this.$store.state.appt_options_residential.length > 0
      ) {
        for (var k of this.$store.state.appt_options_residential) {
          data.push({ value: k, text: k });
        }
      }
      return data;
    },
    options_building() {
      var data = [];
      data.push(default_opt_building);
      if (
        this.$store.state.appt_options_commercial &&
        this.$store.state.appt_options_commercial.length > 0
      ) {
        for (var k of this.$store.state.appt_options_commercial) {
          data.push({ value: k, text: k });
        }
      }
      return data;
    },
    options_vessel() {
      var data = [];
      data.push(default_opt_vessel);
      if (
        this.$store.state.appt_options_marine &&
        this.$store.state.appt_options_marine.length > 0
      ) {
        for (var k of this.$store.state.appt_options_marine) {
          data.push({ value: k, text: k });
        }
      }
      return data;
    },
    options_state() {
      var data = [];
      data.push({ value: null, text: "State*" });
      if (this.$store.state.regions && this.$store.state.regions.length > 0) {
        for (var k of this.$store.state.regions) {
          // console.log(k)
          data.push({ value: k.region_code, text: k.region_code });
        }
      }
      return data;
    },
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
  },
  methods: {
    validation() {
      var error = false;
      var param = {};
      if (this.sel_building == null) {
        this.active = true;
      } else {
        this.active = false;
      }
      if (this.sel_model == null) {
        this.activeErrorModel = true;
      } else {
        this.activeErrorModel = false;
      }
      if (this.sel_door == null && this.sel_building == null) {
        this.activeErrorDoor = true;
      } else {
        this.activeErrorDoor = false;
      }
      // console.log(this.service_type)
      switch (this.service_type) {
        case "automotive":
          if (
            this.sel_year &&
            this.sel_make &&
            this.sel_model &&
            this.sel_door
          ) {
            error = false;
            param.year = this.sel_year;
            param.make = this.sel_make;
            param.model = this.sel_model;
            param.door = this.sel_door;
          } else {
            error = true;
          }
          break;
        case "residential":
          if (this.sel_residential) {
            error = false;
            this.active = false;
            param.residential = this.sel_residential;
          } else {
            this.active = true;
            error = true;
          }
          break;
        case "commercial":
          if (this.sel_building) {
            this.active = false;
            error = false;
            this.active = false;
            param.building = this.sel_building;
          } else {
            this.active = true;
            error = true;
          }
          break;
        case "marine":
          if (this.sel_vessel) {
            this.active = false;
            error = false;
            param.vessel = this.sel_vessel;
          } else {
            this.active = true;
            error = true;
          }
          break;
      }
      // form validation
      if (this.form.first_name !== "") {
        this.firstNameError = false;
        if (this.form.last_name !== "") {
          this.lastNameError = false;
          if (
            !error &&
            this.form.email !== "" &&
            this.form.first_name !== "" &&
            this.form.last_name !== "" &&
            this.form.phone !== "" &&
            this.form.description !== ""
          ) {
            this.firstNameError == false;
            error = false;
            param.email = this.form.email;
            param.first_name = this.form.first_name;
            param.last_name = this.form.last_name;
            param.phone = this.form.phone;
            param.description = this.form.description;
            param.photos = this.form.photos;
            if (!this.isEmailValid() || !this.isPhoneValid()) {
              error = true;
            }
          } else {
            error = true;
          }
          if (!error && this.$store.state.appointment.service.off_site) {
            if (
              this.address.street !== "" &&
              this.address.city !== "" &&
              this.address.state &&
              this.address.zip !== ""
            ) {
              error = false;
              param.address = this.address;
            } else {
              error = true;
            }
          }
          if (!error) {
            eventBus.$emit("isChangedApptValidation", true);
            this.$store.commit("setAppointment", {
              type: "contact",
              data: param,
            });
          } else {
            eventBus.$emit("isChangedApptValidation", false);
          }
        } else {
          this.lastNameError = true;
        }
      } else {
        this.firstNameError = true;
      }
    },
    isEmailValid() {
      return this.form.email == ""
        ? false
        : reg_email.test(this.form.email)
        ? true
        : false;
    },
    isPhoneValid() {
      return this.form.phone == ""
        ? false
        : reg_phone.test(this.form.phone)
        ? true
        : false;
    },
    changeInput() {
      this.validation();
    },
    changeSelect() {
      this.validation();
    },
    sel_label() {
      let lbl = "Vehicle Information";
      switch (this.service_type) {
        case "automotive":
          lbl = "Vehicle Information";
          break;
        case "residential":
          lbl = "Residential Type";
          break;
        case "commercial":
          lbl = "Building Type";
          break;
        case "marine":
          lbl = "Vessel Information";
          break;
      }
      return lbl;
    },
    selYear(value) {
      if (this.sel_year == null) {
        this.activeErrorYear = true;
      } else {
        this.activeErrorYear = false;
      }
      // console.log("sel year ", value)
      this.sel_make = null;
      this.sel_model = null;
      if (!value) return;
      this.$store.dispatch("loadCarMakes", value);
    },
    selMake(value) {
      if (this.sel_make == null) {
        this.activeErrorMake = true;
      } else {
        this.activeErrorMake = false;
      }
      //this.sel_model = null
      if (!value) return;
      var models = [];
      models.push(default_opt_model);
      if (this.$store.state.carMakes && this.$store.state.carMakes.length > 0) {
        var findModels = this.$store.state.carMakes.find(
          (m) => m.make === this.sel_make
        ).models;
        for (var k of findModels) {
          models.push({ value: k, text: k });
        }
      }
      this.options_model = models;
    },
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;
      upload(formData)
        .then(wait(1500)) // DEV ONLY: wait for 1.5s
        .then((x) => {
          this.uploadedFiles = [].concat(x);
          this.currentStatus = STATUS_SUCCESS;
        })
        .catch((err) => {
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();
      if (!fileList.length) return;
      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });
      // save it
      this.save(formData);
    },
  },
};
</script>
