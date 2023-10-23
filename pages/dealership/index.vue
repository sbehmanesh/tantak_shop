<template>
  <v-row no-gutters class="ma-4">
    <v-card class="border12 col-12" v-if="$vuetify.breakpoint.mdAndUp">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-chevron-left</v-icon>
        </template>
      </v-breadcrumbs>
    </v-card>
    <v-card width="100%" class="mt-8 border10">
      <v-row no-gutters>
        <v-col cols="12" class="text-center pt-10">
          <h1 :class="[$vuetify.breakpoint.mdAndUp ? 'font_30' : 'font_18']">
            شعب و نمایندگی
          </h1>
        </v-col>

        <v-col cols="12">
          <h3
            :class="[
              $vuetify.breakpoint.mdAndUp ? 'font_20' : 'font_10',
              'pr-3',
            ]"
          >
            جستجو
          </h3>
        </v-col>

        <v-col cols="12" sm="3" class="px-3">
          <AmpSelect
            :items="[]"
            text="استان"
            :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
            outlined
            v-model="form.state"
          />
        </v-col>
        <v-col cols="12" sm="3" class="px-3">
          <AmpSelect
            :items="[]"
            text="شهر"
            :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
            outlined
            v-model="form.city"
          />
        </v-col>
        <v-col cols="12" sm="3" class="px-3">
          <AmpInput
            text="کد نمایندگی"
            :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
            outlined
            v-model="form.code"
          />
        </v-col>
        <v-col cols="12" sm="3" class="px-3">
          <AmpInput
            text="نام نمایندگی"
            :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
            outlined
            v-model="form.name"
          />
        </v-col>
      </v-row>

      <v-row no-gutters class="justify-center pa-3 mb-4">
        <AmpButton icon="mdi-refresh" width="72" cClass="border4" />
        <AmpButton icon="mdi-magnify" width="72" cClass="border4 mr-3" />
      </v-row>

      <BaseTable :headers="headers" url="" :row_click="false" />
    </v-card>
  </v-row>
</template>

<script>
import BaseTable from "~/components/DataTable/BaseTable.vue";
export default {
  components: { BaseTable },
  data: () => ({
    title: "شعب و نمایندگی",
    items: [
      {
        text: "خانه",
        disabled: false,
        to: "/",
      },
      {
        text: "شعب و نمایندگی",
        disabled: true,
      },
    ],
    form: {},
    headers: [],
  }),
  beforeMount() {
    this.headers = [
      { text: "ردیف", value: "id" },
      { text: "شعبه/نمایندگی", value: "" },
      { text: "کد", value: "" },
      { text: "وضعیت", value: "" },
      { text: "آدرس", value: "" },
      { text: "نقشه", value: "" },
    ];
  },
  mounted() {
    this.$store.dispatch("setPageTitle", this.title);
  },
};
</script>

<style></style>
