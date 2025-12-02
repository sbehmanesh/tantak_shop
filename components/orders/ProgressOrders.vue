<template>
  <v-col cols="12" class="pa-2">
    <v-card class="elevation-1 pa-5" outlined color="primary lighten-1" dark>
      <v-row class="align-center pa-1 justify-space-between mr-1">
        <v-col cols="12" md="9">
          <v-row class="align-center justify-space-between">
            <div class="text-center">
              <small> وضعیت سفارش </small>
              <br />
              <small class=""> {{ getStatus(order.status) }}</small>
            </div>
            <div class="text-center">
              <small class=""> شماره سفارش </small>
              <br />

              <small class="">{{ order.factor_number }}</small>
            </div>

            <div class="text-center">
              <small class=""> تاریخ ثبت سفارش </small>
              <br />
              <small class=" ">{{ $toJalali(order.created_at) }}</small>
            </div>

            <div class="text-center">
              <small class=""> مبلغ سفارش </small>
              <br />

              <small class=""> تومان </small>

              <small class=""> {{ order?.base_price?.toLocaleString() }} </small>
            </div>
          </v-row>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn
            block
            class="ma-2 rounded-lg"
            @click="showDialog = true"
            color="whith"
            outlined
          >
            <small class="whith--text"> جزییات سفارش </small>
          </v-btn>
        </v-col>
        <v-col
          v-if="Boolean(order.remainder_price)"
          cols="12"
          class="d-flex justify-space-between align-center white rounded-lg grey lighten-3"
        >
          <v-icon color="primary" large> circle_notifications </v-icon>

          <h3
            :class="$vuetify.breakpoint.mdAndUp ? 'font_16' : 'font_10'"
            class="primary--text"
          >
            مبلغ
            {{ order.remainder_price.toLocaleString() }} تومان از سفارش شما منتظر پرداخت
            است
          </h3>

          <v-btn
            v-if="order.status == 'wait_sav'"
            class="rounded-lg"
            @click="RemainderPrice = true"
            color="primary"
            outlined
          >
            <small> پرداخت باقی مانده</small>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <BasketItems
      @cancelPay="cancelPay"
      @closeDialog="showDialog = false"
      v-if="showDialog"
      :dialog="showDialog"
      :status="order.status"
      :orederId="order.id"
    />
    <TipaxForm
      :tibax="tibax"
      :orederId="order.id"
      :dialog="tibaxDialog"
      v-if="tibaxDialog"
    />
    <RemainderPrice
      :orederId="order.id"
      :order="order"
      @closeDialog="RemainderPrice = false"
      :dialog="RemainderPrice"
      v-if="RemainderPrice"
    />
  </v-col>
</template>

<script>
let jmoment = require("jalali-moment");
import BasketItems from "@/components/orders/BasketItems.vue";
import TipaxForm from "@/components/orders/TipaxForm.vue";
import RemainderPrice from "@/components/orders/RemainderPrice.vue";
export default {
  components: {
    BasketItems,
    TipaxForm,
    RemainderPrice,
  },
  props: {
    order: {
      type: Object,
      required: true,
    },
    tibax: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    showDialog: false,
    tibaxDialog: false,
    RemainderPrice: false,
  }),

  methods: {
    date(value) {
      return jmoment(value).format("jDD jMMMM");
    },
    getStatus(status) {
      let status_text = "-";
      this.$store.state.static.basket_status.forEach((each) => {
        if (each.value == status) status_text = each.text;
      });
      return status_text;
    },
    cancelPay() {
      this.$emit("cancelPay");
    },
  },
};
</script>
<style scope="this api replaced by slot-scope in 2.5.0+">
small {
  font-size: 10px !important;
}
</style>
