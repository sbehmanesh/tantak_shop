<template>
  <v-form v-model="valid" @submit.prevent="submit()">
    <!-- <div class="mt-4" :class="{ 'font_14': $vuetify.breakpoint.smAndDown }">لطفا برای ادامه شماره موبایل خود را وارد نمایید.</div> -->

    <div :class="$vuetify.breakpoint.mdAndUp ? 'd-flex' : ''">
      <v-col cols="12" md="6" class="d-flex flex-column align-center justify-center">
        <v-img src="/logo.png" width="170px" contain />
      </v-col>
      <v-col cols="12" md="4" class="text-center">
        <AmpInput
          text="شماره موبایل خود را وارد کنید"
          outlined
          isNumber
          height="47"
          maxlength="11"
          rules="require,mobile"
          :parentClass="$vuetify.breakpoint.mdAndUp ? 'w-300' : 'w-92'"
          v-model="username"
          :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
        />

        <amp-button
          height="47"
          block
          type="submit"
          color="primary"
          cClass="rounded-lg "
          :loading="loading"
          text="ثبت نام / ورود"
          :disabled="!valid || loading"
        />

        <!-- <amp-button
          :width="$vuetify.breakpoint.mdAndUp ? '300' : '98%'"
          height="52px"
          type="submit"
          color="primary"
          class="rounded-0"
          :loading="loading"
          text="ورود به حساب"
          :disabled="!valid || loading"
        /> -->
      </v-col>
      <v-divider vertical class="mx-2"></v-divider>

      <!-- <v-col
        cols="12"
        md="2"
        class="d-flex flex-column align-center justify-center mx-md-4 mt-md-14"
      > -->
      <!-- <amp-button
          text="فراموشی رمز عبور"
          color="primary"
          :width="$vuetify.breakpoint.mdAndUp ? '150' : '92%'"
          class="mx-3 mx-md-0"
        /> -->
      <!-- <amp-button
          text="ثبت نام"
          color="primary"
          :width="$vuetify.breakpoint.mdAndUp ? '150' : '92%'"
          @click="$router.push('/auth/sign-up')"
          class="mt-3 mx-3 mx-md-0"
        /> -->
      <!-- </v-col> -->
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
      this.loading = true;
      let username = this.$FarsiToEnglishNumber(this.username);
      if (username[0] != 0) {
        username = `0${username}`;
      }
      this.$reqApi("/auth/otp/send", { username: username, use_captcha: false })
        .then((response) => {
          this.$emit("input", this.username);
        })
        .catch((error) => {
          this.loading = false;
        });
    },
  },
};
</script>
