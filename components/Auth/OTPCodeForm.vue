<template>
  <v-form v-model="valid" @submit.prevent="submit()">
    <v-col class="d-flex justify-center">
      <img src="/logo.png" width="150px" class="mt-2" />
    </v-col>
    <!-- <div class="mt-13 text-center" :class="{ 'font_22': $vuetify.breakpoint.mdAndUp, 'font_18': $vuetify.breakpoint.smAndDown }">تأیید شماره موبایل</div> -->
    <div
      class="mt-4 text-center"
      :class="{ font_14: $vuetify.breakpoint.smAndDown }"
    >
      لطفا کد 4 رقمی ارسال شده به شماره زیر را وارد نمایید.
    </div>

    <div class="greyText text-center my-6">
      <v-icon @click="closeDialog()" color="primary" class="">
        mdi-edit
      </v-icon>
      {{ value }}
    </div>
    <div class="d-flex justify-center">
      <div class="widthClass">
        <v-otp-input
          require
          length="4"
          type="number"
          color="primary"
          class="ltr-item"
          v-model="form.code"
        ></v-otp-input>
      </div>
    </div>

    <div class="d-flex justify-center">
      <amp-button
        :width="$vuetify.breakpoint.mdAndUp ? '21.4%' : '95%'"
        height="56px"
        text="تایید"
        type="submit"
        color="primary"
        :loading="loading"
        class="rounded-0 my-4"
        :disabled="!valid || loading"
      />
    </div>
    <div class="text-center font_12">
      <span
        v-if="timer.time"
        :class="{ font_14: $vuetify.breakpoint.smAndDown }"
      >
        امکان ارسال مجدد کد:
        {{ parseInt(timer.time / 60) }}:{{ parseInt(timer.time % 60) }}
      </span>
      <v-btn
        text
        x-small
        :loading="loading"
        style="letter-spacing: 0"
        @click="reSendcode()"
        v-else
        :class="['font_14' || $vuetify.breakpoint.smAndDown, 'primary--text']"
      >
        ارسال مجدد
      </v-btn>
      <!-- 
      <amp-button
        
        width="300"
        color=""
        text="ارسال مجدد"
        :loading="loading"
        class="rounded-lg"
        @click="reSendcode()"
      /> -->
    </div>
  </v-form>
</template>
<script>
export default {
  props: {
    value: {
      required: true,
    },
    reload_page: {
      default: true,
    },
    url_path: {
      default: "/",
    },
    auto_navigate: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    valid: false,
    loading: false,
    form: {
      code: "",
      username: "",
    },
    timer: {
      time: 0,
      interval: null,
    },
  }),
  mounted() {
    this.startTime();
  },
  beforeDestroy() {
    if (this.timer.interval) {
      clearInterval(this.timer.interval);
    }
  },
  methods: {
    closeDialog() {
      this.$emit("input", "");
    },
    startTime() {
      this.timer.time = 180;
      if (this.timer.interval) {
        clearInterval(this.timer.interval);
      }
      this.timer.interval = setInterval(() => {
        if (this.timer.time > 0) {
          this.timer.time -= 1;
        } else {
          clearInterval(this.timer.interval);
        }
      }, 1000);
    },
    submit() {
      this.loading = true;
      let form = this.$copyForm(this.form);
      form.username = this.value;
      form.code = this.$FarsiToEnglishNumber(form.code);
      this.$reqApi("/auth/otp/login", form)
        .then((response) => {
          this.$store.dispatch("auth/login", response).then((data) => { 
            this.loading = false;
            this.$emit("success", response);
            if (!this.auto_navigate) {
              return;
            }
            let url = this.url_path;
            if (response.user.is_new_user) {
              url = "/profile";
            } else {
              url = "/";
            }
            if (url) {
              this.$router.push(url);
            } else if (this.reload_page) {
              this.$reloadPage();
            }
          });
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    reSendcode() {
      this.loading = true;
      this.$reqApi("/auth/otp/send", { username: this.value })
        .then((response) => {
          this.startTime();
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
  },
};
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
