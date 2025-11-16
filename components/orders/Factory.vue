<template>
  <v-dialog v-model="dialog" persistent max-width="750">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" class="pa-0">
          <v-card class="elevation-3 rounded-lg pa-4">
            <v-card-title class="justify-center">
              <v-icon large color="primary" class="me-2">mdi-credit-card-outline</v-icon>
              <span class="text-h6 font-weight-bold">جزئیات پرداخت</span>
            </v-card-title>

            <v-divider class="my-3"></v-divider>

            <!-- حالت لودینگ -->
            <v-skeleton-loader
              v-if="loading"
              type="card"
              class="rounded-lg mb-4"
            ></v-skeleton-loader>

            <v-card-text v-else>
              <v-form v-model="valid" @submit.prevent="submit" class="pa-2">
                <v-row dense>
                  <v-col cols="12" md="6">
                    <amp-select
                      rules="require"
                      text="ارسال خرید برای"
                      :items="for_buy_item"
                      v-model="for_buy"
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <amp-jdate
                      text="تاریخ ارسال"
                      :is-number="true"
                      rules="require"
                      v-model="array_profile.send_at"
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <amp-input
                      rules="require"
                      text="نام گیرنده"
                      v-model="array_profile.first_name"
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <amp-input
                      rules="require"
                      text="نام خانوادگی"
                      v-model="array_profile.last_name"
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <amp-input
                      text="شماره همراه"
                      :isNumber="true"
                      v-model="array_profile.phone_number"
                      rules="require,phone"
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <amp-select
                      rules="require"
                      text="بازه زمانی ارسال"
                      v-model="array_profile.delivery_time_id"
                      :items="time_send"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-divider></v-divider>
                  </v-col>

                  <v-col cols="12" md="12">
                    <amp-select
                      rules="require"
                      text="آدرس گیرنده"
                      v-model="array_profile.address_id"
                      :items="address"
                      :loading="loading"
                    />
                  </v-col>
                </v-row>
              </v-form>

              <!-- خلاصه پرداخت -->
              <v-divider class="my-3"></v-divider>
              <v-row>
                <v-col cols="12" class="d-flex justify-space-between">
                  <span class="grey--text">مبلغ کل سفارش:</span>
                  <strong>{{ data?.original_price?.toLocaleString() }} تومان</strong>
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
                  <span class="text-h6 font-weight-medium">مبلغ قابل پرداخت:</span>
                  <span class="text-h6 primary--text font-weight-bold">
                    {{ data?.buy_online?.toLocaleString() }} تومان
                  </span>
                </v-col>
              </v-row>
            </v-card-text>

            <!-- دکمه‌ها -->
            <v-card-actions class="justify-center mt-4">
              <v-btn
                :loading="loading"
                :disabled="!valid || loading"
                color="success"
                large
                dark
                @click="submit"
              >
                <v-icon left>mdi-credit-card-check</v-icon>
                پرداخت اینترنتی
              </v-btn>

              <v-btn
                :disabled="loading"
                color="red darken-1"
                large
                dark
                @click="cancelPay"
              >
                <v-icon left>mdi-cancel</v-icon>
                انصراف و لغو سفارش
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
      for_buy: "",
      time_send: [],
      address: [],
      array_profile: {
        first_name: "",
        last_name: "",
        phone_number: "",
        send_at: "",
        delivery_time_id: "",
        address_id: "",
      },
      for_buy_item: [
        { text: "خودم", value: "user" },
        { text: "دیگران", value: "other" },
      ],
    };
  },

  mounted() {
    this.getTime();
    this.getAddress();
    console.log("===", this.data);
  },

  watch: {
    for_buy(value) {
      if (value === "user") this.loadUserInfo();
      else this.resetReceiverInfo();
    },
  },

  methods: {
    resetReceiverInfo() {
      this.array_profile.first_name = "";
      this.array_profile.last_name = "";
      this.array_profile.phone_number = "";
    },

    goToPayment() {
      if (this.data?.url) {
        window.open(this.data.url, "_blank");
        this.$emit("paymentSuccess");
      } else {
        this.$toast.error("لینک پرداخت در دسترس نیست!");
      }
    },

    cancelPay() {
      this.$emit("cancelPay");
    },

    submit() {
      if (!this.valid) {
        this.$toast.error("لطفاً همه فیلدها را تکمیل کنید!");
        return;
      }

      this.loading = true;

      const form = {
        basket_id: this.orederId,
        for_buy: this.for_buy,
        array_profile: [this.array_profile],
      };

      this.$reqApi("basket/set-form-send", form)
        .then(() => {
          this.$toast.success("در حال انتقال به درگاه پرداخت...");
          this.goToPayment();
        })
        .catch(() => {
          this.$toast.error("خطا در ثبت اطلاعات پرداخت. لطفاً مجدداً تلاش کنید.");
        })
        .finally(() => {
          this.loading = false;
        });
    },

    getTime() {
      this.loading = true;
      this.$reqApi("delivery-time")
        .then((res) => {
          this.time_send = res.model.data.map((item) => {
            const [start, end] = item.range_time.split(",").map(Number);
            return { text: `از ${start} تا ${end}`, value: item.id };
          });
        })
        .catch(() => {
          this.$toast.error("خطا در دریافت بازه زمانی ارسال");
        })
        .finally(() => {
          this.loading = false;
        });
    },

    getAddress() {
      this.loading = true;
      this.$reqApi("/address")
        .then((res) => {
          this.address = res.model.data.map((x) => ({
            text: `استان ${x.country_division.parent.name}، شهر ${x.country_division.name}، پستی ${x.postal_code} | آدرس: ${x.address}`,
            value: x.id,
          }));
        })
        .catch(() => {
          this.$toast.error("خطا در بارگذاری آدرس‌ها");
        })
        .finally(() => {
          this.loading = false;
        });
    },

    loadUserInfo() {
      this.array_profile.first_name = this.$store.state.auth.user.first_name;
      this.array_profile.last_name = this.$store.state.auth.user.last_name;
      this.array_profile.phone_number = this.$store.state.auth.user.username;
    },
  },
};
</script>

<style scoped>
.payment-card {
  border-radius: 12px;
  background-color: #fff;
}
.v-card-title {
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}
.v-btn {
  border-radius: 8px;
  min-width: 160px;
}
</style>
