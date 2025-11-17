<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" class="pa-0">
          <v-card class="elevation-3 rounded-lg pa-4">
            <v-card-title class="justify-center">
              <v-icon large color="primary" class="me-2">mdi-credit-card-outline</v-icon>
              <span class="">جزئیات پرداخت</span>
            </v-card-title>

            <!-- حالت لودینگ -->
            <v-skeleton-loader
              v-if="loading"
              type="card"
              class="rounded-lg mb-4"
            ></v-skeleton-loader>

            <v-card-text v-else>
              <v-divider class="my-3"></v-divider>
              <v-row>
                <v-col cols="12" class="d-flex justify-space-between">
                  <span class="grey--text">مبلغ کل سفارش:</span>
                  <strong>{{ $price(data?.original_price) }} تومان</strong>
                </v-col>

                <v-col cols="12" class="d-flex justify-space-between">
                  <span class="grey--text">میزان تخفیف:</span>
                  <strong class="red--text"
                    >{{ data.amount_coupon?.toLocaleString() }} تومان</strong
                  >
                </v-col>

                <v-col cols="12" class="d-flex justify-space-between">
                  <span class="gre-text">اعتبار کیف پول:</span>
                  <strong class="green--text"
                    >{{ data?.cash_wallt?.toLocaleString() }} تومان</strong
                  >
                </v-col>

                <v-divider class="my-3"></v-divider>

                <v-col cols="12" class="d-flex justify-space-between">
                  <span class="">مبلغ قابل پرداخت:</span>
                  <span class="primary--text font-weight-bold">
                    {{ data?.buy_online?.toLocaleString() }} تومان
                  </span>
                </v-col>
              </v-row>
            </v-card-text>

            <!-- دکمه‌ها -->
            <v-card-actions class="justify-center mt-4">
              <v-btn
                :loading="loading"
                :disabled="loading"
                color="success"
                dark
                @click="goToPayment"
              >
                <v-icon left>mdi-credit-card-check</v-icon>
                <small> پرداخت اینترنتی </small>
              </v-btn>

              <v-btn :disabled="loading" color="red darken-1" dark @click="cancelPay">
                <v-icon left>mdi-cancel</v-icon>
                <small> انصراف و لغو سفارش </small>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
</template>

<script>
export default {
  props: {
    data: { type: Object, required: true },
    dialog: { type: Boolean, required: true },
    orederId: { type: String, required: true },
  },

  data() {
    return {
      valid: false,
      loading: false,
    };
  },

  mounted() {},

  methods: {
    goToPayment() {
      if (this.data?.url) {
        window.open(this.data.url, "_blank");
        this.$emit("paymentSuccess");
      } else {
        this.$toast.error("لینک پرداخت در دسترس نیست!.");
      }
    },

    cancelPay() {
      this.$emit("cancelPay");
    },
  },
};
</script>
