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
      <v-card class="mt-8 px-10 card_class mx-auto" width="100%">
        <v-form v-model="valid" @submit.prevent="submit">
          <v-row class="py-10">
            <v-col cols="12" class="text-center">
              <h1
                :class="[
                  $vuetify.breakpoint.mdAndUp ? 'font_30' : 'font_18',
                  'py-3',
                ]"
              >
                فرم درخواست نمایندگی تن تاک
              </h1>
            </v-col>

            <v-col cols="12" sm="3" class="py-0">
              <AmpInput
                rules="require"
                text="نام"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
                outlined
                v-model="form.first_name"
              />
            </v-col>

            <v-col cols="12" sm="3" class="py-0">
              <AmpInput
                rules="require"
                text="نام خانوادگی"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
                outlined
                v-model="form.last_name"
              />
            </v-col>

            <v-col cols="12" sm="3" class="py-0">
              <AmpSelect
                rules="require"
                :items="province_item"
                text="استان"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
                outlined
                v-model="province"
              />
            </v-col>

            <v-col cols="12" sm="3" class="py-0">
              <AmpSelect
                rules="require"
                :items="citis"
                text="شهر"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
                outlined
                v-model="form.country_division_id"
              />
            </v-col>

            <v-col cols="12" class="py-0">
              <amp-textarea
                :rows="2"
                rules="require"
                placeholder="آدرس پستی"
                text="آدرس فروشگاه"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
                outlined
                v-model="form.postal_address"
              />
            </v-col>

            <v-col cols="12" class="py-0">
              <h3
                :class="[
                  $vuetify.breakpoint.mdAndUp ? 'font_20' : 'font_12',
                  'my-3',
                ]"
              >
                استیجاری
              </h3>
            </v-col>

            <v-col cols="12" sm="3" class="py-0">
              <AmpSelect
                rules="require"
                :items="ownership_type_items"
                text="مالک"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
                outlined
                v-model="form.ownership_type"
              />
            </v-col>

            <v-col cols="12" sm="3" class="py-0">
              <AmpInput
                text="متراژ فروشگاه"
                rules="require,number"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
                outlined
                v-model="form.store_size"
              />
            </v-col>

            <v-col cols="12" sm="3" class="py-0">
              <AmpInput
                rules="require,phone"
                text="شماره تماس"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
                outlined
                v-model="form.phone_number"
              />
            </v-col>

            <v-col cols="12" sm="4" class="mr-auto d-flex">
              <AmpButton
                type="submit"
                color="orange"
                text="ارسال درخواست"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
                :width="$vuetify.breakpoint.smAndUp ? '75%' : '100%'"
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
        text: "فرم درخواست نمایندگی",
        disabled: true,
      },
    ],
    form: {},
    valid: false,
    loading: false,
    province: "",
    citis: [],
    province_item: [],
    ownership_type_items: [
      { text: "مالک", value: "owner" },
      { text: "اجاره", value: "leasehold" }
    ],
    form: {
      first_name: "",
      last_name: "",
      country_division_id: "",
      postal_address: "",
      ownership_type: "owner",
      store_size: "",
      status:'pending',
      phone_number: ""
    }
  }),
  beforeMount() {
    this.loadState();
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
      let url = '/shop/representation-request-form/insert';
      this.$reqApi(url, form)
        .then(response => {
          this.$toast.success('درخواست با موفقیت ارسال شد')
          this.emptyForm()
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
    emptyForm(){
      this.form.first_name = ''
      this.form.last_name = ''
      this.form.country_division_id = ''
      this.province = ''
      this.form.store_size = ''
      this.form.phone_number = ''
      this.form.postal_address = ''
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
.card_class {
  border-radius: 10px;
  background-color: #ffffff;
}
.white_sp {
  white-space: nowrap;
}
</style>
