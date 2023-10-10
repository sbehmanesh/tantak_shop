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
          ورود یا ثبت‌ نام
        </h1>
      </v-col>
      <v-divider vertical class="mx-2"></v-divider>
      <v-col cols="12" md="6" class="d-flex flex-column align-center mt-6">
        <!-- <amp-input
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
      /> -->
        <amp-input
          is-number
          color="primary"
          :dense="false"
          maxlength="11"
          v-model="username"
          parentClass=""
          cClass="rounded-0"
          rules="require,mobile"
          label="نام کاربری"
          class="opf-input center-placeholder ltr-item"
        />
        <amp-input
          is-number
          color="primary"
          :dense="false"
          maxlength="11"
          v-model="username"
          parentClass=""
          cClass="rounded-0"
          rules="require,mobile"
          label="رمز عبور"
          class="opf-input center-placeholder ltr-item"
        />
        <amp-button
          :width="$vuetify.breakpoint.mdAndUp ? '300' : '97%'"
          height="56px"
          type="submit"
          color="primary"
          class="rounded-0"
          :loading="loading"
          text="ورود به حساب"
          :disabled="!valid || loading"
        />
      </v-col>
      <v-divider vertical class="mx-2"></v-divider>

      <v-col
        cols="12"
        md="3"
        class="d-flex flex-column align-center justify-center"
      >
        <amp-button
          text="فرموشی رمز عبور"
          color="primary"
          :width="$vuetify.breakpoint.mdAndUp ? '200' : '97%'"
        />
        <amp-button
          text="ثبت نام"
          color="primary"
          :width="$vuetify.breakpoint.mdAndUp ? '200' : '97%'"
          @click="$router.push('/auth/signup')"
          class="mt-3"
        />
      </v-col>
    </div>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    title: "ورود",
    valid: false,
    loading: false,
    username: "",
    password: "",
  }),
  beforeCreate() {
    if (this.$store.state.auth.user) this.$router.push("/");
  },
  mounted() {
    this.$store.dispatch("setPageTitle", this.title);
  },
  methods: {
    submit() {
      this.loading = true;
      let username = this.$FarsiToEnglishNumber(this.username);
      let password = this.$FarsiToEnglishNumber(this.password);
      if (username[0] != 0) {
        username = `0${username}`;
      }
      this.$reqApi("/auth/login", { username, password })
        .then((response) => {
          this.$store.dispatch("auth/login", response).then((data) => {
            this.$router.push("/");
          });
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
  width: 300px;
}
.ltr-item {
  direction: ltr;
}
/* .v-text-field--outlined >>> fieldset {
    border: 1px solid #8e005e;
  } */
</style>
