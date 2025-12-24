<template>
  <v-col cols="12" class="pa-2">
    <v-card
      class="elevation-3 rounded-xl"
      outlined
      :class="isMobile ? 'pa-3 pt-4' : 'pa-5'"
      color="primary lighten-1"
      dark
    >
      <v-row class="align-center pa-1 justify-space-between">
        <v-col cols="12" md="9">
          <v-row class="align-center justify-space-between">
            <v-col
              cols="12"
              md="3"
              :class="
                isMobile ? 'd-flex lign-center justify-space-between' : 'text-center'
              "
              class="py-1"
            >
              <small> وضعیت سفارش </small>
              <br v-if="!isMobile" />
              <small class=""> {{ getStatus(order.status) }}</small>
            </v-col>
            <v-col
              cols="12"
              md="3"
              :class="
                isMobile ? 'd-flex lign-center justify-space-between' : 'text-center'
              "
              class="py-1"
            >
              <small class=""> شماره سفارش </small>
              <br v-if="!isMobile" />

              <small class="">{{ order.factor_number }}</small>
            </v-col>

            <v-col
              cols="12"
              md="3"
              :class="
                isMobile ? 'd-flex lign-center justify-space-between' : 'text-center'
              "
              class="py-1"
            >
              <small class=""> تاریخ ثبت سفارش </small>
              <br v-if="!isMobile" />
              <small class=" ">{{ $toJalali(order.created_at) }}</small>
            </v-col>

            <v-col
              cols="12"
              md="3"
              :class="
                isMobile ? 'd-flex lign-center justify-space-between' : 'text-center'
              "
              class="py-1"
            >
              <small class=""> مبلغ سفارش </small>
              <br v-if="!isMobile" />

              <small class="">
                {{ order?.base_price?.toLocaleString() }} <small class=""> ریال </small>
              </small>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="2" v-if="!Boolean(order.remainder_price)">
          <v-btn
            block
            class="rounded-lg"
            @click="showDialog = true"
            color="whith"
            outlined
          >
            <small class="whith--text"> جزییات سفارش </small>
          </v-btn>
          <v-btn
            v-if="
              order.status === 'payed' &&
              order.data_terminal_send?.length > 0 &&
              order.delivery_info?.length > 0
            "
            block
            class="rounded-lg mt-2"
            @click="tipaxDialog = true"
            color="white"
          >
            <small class="primary--text"> ثبت در تیپاکس </small>
          </v-btn>
        </v-col>
        <v-col
          v-if="Boolean(order.remainder_price)"
          cols="12"
          class="d-flex rounded-xl justify-space-between mt-3 align-center white grey lighten-3"
        >
          <v-row class="align-center justify-center pa-3">
            <v-col cols="12" md="8" class="px-0">
              <h3
                :class="$vuetify.breakpoint.mdAndUp ? 'font_16' : 'font_11'"
                class="primary--text"
              >
                <v-icon color="primary"> circle_notifications </v-icon>

                مبلغ
                {{ order.remainder_price.toLocaleString() }} ریال از سفارش شما منتظر
                پرداخت است
              </h3>
            </v-col>
            <v-spacer></v-spacer>
            <v-btn
              v-if="order.status == 'wait_sav'"
              class="rounded-lg"
              @click="RemainderPrice = true"
              color="primary"
              :small="isMobile ? true : false"
              outlined
            >
              <small> پرداخت باقی مانده</small>
            </v-btn>
            <v-btn
              :small="isMobile ? true : false"
              class="ma-2 rounded-lg"
              @click="showDialog = true"
              color="primary"
            >
              <small class="whith--text"> جزییات سفارش </small>
            </v-btn>
          </v-row>
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
    <AddToTibaxOrder
      :tibaxCity="tibax"
      :selectedBasket="order.id"
      @closeDialog="tipaxDialog = false"
      :tipaxDialog="tipaxDialog"
      v-if="tipaxDialog"
    />
  </v-col>
</template>

<script>
let jmoment = require("jalali-moment");
import BasketItems from "@/components/orders/BasketItems.vue";
import TipaxForm from "@/components/orders/TipaxForm.vue";
import RemainderPrice from "@/components/orders/RemainderPrice.vue";
import AddToTibaxOrder from "@/components/orders/AddToTibaxOrder.vue";

export default {
  components: {
    BasketItems,
    TipaxForm,
    RemainderPrice,
    AddToTibaxOrder,
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
    tipaxDialog: false,
  }),
  computed: {
    isMobile() {
      if (Boolean(this.$vuetify.breakpoint.mdAndUp)) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    date(value) {
      return jmoment(value).format("jDD jMMMM");
    },
    getStatus(status) {
      let status_text = "--";
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
