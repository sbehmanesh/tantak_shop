<template>
  <v-col cols="12" class="pa-2">
    <v-card class="order-card elevation-2" outlined>
      <v-card-title class="d-flex align-center justify-space-between">
        <div>
          <v-chip color="primary" text-color="white" small class="font-weight-bold">
            <v-icon left small>mdi-shopping-outline</v-icon>
            سفارش {{ getStatus(order.status) }}
          </v-chip>
        </div>
      </v-card-title>

      <v-divider class="my-2"></v-divider>

      <v-card-text>
        <div class="mb-1">
          شماره سفارش:
          <b class="primary--text">#{{ order.factor_number }}</b>
        </div>

        <div class="grey--text text--darken-1 mb-1">
          تاریخ ثبت سفارش:
          <span class="black--text">{{ $toJalali(order.created_at) }}</span>
        </div>

        <div class="grey--text text--darken-1 mb-1">
          وزن (گرم):
          <span class="black--text">{{ order.total_weight }}</span>
        </div>

        <div class="grey--text text--darken-1">
          مبلغ:
          <span class="primary--text font-weight-medium">
            {{ order?.base_price?.toLocaleString() }} ریال
          </span>
        </div>
        <v-btn @click="showDialog = true" color="success" dark class="mt-4">
          جزییات و پرداخت</v-btn
        >
      </v-card-text>

      <v-divider class="my-2"></v-divider>
    </v-card>
    <BasketItems
    @cancelPay="cancelPay"
      @closeDialog="showDialog = false"
      v-if="showDialog"
      :dialog="showDialog"
      :orederId="order.id"
    />
  </v-col>
</template>

<script>
let jmoment = require("jalali-moment");
import BasketItems from "@/components/orders/BasketItems.vue";
export default {
  components: {
    BasketItems,
  },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    showDialog: false,
  }),

  methods: {
    date(value) {
      return jmoment(value).format("jDD jMMMM");
    },
    getStatus(status) {
      let status_text = "";
      this.$store.state.static.basket_status.forEach((each) => {
        if (each.value == status) status_text = each.text;
      });
      return status_text;
    },
  cancelPay(){
    this.$emit("cancelPay")
  }
  },
};
</script>

<style scoped>
.order-card {
  cursor: pointer;
  transition: all 0.25s ease;
  border-radius: 12px;
}
.order-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}
</style>
