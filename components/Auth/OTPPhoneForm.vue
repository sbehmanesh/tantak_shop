<template>
  <v-form v-model="valid" @submit.prevent="submit()">
    <h1
      class="mt-16 text-center"
      :class="{
        font_22: $vuetify.breakpoint.mdAndUp,
        font_18: $vuetify.breakpoint.smAndDown,
      }"
    >
      ورود یا ثبت‌ نام
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
        placeholder="شماره موبایل خود را وارد کنید"
        class="opf-input center-placeholder ltr-item"
      />
    </div>

    <div class="mb-5 d-flex justify-center">
      <amp-button
        :width="$vuetify.breakpoint.mdAndUp ? '21.4%' : '97%'"
        height="56px"
        type="submit"
        color="primary"
        class="rounded-0"
        :loading="loading"
        text="ادامه"
        :disabled="!valid || loading"
      />
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
      this.$reqApi("/auth/otp/send", { username })
        .then((response) => {
          this.$emit("input", username);
        })
        .catch((error) => {
          this.loading = false;
        });
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
