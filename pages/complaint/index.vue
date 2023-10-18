<template>
  <v-row no-gutters class="ma-6">
    <v-col cols="12" md="12" class="pa-0">
      <v-card class="border12" v-if="$vuetify.breakpoint.mdAndUp">
        <v-breadcrumbs :items="items">
          <template v-slot:divider>
            <v-icon>mdi-chevron-left</v-icon>
          </template>
        </v-breadcrumbs>
      </v-card>
      <v-card class="mt-8 px-10 card_class">
        <v-form v-model="valid" @submit.prevent="submit">
          <v-row class="py-10">
            <v-col cols="12" class="text-center">
              <h1
                :class="[$vuetify.breakpoint.mdAndUp ? 'font_30' : 'font_18']"
              >
                ثبت شکایت مشتری
              </h1>
            </v-col>

            <v-col cols="12">
              <h3
                :class="[
                  $vuetify.breakpoint.mdAndUp ? 'font_20' : 'font_12',
                  'pb-0',
                ]"
              >
                شکایات خود را برای ما ارسال کنید
              </h3>
            </v-col>

            <v-col cols="12" md="3" sm="6">
              <AmpInput
                rules="require"
                text="نام"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
                outlined
                v-model="form.name"
              />
            </v-col>

            <v-col cols="12" md="3" sm="6">
              <AmpInput
                rules="require"
                text="نام خانوادگی"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
                outlined
                v-model="form.family"
              />
            </v-col>

            <v-col cols="12" md="3" sm="6">
              <AmpInput
                rules="require,phone"
                text="شماره همراه"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
                outlined
                v-model="form.phone"
              />
            </v-col>

            <v-col cols="12" md="3" sm="6">
              <AmpInput
                rules="require"
                text="موضوع"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
                outlined
                v-model="form.issue"
              />
            </v-col>

            <v-col cols="12">
              <amp-textarea
                rules="require"
                :rows="2"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
                auto-grow
                placeholder="متن پیام"
                text="پیام"
                outlined
                v-model="form.message"
              />
            </v-col>
            <v-col cols="12" md="2" class="mr-auto ml-md-3">
              <AmpButton
                type="submit"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
                color="orange"
                text="ثبت"
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
        text: "ثبت شکایات",
        disabled: true,
        to: "",
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
.card_class {
  border-radius: 10px;
  background-color: #ffffff;
}
.white_sp {
  white-space: nowrap;
}
</style>
  