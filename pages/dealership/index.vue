<template>
  <v-row no-gutters class="ma-6">
    <v-card class="border12 col-12" v-if="$vuetify.breakpoint.mdAndUp">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-chevron-left</v-icon>
        </template>
      </v-breadcrumbs>
    </v-card>
    <v-card width="100%" class="mt-8 border12">
      <!-- <v-card-title>
        <span> جستجو </span>
      </v-card-title> -->

      <!-- <v-row no-gutters>
        <v-col cols="12" md="3" class="py-0 px-md-3">
          <AmpSelect
            :items="province_item"
            text="استان"
            outlined
            v-model="province"
          />
        </v-col>

        <v-col cols="12" md="3" class="py-0 px-md-3">
          <AmpSelect
            :disabled="province_item.length == 0"
            :items="citis"
            text="شهر"
            outlined
            v-model="form.country_division_id"
          />
        </v-col>
        <v-col cols="12" sm="6" md="3" class="px-3 px-md-0">
          <AmpInput
            text="کد نمایندگی"
            outlined
            rules="number"
            dir="ltr"
            v-model="form.code"
          />
        </v-col>
        <v-col cols="12" sm="6" md="3" class="px-3 px-md-0">
          <AmpInput text="نام نمایندگی" outlined v-model="form.name" />
        </v-col>
      </v-row>

      <v-row no-gutters class="justify-center pa-3 mb-4">
        <AmpButton
          icon="mdi-refresh"
          width="72"
          cClass="border4"
          @click="emptyForm()"
        />
        <AmpButton
          icon="mdi-magnify"
          width="72"
          cClass="border4 mr-3"
          @click="setFilter"
        />
      </v-row> -->
      <v-row>
        <v-col cols="12" md="12" class="px-8">
          <BaseTable
            :loading="loading"
            :items="items_table"
            :headers="headers"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
import BaseTable from "~/components/DataTable/BaseTableOffline";
export default {
  components: { BaseTable },
  data: () => ({
    items: [
      {
        text: "خانه",
        disabled: false,
        to: "/"
      },
      {
        text: "شعب و نمایندگی",
        disabled: true
      }
    ],
    province: "",
    loading: false,
    citis: [],
    province_item: [],
    form: {
      province: "",
      country_division_id: "",
      code: "",
      name: ""
    },
    headers: [],
    filters: {},
    items_table: []
  }),
  watch: {
    province() {
      if (this.province) {
        this.loadCitis(this.province);
      }
    }
  },
  beforeMount() {
    this.loadBranchs();
    this.headers = [
      {
        text: "شعبه/نمایندگی",
        value: "name",
        class: " d-block text-lg-right mt-4"
      },
      {
        text: "کد",
        value: "branch_code",
        class: " d-table-cell text-lg-right"
      },
      {
        text: "وضعیت",
        value: "status",
        class: " d-block text-lg-right mt-4"
      },
      {
        text: "آدرس",
        value: "address",
        class: " d-table-cell text-lg-right"
      }
    ];
  },
  methods: {
    // loadState() {
    //   return new Promise((response, rej) => {
    //     let filters = {
    //       level: {
    //         op: "=",
    //         value: "province"
    //       }
    //     };
    //     this.$reqApi("/country-division", {
    //       filters: filters,
    //       row_number: 3000000
    //     })
    //       .then(res => {
    //         let province = [];
    //         if (res.model.data) {
    //           res.model.data.map(x => {
    //             province.push({
    //               text: x.name,
    //               value: x.id
    //             });
    //           });
    //         }
    //         this.province_item = province;
    //         response(province);
    //       })
    //       .catch(err => {
    //         return err;
    //       });
    //   });
    // },
    // emptyForm() {
    //   this.form.country_division_id = "";
    //   this.province = "";
    //   this.form.code = "";
    //   this.form.name = "";
    //   this.setFilter();
    // },
    // setFilter() {
    //   let filter = {};
    //   filter = {
    //     country_division_id: {
    //       op: "LIKE",
    //       value: this.form.country_division_id
    //     },
    //     branch_code: {
    //       op: "LIKE",
    //       value: this.form.code
    //     },
    //     name: {
    //       op: "LIKE",
    //       value: this.form.name
    //     }
    //   };
    //   this.filters = filter;
    //   this.loadBranchs();
    // },
    // loadCitis(id) {
    //   this.citis = [];
    //   let filters = {
    //     parent_id: {
    //       op: "=",
    //       value: id
    //     }
    //   };
    //   if (id) {
    //     let data = [];
    //     this.$reqApi("/country-division", {
    //       filters: filters,
    //       row_number: 300000
    //     }).then(res => {
    //       data = res.model.data;
    //       data.filter(x => {
    //         this.citis.push({
    //           text: x.name,
    //           value: x.id
    //         });
    //       });
    //     });
    //   }
    // },
    loadBranchs() {
      this.loading = true;
      this.$reqApi("/shop/branch", { filter: this.filters })
        .then(res => {
          this.items_table = res.model.data.map((x, i) => ({
            ...x,
            index: i + 1,
            created_at: this.$toJalali(x.created_at),
            status : this.setstatus(x),
            name: x.name
          })).filter((y)=> y.status);
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          return err;
          this.loading = false;
          this.$toast.error(
            "در روند بارگزاری اطاعات مشکل پیش آمده لطفا دوباره امتحان کنید"
          );
        });
    },
    setstatus(data){
      console.log(data.status)
      if(data.status == 'active'){
        return 'فعال'
      }
      if(data.status == 'inactive'){
        return 'غیر فعال'
      }
      if(data.status == 'hidden'){
        return null
      }
    }
  }
};
</script>

<style></style>
