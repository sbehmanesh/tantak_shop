<template>
  <v-dialog v-model="dialog" persistent max-width="390">
    <v-container fluid>
      <v-row justify="center" v-if="Boolean(data)">
        <v-col cols="12" md="12" class="pa-0">
          <v-card class="elevation-3 payment-card pa-4">
            <v-card-title class="justify-center">
              <v-icon large color="primary" class="me-2">mdi-credit-card-outline</v-icon>
              <span class="text-h6 font-weight-bold">جزئیات پرداخت</span>
            </v-card-title>

            <v-divider class="my-3"></v-divider>

            <v-card-text>
              <v-row>
                <v-col cols="12" class="d-flex justify-space-between">
                  <span class="grey--text">مبلغ کل سفارش:</span>
                  <b>{{ data?.original_price?.toLocaleString() }} تومان</b>
                </v-col>

                <v-col cols="12" class="d-flex justify-space-between">
                  <span class="grey--text">میزان تخفیف:</span>
                  <b class="red--text">{{ data.off_amount?.toLocaleString() }} تومان</b>
                </v-col>

                <v-col cols="12" class="d-flex justify-space-between">
                  <span class="grey--text">اعتبار کیف پول:</span>
                  <b class="green--text"
                    >{{ data?.cash_wallt?.toLocaleString() }} تومان</b
                  >
                </v-col>

                <v-divider class="my-3"></v-divider>

                <v-col cols="12" class="d-flex justify-space-between">
                  <span class="text-h6 font-weight-medium">مبلغ قابل پرداخت:</span>
                  <span class="text-h6 primary--text font-weight-bold">
                    {{ data?.buy_online?.toLocaleString() }} تومان
                  </span>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions class="justify-center mt-4">
              <v-btn color="success" large dark @click="goToPayment">
                <v-icon left>mdi-credit-card-check</v-icon>
                پرداخت اینترنتی
              </v-btn>
              <v-btn color="red" large dark @click="cancelPay"> انصراف و لغو سفارش</v-btn>
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
    data: {
      type: false,
      required: true,
    },
    dialog: {
      type: false,
      required: true,
    },
  },
  methods: {
    goToPayment() {
      if (this.data?.url) {
        window.open(this.data.url, "_blank");
      } else {
        this.$toast.error("لینک پرداخت در دسترس نیست!");
        this.$toast.error("لینک پرداخت در دسترس نیست!");
      }
    },
    cancelPay() {
      this.$emit("cancelPay");
    },
  },
};
</script>
