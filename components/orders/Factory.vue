<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <v-card dark color="primary" class="pa-5">
      <v-row justify="center">
        <v-col cols="12" class="pa-0">
          <v-card color="primary " class="elevation-0 rounded-lg pa-4">
            <v-col cols="12" class="text-center pt-0">
              <v-icon large color="primary">mdi-credit-card-outline</v-icon>
              <small class="font_18">جزئیات پرداخت</small>
            </v-col>

            <!-- حالت لودینگ -->
            <v-skeleton-loader
              v-if="loading"
              type="card"
              class="rounded-lg mb-4"
            ></v-skeleton-loader>

            <div v-else>
              <v-divider class="my-3"></v-divider>
              <v-row>
                <v-col cols="12" class="d-flex justify-space-between">
                  <small class="">مبلغ کل سفارش:</small>
                  <small>{{ $price(data?.original_price) }} تومان</small>
                </v-col>

                <v-col cols="12" class="d-flex justify-space-between">
                  <small class="">میزان تخفیف:</small>
                  <small class="">{{ data.amount_coupon?.toLocaleString() }} تومان</small>
                </v-col>

                <v-col cols="12" class="d-flex justify-space-between">
                  <small class="t">اعتبار کیف پول:</small>
                  <small class="">{{ data?.cash_wallt?.toLocaleString() }} تومان</small>
                </v-col>
                <v-col
                  v-if="Boolean(data.cash_wallt_sav)"
                  cols="12"
                  class="d-flex justify-space-between"
                >
                  <small class="t"> کیف پول نقدی ساو:</small>
                  <small class=""
                    >{{ data?.cash_wallt_sav?.toLocaleString() }} تومان</small
                  >
                </v-col>
                <v-col
                  v-if="Boolean(data.special_amount_sav)"
                  cols="12"
                  class="d-flex justify-space-between"
                >
                  <small class="t"> اعتبار ویژه ساو:</small>
                  <small class=""
                    >{{ data?.special_amount_sav?.toLocaleString() }} تومان</small
                  >
                </v-col>
                <v-col
                  v-if="Boolean(data.total_discount_sav_service)"
                  cols="12"
                  class="d-flex justify-space-between"
                >
                  <small class="t"> مجموع تخفیف سرویس ساو:</small>
                  <small class=""
                    >{{ data?.total_discount_sav_service?.toLocaleString() }} تومان</small
                  >
                </v-col>

                <v-divider class="my-3"></v-divider>

                <v-col cols="12" class="d-flex justify-space-between">
                  <small class="">مبلغ قابل پرداخت:</small>
                  <small class=""> {{ data?.buy_online?.toLocaleString() }} تومان </small>
                </v-col>
              </v-row>
            </div>
          </v-card>
          <!-- دکمه‌ها -->
        </v-col>
      </v-row>
      <v-col cols="12" class="justify-center mt-4">
        <v-btn
          :loading="loading"
          :disabled="loading"
          color="white"
          dark
          class="rounded-xl"
          @click="goToPayment"
          block
        >
          <v-icon color="primary" left>mdi-credit-card-check</v-icon>
          <small class="primary--text"> پرداخت اینترنتی </small>
        </v-btn>

        <v-btn
          class="rounded-xl mt-2"
          block
          :disabled="loading"
          color="blue darken-1"
          dark
          @click="cancelPay"
        >
          <v-icon left>mdi-cancel</v-icon>
          <small> انصراف و لغو سفارش </small>
        </v-btn>
      </v-col>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    data: { type: Object, required: true },
    dialog: { type: Boolean, required: true },
    orederId: { type: String, required: true },
    terminalId: { type: String, required: true },
  },

  data() {
    return {
      valid: false,
      loading: false,
    };
  },


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
