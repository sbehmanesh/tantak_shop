<template>
  <v-container fluid>
    <!-- دکمه افزودن آدرس -->
    <v-col cols="12" class="text-start">
      <v-btn @click="dialog = true" color="primary" dark> ثبت آدرس جدید </v-btn>
    </v-col>

    <v-alert
      v-if="error"
      type="error"
      dense
      outlined
      class="my-3"
      transition="scale-transition"
    >
      {{ error }}
    </v-alert>

    <v-row v-if="loading" dense>
      <v-col cols="12" v-for="n in 3" :key="n">
        <v-skeleton-loader type="card" class="rounded-lg my-3" elevation="1" />
      </v-col>
    </v-row>

    <v-row v-else dense>
      <v-col
        class="my-3"
        v-for="(address, index) in addresses"
        :key="address.id"
        cols="12"
      >
        <v-card class="pa-3 rounded-lg elevation-1" outlined>
          <v-row class="align-center pa-3">
            <v-col cols="12" md="8">
              <span>{{ index + 1 }} - {{ address.tipax_city || setname(address) }} </span>
              <div>
                <v-icon small color="primary" class="mr-1">mdi-mailbox</v-icon>
                <small>کد پستی:</small> {{ address.postal_code }}
              </div>

              <div class="grey--text">
                <v-icon small color="primary" class="mr-1">mdi-home</v-icon>
                <small>آدرس: {{ address.address }}</small>
              </div>
            </v-col>

            <v-spacer></v-spacer>

            <v-btn
              class="ma-1 ml-4"
              outlined
              color="error"
              text
              @click="deleteAddress(address.id)"
            >
              حذف
            </v-btn>
          </v-row>
        </v-card>
      </v-col>

      <v-col v-if="!addresses.length && !loading" cols="12" class="text-center">
        <v-alert type="info" outlined> هیچ آدرسی ثبت نشده است. </v-alert>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" persistent max-width="420">
      <v-card class="pa-5">
        <v-form v-model="valid">
          <v-col cols="12">
            <AmpSelect
              rules="require"
              :items="this.$store.state.setting.city_tibax"
              text="شهر"
              outlined
              v-model="form.country_division_id"
            />
            <amp-input
              is-number
              v-model="form.postal_code"
              rules="require,postCode"
              text="کد پستی"
              outlined
              label="کد پستی"
            ></amp-input>
            <amp-textarea :rows="2" text="آدرس دقیق" v-model="form.address" />
          </v-col>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="px-8"
              color="green darken-1"
              :disabled="!valid"
              outlined
              @click="submit"
            >
              ثبت
            </v-btn>
            <v-btn color="red" outlined @click="dialog = false"> انصراف </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  layout: "profile",
  data() {
    return {
      title: "آدرس‌های من",
      loading: false,
      valid: true,
      dialog: false,
      error: null,
      province: "",
      items: [],
      addresses: [],
      province_item: [],
      city_items: [],
      citis: [],
      form: {
        user_id: "",
        postal_code: "",
        address: "",

        country_division_id: null,
      },
    };
  },

  beforeMount() {
    this.loading = true;
    this.listAddress();
  },

  watch: {
    province() {
      if (this.province) this.loadCitis(this.province);
    },
  },

  methods: {
    listAddress() {
      this.loading = true;
      this.error = null;
      this.$reqApi("address")
        .then((res) => {
          this.addresses = res.model.data || [];
          this.loading = false;
        })
        .catch(() => {
          this.error = "خطا در دریافت آدرس‌ها، لطفاً دوباره تلاش کنید.";
          this.loading = false;
        });
    },

    loadCitis(id) {
      if (!id) return;
      this.citis = [];
      let filters = { parent_id: { op: "=", value: id } };
      this.$reqApi("/shop/country-division", { filters, row_number: 300000 })
        .then((res) => {
          this.citis = (res.model.data || []).map((x) => ({
            text: x?.name,
            value: x?.id,
          }));
        })
        .catch(() => {
          this.error = "خطا در بارگذاری شهرها";
        });
    },

    formatDate(date) {
      const d = new Date(date);
      return d.toLocaleDateString("fa-IR");
    },

    submit() {
      this.error = null;
      const form = { ...this.form };
      form.user_id = this.$store.state.auth.user.id;
      this.loading = true;
      this.$reqApi("/address/insert", form)
        .then(() => {
          this.listAddress();
          this.dialog = false;
          this.$toast.success("آدرس با موفقیت ثبت شد");
        })
        .catch(() => {
          this.error = "ثبت آدرس با خطا مواجه شد.";
        })
        .finally(() => {
          this.loading = false;
        });
    },

    deleteAddress(id) {
      this.error = null;
      this.loading = true;
      this.$reqApi("/address/delete", { id })
        .then(() => {
          this.listAddress();
          this.$toast.success("با موفقیت حذف شد");
        })
        .catch(() => {
          this.error = "حذف آدرس با خطا مواجه شد.";
        })
        .finally(() => {
          this.loading = false;
        });
    },
    setname(address) {
      let find = this.$store.state.setting.city_tibax.find(
        (x) => x.value == address.country_division_id
      );
      if (Boolean(find)) {
        return find.text;
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  transition: box-shadow 0.3s ease;
}
.v-card:hover {
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
}
</style>
