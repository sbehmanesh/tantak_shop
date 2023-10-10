<template>
  <v-row :class="$vuetify.breakpoint.mdAndUp ? 'ma-6' : 'mx-2'">
    <v-col cols="12">
      <v-card class="border12" v-if="$vuetify.breakpoint.mdAndUp">
        <v-breadcrumbs :items="items">
          <template v-slot:divider>
            <v-icon>mdi-chevron-left</v-icon>
          </template>
        </v-breadcrumbs>
      </v-card>
      <v-card class="elevation-0 pa-4 mt-8 border12">
        <v-row no-gutters class="justify-center align-center">
          <v-col cols="12" md="4" class="d-flex flex-column align-center mb-3">
            <img src="/logo.png" width="180px" />
            <!-- <v-icon class="mx-4" color="black" size="30">mdi-chevron-left</v-icon> -->
              <h1
                v-if="!code"
                class="mt-4 text-center font-weight-regular mr-4"
                :class="{
                  font_22: $vuetify.breakpoint.mdAndUp,
                  font_18: $vuetify.breakpoint.smAndDown,
                }"
              >
                پیگیری سفارشات
              </h1>
          </v-col>
          <v-col cols="12" md="8" :class="!code ? '' : ''">
            <v-form v-model="valid" @submit.prevent="submit()" class="primary-border pt-6 pb-2">
              <div
                class="d-flex justify-center mt-4"
                :class="{ font_14: $vuetify.breakpoint.smAndDown }"
              >
                برای پیگیری سفارش، کد سفارش خود را وارد کنید.
              </div>

              <div class="d-flex justify-center mt-6">
                <amp-input
                  color="primary"
                  is-number
                  :dense="false"
                  v-model="tracking_code"
                  parentClass=""
                  cClass="rounded-0"
                  rules="require"
                  placeholder="کد پیگیری سفارش"
                  class="opf-input center-placeholder"
                />
              </div>

              <div class="d-flex justify-center mb-5">
                <amp-button
                  :width="$vuetify.breakpoint.smAndDown ? '90%' : '300px'"
                  height="56px"
                  type="submit"
                  color="primary"
                  class="rounded-0"
                  :loading="loading"
                  text="بررسی وضعیت سفارش"
                  :disabled="!valid || loading"
                />
              </div>
            </v-form>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    code: {
      type: String,
      require: false,
    },
  },
  data() {
    return {
      tracking_code: "",
      loading: false,
      valid: false,
      items: [
        {
          text: "خانه",
          disabled: false,
          to: "/",
        },
        {
          text: "پیگیری سفارشات",
          disabled: true,
          to: "",
        },
      ],
    };
  },
  mounted() {
    if (this.code) {
      this.tracking_code = this.code;
    }
  },
  methods: {
    submit() {
      this.$router.push("/profile/orders/track/" + this.tracking_code);
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
.login-card-fixed {
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  max-width: 400px;
  width: 100%;
}
@media screen and (min-width: 600px) {
  .login-card-fixed {
    border: 1px solid lightgray !important;
  }
}
</style>
