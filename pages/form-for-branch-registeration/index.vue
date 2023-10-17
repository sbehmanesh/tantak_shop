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
      <v-card
        class="mt-8 px-10 card_class mx-auto"
        :width="$vuetify.breakpoint.mdAndUp ? '50%' : '100%'"
      >
        <v-form v-model="valid" @submit.prevent="submit">
          <v-row class="py-10">
            <v-col cols="12" class="text-center">
              <h1 class="orange white--text border10 py-3 font_20">
                فرم درخواست نمایندگی تن تاک
              </h1>
            </v-col>

            <v-col cols="12">
              <AmpInput
                rules="require"
                text="نام"
                placeholder="نام"
                outlined
                v-model="form.name"
              />
            </v-col>

            <v-col cols="12">
              <AmpInput
                rules="require"
                text="نام خانوادگی"
                placeholder="نام خانوادگی"
                outlined
                v-model="form.family"
              />
            </v-col>

            <v-col cols="12" class="px-6">
              <AmpSelect
                rules="require"
                :items="[]"
                text="استان"
                placeholder="انتخاب استان"
                outlined
                v-model="form.state"
              />
            </v-col>

            <v-col cols="12" class="px-6">
              <AmpSelect
                rules="require"
                :items="[]"
                text="شهر"
                placeholder="انتخاب شهر"
                outlined
                v-model="form.city"
              />
            </v-col>

            <v-col cols="12">
              <amp-textarea
                rules="require"
                placeholder="آدرس پستی"
                text="آدرس فروشگاه"
                outlined
                v-model="form.address"
              />
            </v-col>

            <v-col cols="12">
              <h3>استیجاری</h3>
            </v-col>

            <v-col cols="12" class="px-6">
              <AmpSelect
                rules="require"
                :items="[]"
                text="مالک"
                placeholder="مالک"
                outlined
                v-model="form.owner"
              />
            </v-col>

            <v-col cols="12">
              <AmpInput
                rules="require"
                text="متراژ فروشگاه"
                placeholder="متراژ فروشگاه"
                outlined
                v-model="form.meterage"
              />
            </v-col>

            <v-col cols="12">
              <AmpInput
                rules="require"
                text="شماره تماس"
                placeholder="شماره تماس"
                outlined
                v-model="form.phone"
              />
            </v-col>

            <v-col cols="8" class="mx-auto">
              <AmpButton
                type="submit"
                color="orange"
                text="ارسال درخواست"
                width="100%"
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
  }),
  methods: {
    submit() {
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
  