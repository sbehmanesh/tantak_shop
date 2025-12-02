<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card class="pa-5">
        <v-form v-model="valid">
          <v-col cols="12">
            <amp-autocomplete
              rules="require"
              height="30"
              text="انتخاب شهر"
              placeholder="نام شهر خود را جستجو کنید"
              v-model="form.city_id"
              :items="tibax"
            />
          </v-col>
          <v-col cols="12" class="text-center">
            <v-btn color="red" class="ma-2 white--text">بستن</v-btn>
            <v-btn
              outlined
              color="green"
              @click="submit"
              class="ma-2"
              :disavled="!Boolean(form.city_id)"
            >
              استعلام قیمت ارسال
            </v-btn>
          </v-col>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    dialog: {
      default: false,
    },
    tibax: {
      default: false,
    },
    orederId: {
      default: false,
    },
  },
  data() {
    return {
      step: 1,
      form: {
        city_id: "",
        basket_id: "",
      },
      for_buy: "",
      time_send: [],
      address: [],
      valid: false,

      items: [],
      resultPay: {},
      loading: false,
      showFactory: false,
      coupon: "",
    };
  },
  computed: {
    totalPrice() {
      return this.items.reduce((sum, item) => {
        return sum + item.price * item.number;
      }, 0);
    },
  },
 

  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },

    submit() {
      if (!this.valid) {
        this.$toast.error("لطفاً همه فیلدها را تکمیل کنید!");
        return;
      }

      this.loading = true;

      const form = { ...this.form };
      form.basket_id = this.orederId;
      this.$reqApi("shop/tipax/estimate-price-basket", form)
        .then(() => {
        })
        .catch(() => {
          this.$toast.error("خطا در ثبت اطلاعات پرداخت. لطفاً مجدداً تلاش کنید.");
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
