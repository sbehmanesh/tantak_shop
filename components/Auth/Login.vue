<template>
  <v-form v-model="valid" @submit.prevent="submit()">
    <!-- <div class="mt-4" :class="{ 'font_14': $vuetify.breakpoint.smAndDown }">لطفا برای ادامه شماره موبایل خود را وارد نمایید.</div> -->

    <div :class="$vuetify.breakpoint.mdAndUp ? 'd-flex' : ''">
      <v-col cols="12" md="2" class="d-flex flex-column align-center justify-center">
        <img src="/logo.png" width="150px" />
        <h1
          class="mt-6 mr-3 text-center"
          :class="{
            font_18: $vuetify.breakpoint.mdAndUp,
            font_20: $vuetify.breakpoint.smAndDown,
          }"
        >
          ثبت‌ نام
        </h1>
      </v-col>

      <v-divider vertical class="mx-4"></v-divider>

      <v-col cols="12" md="7" class="d-flex flex-column align-center mt-6 pa-0">
        <v-row no-gutters>
          <v-col cols="12" sm="6" class="px-3">
            <AmpInput
              text="نام"
              outlined
              rules="require,fa_chart"
              v-model="form.name"
              :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
            />
          </v-col>

          <v-col cols="12" sm="6" class="px-3">
            <AmpInput
              text="نام خانوادگی"
              outlined
              rules="require,fa_chart"
              v-model="form.family"
              :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
            />
          </v-col>

          <v-col cols="12" sm="6" class="px-3">
            <AmpInput
              text="کد ملی"
              outlined
              isNumber
              rules="require,nationalCode"
              v-model="form.national_code"
              :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
            />
          </v-col>

          <v-col cols="12" sm="6" class="px-3">
            <AmpInput
              text="رمز عبور"
              outlined
              rules="require"
              v-model="form.password"
              :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
            />
          </v-col>
        </v-row>

        <amp-button
          :width="
            $vuetify.breakpoint.smAndUp
              ? $vuetify.breakpoint.mdAndUp
                ? '28%'
                : '40%'
              : '93.5%'
          "
          height="47px"
          type="submit"
          color="primary"
          cClass="rounded4 mt-12 mx-3"
          :loading="loading"
          text="ثبت‌ نام"
          :disabled="!valid || loading"
        />
      </v-col>

      <v-divider vertical class="mx-4"></v-divider>

      <v-col cols="12" md="2" class="d-flex flex-column align-center justify-center px-0">
        <div>
          <span class="font_14">حساب کاربری دارید؟</span>
          <span class="primary--text pointer" @click="$router.push('/auth/login')"
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
    title: "ورود",
    valid: false,
    loading: false,
    form: {
      name: "",
      family: "",
      password: "",
      national_code: "",
    },
  }),
  beforeCreate() {
    if (this.$store.state.auth.user) this.$router.push("/profile");
  },
  mounted() {
    this.$store.dispatch("setPageTitle", this.title);
  },
  methods: {
    submit() {
      this.loading = true;
      let username = this.$FarsiToEnglishNumber(this.name);
      let password = this.$FarsiToEnglishNumber(this.password);
      if (username[0] != 0) {
        username = `0${username}`;
      }
      this.$reqApi("/auth/login", { username, password })
        .then((response) => {
          this.$store.dispatch("auth/login", response).then((data) => {
            this.$router.push("/profile");
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
</style>
