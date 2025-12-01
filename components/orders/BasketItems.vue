<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800">
      <v-card>
        <!-- دکمه بستن -->
        <v-col cols="12" class="text-end">
          <v-btn icon @click="closeDialog">
            <v-icon>close</v-icon>
          </v-btn>
        </v-col>
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-container fluid>
              <v-row dense>
                <v-skeleton-loader
                  v-for="x in 3"
                  v-if="loading"
                  type="card"
                  height="358px"
                  width="30%"
                  class="rounded-lg ma-3"
                ></v-skeleton-loader>

                <v-col v-for="item in items" :key="item.id" cols="12" md="4">
                  <v-card height="358px" class="product-card elevation-2">
                    <v-img
                      :src="$getImage(item.product.main_image)"
                      height="145px"
                      class="rounded-t-lg"
                      contain
                    ></v-img>

                    <v-card-title class="d-flex justify-space-between align-center">
                      <small>{{ item.product.name }}</small>
                      <v-chip color="primary" text-color="white" small>
                        {{ item.number }} عدد
                      </v-chip>
                    </v-card-title>

                    <v-card-text>
                      <div class="grey--text text--darken-2 mb-2">
                        <small>{{ item.information }}</small>
                      </div>

                      <div class="grey--text">
                        <small class="font-weight-bold">بارکد:</small>
                        {{ item.full_barcode }}
                      </div>

                      <v-divider class="my-2"></v-divider>

                      <div class="d-flex justify-space-between">
                        <small>قیمت واحد:</small>
                        <small class="font-weight-medium">
                          {{ item.price.toLocaleString() }} تومان
                        </small>
                      </div>

                      <div class="d-flex justify-space-between">
                        <small>جمع کل:</small>
                        <small class="primary--text font-weight-bold">
                          {{ (item.price * item.number).toLocaleString() }} تومان
                        </small>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <v-divider class="my-4"></v-divider>
              <v-row class="justify-space-between align-center pa-5">
                <v-col cols="12" md="5">
                  <div class="">
                    مجموع کل سبد:
                    <span class="primary--text">
                      {{ totalPrice.toLocaleString() }} تومان
                    </span>
                  </div>
                </v-col>
                <v-btn v-if="status == 'open'" @click="step++" color="primary">
                  تکمیل اطلاعات
                </v-btn>
              </v-row>
            </v-container>
          </v-window-item>

          <v-window-item :value="2">
            <v-col cols="12"> اطلاعات خواسته شده را تکمیل کنید </v-col>
            <v-form v-model="valid" @submit.prevent="submit" class="pa-2">
              <v-row dense class="pa-3 justify-center">
                <v-col cols="12" md="5">
                  <amp-select
                    rules="require"
                    height="37"
                    text="ارسال خرید برای"
                    :items="for_buy_item"
                    v-model="for_buy"
                  />
                </v-col>

                <v-col cols="12" md="5">
                  <amp-jdate
                    text="تاریخ ارسال"
                    :is-number="true"
                    rules="require"
                    height="37"
                    v-model="array_profile.send_at"
                  />
                </v-col>

                <v-col cols="12" md="5">
                  <amp-input
                    rules="require"
                    height="37"
                    text="نام گیرنده"
                    v-model="array_profile.first_name"
                  />
                </v-col>

                <v-col cols="12" md="5">
                  <amp-input
                    rules="require"
                    height="37"
                    text="نام خانوادگی"
                    v-model="array_profile.last_name"
                  />
                </v-col>

                <v-col cols="12" md="5">
                  <amp-input
                    text="شماره همراه"
                    :isNumber="true"
                    v-model="array_profile.phone_number"
                    rules="require,phone"
                  />
                </v-col>

                <v-col cols="12" md="5">
                  <amp-select
                    rules="require"
                    height="37"
                    text="بازه زمانی ارسال"
                    v-model="array_profile.delivery_time_id"
                    :items="time_send"
                  />
                </v-col>

                <v-col cols="12" md="10" class="py-0">
                  <amp-select
                    rules="require"
                    height="37"
                    text="آدرس گیرنده"
                    v-model="array_profile.address_id"
                    :items="address"
                    :loading="loading"
                  />
                </v-col>
                <v-col cols="12" md="10">
                  <v-row class="d-flex justify-end align-center ml-2">
                    <v-btn
                      class="mb-6"
                      v-if="status == 'open'"
                      color="primary"
                      large
                      @click="step++"
                      dark
                      :disabled="loading || !valid"
                    >
                      ادامه
                      <v-icon small> arrow_back_ios</v-icon>
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-window-item>
          <v-window-item :value="3">
            <v-row class="justify-center pa-5">
              <v-col cols="12" md="5">
                <amp-select
                  placeholder="درگاه پرداخت را انتخاب کنید"
                  v-model="terminal_id"
                  :items="terminales"
                />
                <amp-input placeholder="کد تخفیف دارید ؟" v-model="coupon" />

                <v-btn
                  class="mb-6"
                  v-if="status == 'open'"
                  color="primary"
                  large
                  @click="submit"
                  dark
                  block
                  :disabled="loading || !Boolean(terminal_id)"
                >
                  تایید
                </v-btn>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
        <Factory
          v-if="showFactory && !loading && Boolean(resultPay)"
          :dialog="showFactory"
          :data="resultPay"
          :terminalId="terminal_id"
          :orederId="orederId"
          @cancelPay="cancelPay"
        />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Factory from "@/components/orders/Factory.vue";
export default {
  components: {
    Factory,
  },
  props: {
    dialog: {
      default: false,
    },
    status: {
      default: false,
    },
    orederId: {
      default: false,
    },
  },
  data() {
    return {
      step: 1,
      array_profile: {
        first_name: "",
        last_name: "",
        phone_number: "",
        send_at: "",
        delivery_time_id: "",
        address_id: "",
      },
      for_buy: "",
      terminal_id: "",
      time_send: [],
      address: [],
      terminales: [
        { text: " درگاه پرداخت زرین پال", value: "zarinpal" },
        { text: "درگاه پرداخت ساو", value: "service_sav_pay" },
      ],
      valid: false,
      for_buy_item: [
        { text: "خودم", value: "user" },
        { text: "دیگران", value: "other" },
      ],
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
  mounted() {
    this.getTime();
    this.getAddress();
    if (Boolean(this.orederId)) {
      this.$reqApi("shop/basket-item/public-list", { basket_id: this.orederId })
        .then((res) => {
          this.items = res.model.data;
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },
  watch: {
    for_buy(value) {
      if (value === "user") this.loadUserInfo();
      else this.resetReceiverInfo();
    },
    "array_profile.address_id"() {
      if (Boolean(this.array_profile.address_id)) {
        this.getPriceSend(this.array_profile.address_id);
      }
    },
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
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
          console.log("آدرس گیرنده >>> ", res);

          this.address = res.model.data.map((x) => ({
            text: `${x?.name} ،   ${x.postal_code} | آدرس: ${x.address}`,
            value: x.country_division_id,
          }));
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false;
        });
    },

    loadUserInfo() {
      this.array_profile.first_name = this.$store.state.auth.user.first_name;
      this.array_profile.last_name = this.$store.state.auth.user.last_name;
      this.array_profile.phone_number = this.$store.state.auth.user.username;
    },
    payBasket() {
      this.loading = true;
      let only_price = 1;
      this.$reqApi("shop/basket/pay-by-user", {
        basket_id: this.orederId,
        only_price: only_price,
        terminal_id: this.terminal_id,
        coupon: this.coupon,
      })
        .then((res) => {
          this.resultPay = res;
          this.showFactory = true;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;

          console.error(err);
        });
    },
    viewProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    cancelPay() {
      this.closeDialog();
      this.showFactory = false;
      this.$emit("cancelPay");
    },
    resetReceiverInfo() {
      this.array_profile.first_name = "";
      this.array_profile.last_name = "";
      this.array_profile.phone_number = "";
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
          this.payBasket();
        })
        .catch(() => {
          this.$toast.error("خطا در ثبت اطلاعات پرداخت. لطفاً مجدداً تلاش کنید.");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getPriceSend(id) {
      let form = {
        basket_id: this.orederId,
        city_id: +Number(id),
      };
      this.$reqApi("shop/tipax/estimate-price-basket", form)
        .then((res) => {
          console.log("res");
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
