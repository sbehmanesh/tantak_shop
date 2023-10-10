<template>
  <v-form v-model="valid" @submit.prevent="submit()">
    <!-- <div class="mt-4" :class="{ 'font_14': $vuetify.breakpoint.smAndDown }">لطفا برای ادامه شماره موبایل خود را وارد نمایید.</div> -->

    <div :class="$vuetify.breakpoint.mdAndUp ? 'd-flex' : ''">
      <v-col
        cols="12"
        md="3"
        class="d-flex flex-column align-center justify-center"
      >
        <img src="/logo.png" width="200px" />
        <h1
          class="mt-6 mr-3 text-center"
          :class="{
            font_22: $vuetify.breakpoint.mdAndUp,
            font_18: $vuetify.breakpoint.smAndDown,
          }"
        >
          ثبت‌ نام
        </h1>
      </v-col>
      <v-divider vertical class="mx-2"></v-divider>
      <v-col cols="12" md="6" class="d-flex flex-column align-center mt-6">
        <amp-input
        height="52"
          is-number
          color="primary"
          :dense="false"
          maxlength="11"
          v-model="username"
          parentClass=""
          cClass="rounded-0"
          rules="require,mobile"
          placeholder="شماره موبایل خود را وارد کنید"
          class="opf-input center-placeholder ltr-item"
        />
        <amp-button
          :width="$vuetify.breakpoint.mdAndUp ? '300' : '98%'"
          height="52px"
          type="submit"
          color="primary"
          class="rounded-0"
          :loading="loading"
          text="عضویت"
          :disabled="!valid || loading"
        />
      </v-col>
      <v-divider vertical class="mx-2"></v-divider>

      <v-col
        cols="12"
        md="3"
        class="d-flex flex-column align-center justify-center"
      >
        <div>
          حساب کاربری دارید؟
          <span class="primary--text pointer" @click="$router.push('/auth')"
            >وارد شوید</span
          >
        </div>
      </v-col>
    </div>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    loading: false,
    username: "",
  }),
  methods: {
    submit() {
      // this.loading = true;
      // let username = this.$FarsiToEnglishNumber(this.username);
      // if (username[0] != 0) {
      //   username = `0${username}`;
      // }
      // this.$reqApi("/auth/otp/send", { username })
      //   .then((response) => {
          this.$emit("input", this.username);
      //   })
      //   .catch((error) => {
      //     this.loading = false;
      //   });
    },
  },
};
</script>

<style>
.opf-input {
  width: 100%;
}
.ltr-item {
  direction: ltr;
}
/* .v-text-field--outlined >>> fieldset {
  border: 1px solid #8e005e;
} */
</style>
