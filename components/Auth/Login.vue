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

      <v-divider vertical class=""></v-divider>

      <v-col cols="12" md="6" class="d-flex flex-column align-center mt-6 pa-0">
        <v-row no-gutters>
          <v-col cols="12" sm="6" class="px-3">
            <AmpInput
              text="نام"
              outlined
              rules="require,fa_chart"
              v-model="name"
              :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
            />
          </v-col>

          <v-col cols="12" sm="6" class="px-3">
            <AmpInput
              text="نام خانوادگی"
              outlined
              rules="require,fa_chart"
              v-model="family"
              :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
            />
          </v-col>

          <v-col cols="12" sm="6" class="px-3">
            <AmpInput
              text="کد ملی"
              outlined
              rules="require,nationalCode"
              v-model="national_code"
              :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
            />
          </v-col>

          <v-col cols="12" sm="6" class="px-3">
            <AmpInput
              text="رمز عبور"
              outlined
              rules="require"
              v-model="password"
              :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
            />
          </v-col>
        </v-row>

        <!-- <amp-input
          color="primary"
          :dense="false"
          maxlength="11"
          v-model="national_code"
          parentClass=""
          cClass="rounded-0"
          rules="require,nationalCode"
          placeholder="کد ملی"
          class="opf-input center-placeholder rtl-item"
        />
        <amp-input
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
          color="primary"
          :dense="false"
          maxlength="11"
          v-model="password"
          parentClass=""
          cClass="rounded-0"
          rules="require,mobile"
          label="رمز عبور"
          class="opf-input center-placeholder ltr-item"
        /> -->
        <amp-button
          :width="$vuetify.breakpoint.mdAndUp ? '300' : '92%'"
          height="47px"
          type="submit"
          color="primary"
          cClass="rounded4 mt-12"
          :loading="loading"
          text="ثبت نام"
          :disabled="!valid || loading"
        />
      </v-col>

      <v-divider vertical class=""></v-divider>

      <v-col
        cols="12"
        md="3"
        class="d-flex flex-column align-center justify-center px-0"
      >
        <amp-button
          text="فرموشی رمز عبور"
          color="primary"
          :width="$vuetify.breakpoint.mdAndUp ? '200' : '92%'"
        />
        <amp-button
          text="ثبت نام"
          color="primary"
          :width="$vuetify.breakpoint.mdAndUp ? '200' : '92%'"
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
    name: "",
    family: "",
    password: "",
    national_code: "",
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
