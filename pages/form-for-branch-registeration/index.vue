<template>
  <v-row class="ma-6">
    <v-col cols="12" md="12">
      <v-card class="border12" v-if="$vuetify.breakpoint.mdAndUp">
        <v-breadcrumbs :items="items">
          <template v-slot:divider>
            <v-icon>mdi-chevron-left</v-icon>
          </template>
        </v-breadcrumbs>
      </v-card>
      <v-card class="mt-8 px-10 card_class mx-auto" width="100%">
        <v-form v-model="valid" @submit.prevent="submit">
          <v-row class="py-10">
            <v-col cols="12" class="text-center">
              <h1 class="py-3">فرم درخواست نمایندگی تن تاک</h1>
            </v-col>

            <v-col cols="12" md="6" class="pa-md-0">
              <AmpInput
                rules="require"
                text="نام"
                outlined
                v-model="form.first_name"
              />
            </v-col>

            <v-col cols="12" md="6" class="pa-md-0">
              <AmpInput
                rules="require"
                text="نام خانوادگی"
                outlined
                v-model="form.last_name"
              />
            </v-col>

            <v-col cols="12" md="6" class="py-0 px-md-3">
              <AmpSelect
                rules="require"
                :items="province_item"
                text="استان"
                outlined
                v-model="province"
              />
            </v-col>

            <v-col cols="12" md="6" class="py-0 px-md-3">
              <AmpSelect
                rules="require"
                :disabled="province_item.length == 0"
                :items="citis"
                text="شهر"
                outlined
                v-model="form.country_division_id"
              />
            </v-col>

            <v-col cols="12" class="py-0 px-3 px-md-0">
              <amp-textarea
                rules="require"
                placeholder="آدرس پستی"
                text="آدرس فروشگاه"
                outlined
                v-model="form.postal_address"
              />
            </v-col>

            <v-col cols="12">
              <h3>استیجاری</h3>
            </v-col>

            <v-col cols="12" md="6" class="py-0 px-md-3">
              <AmpSelect
                rules="require"
                :items="ownership_type_items"
                text="مالک"
                outlined
                v-model="form.owner"
              />
            </v-col>

            <v-col cols="12" md="6" class="py-0 px-3 px-md-0">
              <AmpInput
                text="متراژ فروشگاه"
                outlined
                v-model="form.store_size"
              />
            </v-col>

            <v-col cols="12" md="6" class="py-0 px-3 px-md-0">
              <AmpInput
                rules="require"
                text="شماره تماس"
                outlined
                v-model="form.phone_number"
              />
            </v-col>

            <v-col cols="12">
              <AmpButton
                type="submit"
                color="orange"
                text="ارسال درخواست"
                :width="$vuetify.breakpoint.mdAndUp ? '20%' : '100%'"
                :disabled="!valid"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import AmpTextarea from "~/components/Base/AmpTextarea.vue";
export default {
  components: { AmpTextarea },
  data: () => ({
    items: [
      {
        text: "خانه",
        disabled: false,
        to: "/",
      },

      {
        text: "درباره ما",
        disabled: false,
        to: "/about-us",
      },
      {
        text: "نحوه ارسال",
        disabled: false,
        to: "/how-to-send",
      },
      {
        text: "حریم شخصی",
        disabled: false,
        to: "/privacy",
      },
      {
        text: "قوانین و مقررات",
        disabled: false,
        to: "/terms-and-conditions",
      },
      {
        text: "راهنمای سایز کفش",
        disabled: false,
        to: "/show-size-guide",
      },
      {
        text: "شرایط مرجوعی ",
        disabled: false,
        to: "/return-conditions",
      },
      {
        text: "خدمات پس از فروش",
        disabled: false,
        to: "/support",
      },
    ],
    form: {},
    valid: false,
    loading: false,
    province: "",
    citis: [],
    province_item: [],
    ownership_type_items: [],
    form: {
      first_name: "",
      last_name: "",
      country_division_id: "",
      postal_address: "",
      ownership_type: "",
      store_size: "",
      phone_number: "",
      status: "",
    },
  }),
  methods: {
    submit() {
      // to do
    },
    loadState() {
      // to do
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 30px;
}
p {
  font-size: 15px;
}
.card_class {
  border-radius: 10px;
  background-color: #ffffff;
}
.white_sp {
  white-space: nowrap;
}
</style>
