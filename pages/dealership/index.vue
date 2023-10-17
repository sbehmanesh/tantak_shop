<template>
  <v-row no-gutters class="ma-6">
    <v-card width="100%" color="#f5f5f5">
      <v-card-title>
        <span> جستجو </span>
      </v-card-title>

      <v-row no-gutters>
        <v-col cols="3" class="px-6">
          <AmpSelect
            :items="[]"
            text="استان"
            placeholder="همه استان ها"
            outlined
            v-model="form.state"
          />
        </v-col>
        <v-col cols="3" class="px-6">
          <AmpSelect
            :items="[]"
            text="شهر"
            placeholder="شهر"
            outlined
            v-model="form.city"
          />
        </v-col>
        <v-col cols="3">
          <AmpInput text="کد نمایندگی" outlined v-model="form.code" />
        </v-col>
        <v-col cols="3">
          <AmpInput text="نام نمایندگی" outlined v-model="form.name" />
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
};
</script>

<style>
</style>