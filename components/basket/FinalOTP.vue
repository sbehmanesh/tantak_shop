<template>
    <v-dialog width="650" persistent v-model="value">
      <v-card
        class="center-div-justify"
      >
      <v-form v-model="valid" @submit.prevent="submit()">
        <div class="ld-main_card rounded-xl pa-4" >
          <v-icon large @click="$emit('input',false)" color="beauty" class="float-left"> mdi-close </v-icon>

            <div class="mt-13 text-center" :class="{ 'font_14': $vuetify.breakpoint.smAndDown }">لطفا کد 4 رقمی ارسال شده را وارد نمایید.</div>
        
            <div class="greyText text-center my-6">
              <v-icon @click="closeDialog()" color="primary" class=""> mdi-edit </v-icon>
              {{ phone }}
            </div>
            <div class="d-flex justify-center">
              <div class="widthClass">
                <v-otp-input
                  require
                  :length="length"
                  type="number"
                  color="primary"
                  class="ltr-item"
                  v-model="form.code"
                  :disabled="loading"
                ></v-otp-input>
                <!-- <v-overlay absolute :value="loading">
                    <v-progress-circular
                    indeterminate
                    color="primary"
                    ></v-progress-circular>
                </v-overlay> -->
              </div>
            </div>
            
            <div class="d-flex justify-center">
            <amp-button
              width="100%"
              height="56px"
              text="تایید"
              type="submit"
              color="primary"
              :loading="loading"
              class="rounded-0 my-4"
              :disabled="!valid || loading || !isActive"
            />
          </div>

            <div class="text-center font_12">
              <span v-if="timer.time" :class="{ 'font_14': $vuetify.breakpoint.smAndDown }">
                امکان ارسال مجدد کد:
                {{ parseInt(timer.time / 60) }}:{{ parseInt(timer.time % 60) }}
              </span>
              <v-btn
              text
              x-small
              :loading="loading"
              style="letter-spacing:0" 
              @click="reSendcode()"
              v-else 
              :class="[ 'font_14'|| $vuetify.breakpoint.smAndDown , 'primary--text' ]"
        
              >
                ارسال مجدد
              </v-btn>
            </div>
        </div>
      </v-form>
      </v-card>
    </v-dialog>
  </template>
  <script>
  export default {
    props: {
      value: {
        required: true,
      },
      phone: {
        required: true,
      },
    },
    data: () => ({
      length: 4,
      valid:false,
      loading: false,
      form: {
        code: '',
        username: '',
      },
      timer: {
        time: 0,
        interval: null,
      },
    }),
    watch:{
      value(value){
        if(value){
          this.startTime()
          this.reSendcode()
        }
      }
    },
    mounted() {
      this.form.username = this.phone
    },
    beforeDestroy() {
      if (this.timer.interval) {
        clearInterval(this.timer.interval)
      }
    },
    computed: {
      isActive () {
        return this.form.code.length === this.length
      },
    },
    methods: {
      closeDialog() {
        this.$emit('input', '')
      },
      startTime() {
        this.timer.time = 180
        if (this.timer.interval) {
          clearInterval(this.timer.interval)
        }
        this.timer.interval = setInterval(() => {
          if (this.timer.time > 0) {
            this.timer.time -= 1
          } else {
            clearInterval(this.timer.interval)
          }
        }, 1000)
      },
      submit() {
        this.loading = true
        let form = this.$copyForm(this.form)
        form.username = this.phone
        form.code = this.$FarsiToEnglishNumber(form.code)
        this.$reqApi('/auth/otp/login', form)
          .then((response) => {
            this.$store.dispatch('auth/login', response).then((data) => {
              this.$emit("OTPSuccess")
            })
          })
          .catch((error) => {
            this.loading = false
            // this.$toast.error(error.message)
          })
      },
      reSendcode() {
        this.loading = true
        this.$reqApi('/auth/otp/send', { username: this.phone })
          .then((response) => {
            this.startTime()
            this.loading = false
          })
          .catch((error) => {
            this.loading = false
          })
      },
    },
  }
  </script>
  
  <style>
  .greyText {
    color: #616161;
  }
  .widthClass {
    max-width: 300px;
  }
  
  /* .theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
    > .v-input__control
    > .v-input__slot
    fieldset {
    color: #8e005e;
    color: #8e005e;
    border-radius: 10px;
  } */
  </style>
  