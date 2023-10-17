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
                v-model="form.first_name"
              />
            </v-col>

            <v-col cols="12">
              <AmpInput
                rules="require"
                text="نام خانوادگی"
                placeholder="نام خانوادگی"
                outlined
                v-model="form.last_name"
              />
            </v-col>

            <v-col cols="12" class="px-6">
              <AmpSelect
                rules="require"
                :items="province_item"
                text="استان"
                placeholder="انتخاب استان"
                outlined
                v-model="province"
              />
            </v-col>

            <v-col cols="12" class="px-6">
              <AmpSelect
                rules="require"
                :disabled="province_item.length == 0"
                :items="citis"
                text="شهر"
                placeholder="انتخاب شهر"
                outlined
                v-model="form.country_division_id"
              />
            </v-col>

            <v-col cols="12">
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

            <v-col cols="12" class="px-6">
              <AmpSelect
                rules="require"
                :items="ownership_type_items"
                text="مالک"
                placeholder="مالک"
                outlined
                v-model="form.owner"
              />
            </v-col>

            <v-col cols="12">
              <AmpInput
                text="متراژ فروشگاه"
                placeholder="متراژ فروشگاه"
                outlined
                v-model="form.store_size"
              />
            </v-col>

            <v-col cols="12">
              <AmpInput
                rules="require"
                text="شماره تماس"
                placeholder="شماره تماس"
                outlined
                v-model="form.phone_number"
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
        to: "/"
      },

      {
        text: "درباره ما",
        disabled: false,
        to: "/about-us"
      },
      {
        text: "نحوه ارسال",
        disabled: false,
        to: "/how-to-send"
      },
      {
        text: "حریم شخصی",
        disabled: false,
        to: "/privacy"
      },
      {
        text: "قوانین و مقررات",
        disabled: false,
        to: "/terms-and-conditions"
      },
      {
        text: "راهنمای سایز کفش",
        disabled: false,
        to: "/show-size-guide"
      },
      {
        text: "شرایط مرجوعی ",
        disabled: false,
        to: "/return-conditions"
      },
      {
        text: "خدمات پس از فروش",
        disabled: false,
        to: "/support"
      }
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
      status: ""
    }
  }),
  beforeMount() {
    this.loadState();
    this.ownership_type_items = [
      { text: "مالک", value: "owner" },
      { text: "اجاره", value: "leasehold" }
    ];
  },
  mounted() {
    if (this.modelId) {
      this.loadData();
    }
  },
  watch: {
    province() {
      if (this.province) {
        this.loadCitis(this.province);
      }
    }
  },
  methods: {
    submit() {
      let form = { ...this.form };
      this.loading = true;
      let url = "/shop/representation-request-form/insert";
      this.$reqApi(url, form)
        .then(response => {
          this.$toast.success("در خواست با موفقیت ثبت شد");
          this.redirectPage();
        })
        .catch(error => {
          this.loading = false;
        });
    },
    loadState() {
      return new Promise((response, rej) => {
        let filters = {
          level: {
            op: "=",
            value: "province"
          }
        };
        this.$reqApi("/country-division", {
          filters: filters,
          row_number: 3000000
        })
          .then(res => {
            let province = [];
            if (res.model.data) {
              res.model.data.map(x => {
                province.push({
                  text: x.name,
                  value: x.id
                });
              });
            }
            this.province_item = province;
            response(province);
          })
          .catch(err => {
            return err;
          });
      });
    },
    loadCitis(id) {
      this.citis = [];
      let filters = {
        parent_id: {
          op: "=",
          value: id
        }
      };
      if (id) {
        let data = [];
        this.$reqApi("/country-division", {
          filters: filters,
          row_number: 300000
        }).then(res => {
          data = res.model.data;
          data.filter(x => {
            this.citis.push({
              text: x.name,
              value: x.id
            });
          });
        });
      }
    }
  }
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
