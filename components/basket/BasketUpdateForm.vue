<template>
  <v-dialog
    v-model="value"
    persistent
    :fullscreen="$vuetify.breakpoint.smAndDown"
    :hide-overlay="$vuetify.breakpoint.smAndDown"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-form v-model="valid" @submit.prevent="submit">
        <v-row no-gutters class="align-center justify-center">
          <span class="font_20 pt-8">مشخصات گیرنده</span>
        </v-row>
        <v-row no-gutters class="pa-3 pa-md-6" style="height: 100%">
          <v-col class="col-12 col-md-4">
            <amp-input
              v-model="form.first_name"
              rules="require"
              text="نام و نام خانوادگی"
              outlined
              label="نام و نام خانوادگی"
            >
            </amp-input>
          </v-col>
          <!-- <v-col class="col-12 col-md-4">
                        <amp-input 
                        v-model="form.last_name"
                        rules="require"  
                        text="نام خانوادگی" 
                        outlined 
                        label="نام خانوادگی"
                        >
                        </amp-input>
                    </v-col> -->
          <v-col class="col-12 col-md-4">
            <amp-input
              is-number
              v-model="form.phone"
              rules="require,mobile"
              text="شماره موبایل"
              outlined
              label="شماره موبایل"
            >
            </amp-input>
          </v-col>
          <v-col class="col-12 col-md-4">
            <amp-input
              v-model="form.email"
              rules="email"
              text="پست الکترونیکی"
              outlined
              label="پست الکترونیکی"
            >
            </amp-input>
          </v-col>
          <v-col class="col-12 col-md-4">
            <CountryDivisionSelectInput
              v-model="form.country_division_id"
              text="شهر"
              class="px-md-3"
            />
          </v-col>
          <v-col class="col-12 col-md-4">
            <amp-input
              is-number
              v-model="form.postal_code"
              rules="require,postCode"
              text="کد پستی"
              outlined
              label="کد پستی"
            >
            </amp-input>
          </v-col>
          <v-col class="col-12 col-md-4">
            <amp-textarea
              v-model="form.address"
              rules="require"
              text="آدرس"
              outlined
              label="آدرس"
              :rows="3"
            />
          </v-col>
          <!-- <v-col class="col-12 col-md-4">
            <amp-select
              v-model="form.delivery_method_id"
              :items="delivery_method"
              text="روش ارسال"
              :appendIcon="'mdi-chevron-down'"
              rules="require"
            ></amp-select>
          </v-col> -->
          <!-- <v-col class="col-12">
                        <amp-input text="ایمیل" outlined label="ایمیل" type="email" rules="email"></amp-input>
                    </v-col> -->
          <v-col class="col-12 col-md-8">
            <amp-textarea
              v-model="form.description"
              text="توضیحات"
              label="توضیحات"
            ></amp-textarea>
          </v-col>
          <v-col class="d-flex align-center justify-center mt-3">
            <v-btn
              :loading="loading"
              type="submit"
              class="success mx-2"
              :disabled="!valid"
              style="letter-spacing: 0"
              large
            >
              ادامه
            </v-btn>
            <v-btn
              :loading="loading"
              class="error mx-2"
              @click="$emit('input', false)"
              style="letter-spacing: 0"
              large
            >
              بستن
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import CountryDivisionSelectInput from "../Setting/CountryDivisionSelectInput.vue";

export default {
  props: {
    value: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data: () => ({
    loading: false,
    valid: false,
    delivery_method: [],
    form: {
      country_division_id: null,
      delivery_method_id: null,
      postal_code: null,
      description: null,
      first_name: null,
      last_name: "",
      address: null,
      email: null,
      phone: null,
      id: null,
    },
  }),
  mounted() {
    if (this.$store.state.base.delivery_method) {
      this.$store.state.base.delivery_method?.forEach((each) => {
        this.delivery_method.push({ text: each.title, value: each.id });
      });
    }
    this.refillForm(this.$store.state.base.basket.data);
  },
  watch: {
    "$store.state.base.basket.refresh"() {
      this.refillForm(this.$store.state.base.basket.data);
    },
  },
  methods: {
    submit() {
      //basket update api request
      this.loading = true;
      this.$store
        .dispatch("base/updateBasket", this.form)
        .then((res) => {
          this.loading = false;
          this.$emit("successUpdate");
        })
        .catch((error) => {
          this.loading = false;
          this.$toast.error("عملیات با مشکل مواجه شد");
        });
    },
    refillForm(basket) {
      basket.country_division_id &&
        (this.form.country_division_id = basket.country_division_id);
      basket.delivery_method_id &&
        (this.form.delivery_method_id = basket.delivery_method_id);
      basket.postal_code && (this.form.postal_code = basket.postal_code);
      basket.description && (this.form.description = basket.description);
      basket.first_name && (this.form.first_name = basket.first_name);
      basket.last_name && (this.form.last_name = basket.last_name);
      basket.address && (this.form.address = basket.address);
      basket.email && (this.form.email = basket.email);
      basket.phone && (this.form.phone = basket.phone);
      basket.id && (this.form.id = basket.id);
    },
  },
  components: { CountryDivisionSelectInput },
};
</script>