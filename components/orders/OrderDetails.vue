<template>
  <div>
    <v-col cols="12">
      <v-row>
        <v-col>
          <!-- <v-icon>mdi-arrow-right</v-icon> -->
          <span>جزئیات سفارش</span>
        </v-col>
        <v-col>
          <!-- <v-icon>mdi-arrow-right</v-icon> -->
          <span>{{ getStatus(basket.status) }}</span>
        </v-col>
        <!-- <v-col cols="5" md="2" class="align-last-left">
          <div class="pointer" @click="factor_dialog = true">
            <v-icon>mdi-list-box-outline</v-icon>
            <span class="font_14">مشاهده فاکتور</span>
          </div>
        </v-col> -->
      </v-row>
    </v-col>
    <v-col cols="12" class="px-0 pt-0">
      <v-divider></v-divider>
    </v-col>
    <!-- <v-col cols="12">
      <v-chip class="border10 chip-back">
        <span class="pl-1 font_10">تاریخ ثبت سفارش</span>
        <span class="font_12">{{ basket.date }}</span>
      </v-chip>
      <v-chip class="border10 chip2-back">
        <span class="pl-1 font_10">کد پیگیری سفارش</span>
        <span class="font_12">{{ basket.code }}</span>
      </v-chip>
    </v-col> -->
    <v-col cols="12">
      <v-row class="px-3">
        <div class="mr-md-5 ml-3">
          <span class="font_12 gray--text">شماره موبایل : </span>
          <span class="font_12">{{ basket.phone }}</span>
        </div>
        <div class="mr-md-5 ml-3">
          <span class="font_12 gray--text">آدرس : </span>
          <span class="font_12">{{ basket.address }}</span>
        </div>
        <div class="mr-md-5 ml-3">
          <span class="font_12 gray--text">تحویل گیرنده : </span>
          <span class="font_12"
            >{{ basket.first_name }} {{ basket.last_name }}</span
          >
        </div>
        <div class="mr-md-5 ml-3">
          <span class="font_12 gray--text">شماره سفارش : </span>
          <span class="font_12">{{ basket.order_number }}</span>
        </div>
        <div class="mr-md-5 ml-3">
          <span class="font_12 gray--text">کد رهگیری : </span>
          <span class="font_12">{{ basket.tracking_code }}</span>
        </div>
        <div class="mr-md-5 ml-3">
          <span class="font_12 gray--text">کد رهگیری پستی : </span>
          <span class="font_12">{{ basket.post_tracking_code }}</span>
        </div>
      </v-row>
    </v-col>
    <v-col cols="12" class="px-0">
      <v-divider></v-divider>
    </v-col>
    <BasketProducts v-if="basket && showDetails" :basket="basket" />
    <v-dialog v-model="factor_dialog" width="700">
      <v-card class="pa-4">
        <v-row>
          <v-col cols="3" class="text-webkit-center">
            <div class="pb-3 space-nowrap">جزئیات قیمت</div>
            <div class="price-div">
              <v-icon color="success" size="40">credit_card</v-icon>
            </div>
          </v-col>
          <v-col cols="9" class="align-self-center">
            <v-row class="px-4 pb-4">
              <v-col cols="6">
                <div>
                  <span class="font_12 gray--text">جمع مبلغ کالاها:</span>
                  <span :class="{ 'mr-8': $vuetify.breakpoint.mdAndUp }"
                    >368.000</span
                  >
                  <span class="font_12">ریال</span>
                </div>
              </v-col>
              <v-col cols="6">
                <div>
                  <span class="font_12 gray--text">سود شما از خرید:</span>
                  <span :class="{ 'mr-8': $vuetify.breakpoint.mdAndUp }"
                    >14.000</span
                  >
                  <span class="font_12">ریال</span>
                </div>
              </v-col>
            </v-row>
            <v-row class="px-4">
              <v-col cols="6" class="pt-0">
                <div>
                  <span class="font_12 gray--text">هزینه ارسال:</span>
                  <span :class="{ 'mr-8': $vuetify.breakpoint.mdAndUp }"
                    >21.000</span
                  >
                  <span class="font_12">ریال</span>
                </div>
              </v-col>
              <v-col cols="6" class="pt-0">
                <div>
                  <span class="font_12 success--text">هزینه پرداخت شده:</span>
                  <span
                    class="success--text"
                    :class="{ 'mr-8': $vuetify.breakpoint.mdAndUp }"
                    >396.000</span
                  >
                  <span class="font_12 success--text">ریال</span>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import BasketProducts from "@/components/basket/BasketProducts.vue";
export default {
  components: { BasketProducts },
  props: {
    basket: {
      type: Object,
      require: true,
    },
    showDetails: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      factor_dialog: false,
    };
  },
  methods: {
    getStatus(status) {
      let status_text = "";
      this.$store.state.static.basket_status.forEach((each) => {
        if (each.value == status) status_text = each.text;
      });
      return status_text;
    },
  },
};
</script>
