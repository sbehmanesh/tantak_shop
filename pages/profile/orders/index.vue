<template>
  <v-card class="box-shadow-none rounded-lg">
    <v-card-title class="py-6">تاریخچه سفارشات</v-card-title>
    <v-tabs v-model="tab" color="basil">
      <v-tab>
        <!-- <v-badge color="info" content="1"> -->
        <span class="font_14" style="letter-spacing: normal">جاری</span>
        <!-- </v-badge> -->
      </v-tab>
      <v-tab style="letter-spacing: normal"> پرداخت شده </v-tab>
      <v-tab>
        <!-- <v-badge color="green" content="1"> -->
        <span class="font_14" style="letter-spacing: normal">تحویل شده</span>
        <!-- </v-badge> -->
      </v-tab>
      <v-tab style="letter-spacing: normal"> لغو شده </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <div v-if="orders.waiting">
          <v-card
            v-for="item in orders.waiting"
            :key="item.id"
            color="basil"
            class="ma-3 order_card_style"
          >
            <ProgressOrders :order="item" />
          </v-card>
        </div>
        <div v-else class="text-center my-8">
          <img src="/icon/no-order.svg" width="200" />
          <div>شما در حال حاضر سفارشی ثبت نکرده اید.</div>
          <div
            class="blue--text pointer font_14 my-2"
            @click="$router.push('/product')"
          >
            ثبت سفارش
          </div>
        </div>
      </v-tab-item>
      <v-tab-item>
        <div v-if="orders.payed">
          <v-card
            v-for="item in orders.payed"
            :key="item.id"
            color="basil"
            class="ma-3 order_card_style"
          >
            <ProgressOrders :order="item" />
          </v-card>
        </div>
        <div v-else class="text-center my-8">
          <img src="/icon/no-order.svg" width="200" />
          <div>شما سفارش پرداخت شده ای ندارید.</div>
        </div>
      </v-tab-item>
      <v-tab-item>
        <div v-if="orders.completed">
          <v-card
            v-for="item in orders.completed"
            :key="item.id"
            color="basil"
            class="ma-3 order_card_style"
          >
            <ProgressOrders :order="item" />
          </v-card>
        </div>
        <div v-else class="text-center my-8">
          <img src="/icon/no-order.svg" width="200" />
          <div>شما سفارش تحویل شده ندارید.</div>
        </div>
      </v-tab-item>
      <v-tab-item>
        <div v-if="orders.canceled">
          <v-card
            v-for="item in orders.canceled"
            :key="item.id"
            color="basil"
            class="ma-3 order_card_style"
          >
            <ProgressOrders :order="item" />
          </v-card>
        </div>
        <div v-else class="text-center my-8">
          <img src="/icon/no-order.svg" width="200" />
          <div>سفارشات شما تاکنون لغو نشده اند.</div>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import ProgressOrders from "@/components/orders/ProgressOrders.vue";
export default {
  layout: "profile",
  components: { ProgressOrders },
  data() {
    return {
      title: "سفارشات",
      loading: false,
      tab: null,
      orders: {},
    };
  },
  computed: {
    scroll_to() {
      return this.$vuetify.breakpoint.mdAndUp ? 0 : 300;
    },
  },
  watch: {
    loading() {
      this.$store.dispatch("setTopLoader", this.loading);
      if (!loading) {
        this.$scrollTo(0, this.scroll_to);
      }
    },
  },
  mounted() {
    this.$store.dispatch("setPageTitle", this.title);
    this.getOrders();
    this.$scrollTo(0, this.scroll_to);
  },
  methods: {
    // open , waiting , payed , completed , canceled
    getOrders() {
      let orders = this.$store.state.auth.user.old_baskets;
      if (!orders && orders.length == 0) return;
      let open = orders.filter((item) => item.status == "open");
      if (open.length != 0) this.orders.open = open;
      let waiting = orders.filter((item) => item.status == "waiting");
      if (waiting.length != 0) this.orders.waiting = waiting;
      let payed = orders.filter((item) => item.status == "payed");
      if (payed.length != 0) this.orders.payed = payed;
      let completed = orders.filter((item) => item.status == "completed");
      if (completed.length != 0) this.orders.completed = completed;
      let canceled = orders.filter((item) => item.status == "canceled");
      if (canceled.length != 0) this.orders.canceled = canceled;
    },
  },
};
</script>
