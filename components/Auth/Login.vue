<template>
    <v-form v-model="valid" @submit.prevent="submit()">
        <h1 
        class="mt-16 text-center" 
        :class="{ 'font_22': $vuetify.breakpoint.mdAndUp, 'font_18': $vuetify.breakpoint.smAndDown }">
            ورود
        </h1>
        <!-- <div class="mt-4" :class="{ 'font_14': $vuetify.breakpoint.smAndDown }">لطفا برای ادامه شماره موبایل خود را وارد نمایید.</div> -->
    
        <div class="d-flex justify-center mt-6">
            <amp-input
            is-number
            color="primary"
            :dense="false"
            maxlength="11"
            v-model="username"
            parentClass=""
            cClass="rounded-0"
            rules="require,mobile"
            text="شماره موبایل"
            class="opf-input center-placeholder ltr-item"
            />
        </div>

        <div class="d-flex justify-center">
            <amp-input
            color="primary"
            :dense="false"
            v-model="password"
            parentClass=""
            cClass="rounded-0"
            rules="require"
            text="رمز ورود"
            class="opf-input center-placeholder ltr-item"
            />
        </div>
  
        <div class="d-flex justify-center mb-5" >
            <amp-button
            :width="$vuetify.breakpoint.smAndDown ? '100%' : '300px'"
            height="56px"
            type="submit"
            color="primary"
            class="rounded-0 "
            :loading="loading"
            text="ورود"
            :disabled="!valid || loading"
            />
        </div>
        <div class="text-center font_12">
            <v-btn
            text
            x-small
            style="letter-spacing:0" 
            @click="$router.push('auth/signup')"
            :class="[ 'font_14'|| $vuetify.breakpoint.smAndDown , 'primary--text' ]"
        
            >
                رمز خود را فراموش کرده اید؟
            </v-btn>
            <v-btn
            text
            x-small
            style="letter-spacing:0" 
            @click="$router.push('auth/signup')"
            :class="[ 'font_14'|| $vuetify.breakpoint.smAndDown , 'primary--text' ]"
        
            >
                ثبت نام
            </v-btn>

        </div>

    </v-form>
  </template>
  
  <script>
  export default {
    data: () => ({
        title:"ورود",
        valid: false,
        loading: false,
        username: '',
        password: '',
    }),
    beforeCreate(){
        if(this.$store.state.auth.user) this.$router.push('/')
    },
    mounted(){
        this.$store.dispatch("setPageTitle",this.title)
    },
    methods: {
      submit() {
        this.loading = true
        let username = this.$FarsiToEnglishNumber(this.username)
        let password = this.$FarsiToEnglishNumber(this.password)
        if (username[0] != 0) {
          username = `0${username}`
        }
        this.$reqApi('/auth/login', { username , password })
          .then((response) => {
            this.$store.dispatch('auth/login', response).then((data) => {
                this.$router.push("/")
            })
          })
          .catch((error) => {
            this.loading = false
          })
      },
    },
  }
  </script>
  
  <style>
  .opf-input {
    width: 300px;
  }
  .ltr-item {
    direction: ltr;
  }
  /* .v-text-field--outlined >>> fieldset {
    border: 1px solid #8e005e;
  } */
  </style>
  