<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card class="pa-5" :disabled="loading">
        <v-form v-model="valid">
          <v-col cols="12">
            <amp-input
              text="مبلغ باقی مانده سفارش به تومان"
              class="ltr-item"
              :disabled="true"
              v-model="order.remainder_price"
            ></amp-input>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-btn color="red" class="ma-2 white--text" @click="closeDialog">بستن</v-btn>
            <v-btn
              color="primary"
              @click="submit"
              class="ma-2"
              :disavled="!Boolean(order.remainder_price)"
            >
              پرداخت
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
    order: {
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
      this.loading = true;
      const form = { basket_id: this.orederId };
      form.basket_id = this.orederId;
      this.$reqApi("shop/basket/pay-remainder", form)
        .then((res) => {
          window.open(res?.url, "_blank");
          this.loading = false;
          // this.closeDialog()
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
