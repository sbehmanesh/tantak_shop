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
      <v-tab style="letter-spacing: normal">در انتظار پرداخت </v-tab>
    </v-tabs>
    <v-tabs-items v-if="!loading_items" v-model="tab">
      <v-tab-item>
        <div v-if="allBaskets.open">
          <v-card
            v-for="item in allBaskets.open"
            :key="item.id"
            color="basil"
            class="ma-3 order_card_style"
          >
            <ProgressOrders v-if="tab == 0" :order="item" />
          </v-card>
        </div>
        <div v-else class="text-center my-8">
          <img src="/icon/no-order.svg" width="200" />
          <div>شما در حال حاضر سفارشی ثبت نکرده اید.</div>
          <div class="blue--text pointer font_14 my-2" @click="$router.push('/product')">
            ثبت سفارش
          </div>
        </div>
      </v-tab-item>
      <v-tab-item>
        <div v-if="allBaskets.payed">
          <v-card
            v-for="item in allBaskets.payed"
            :key="item.id"
            color="basil"
            class="ma-3 order_card_style"
          >
            <ProgressOrders v-if="tab == 1" :order="item" />
          </v-card>
        </div>
        <div v-else class="text-center my-8">
          <img src="/icon/no-order.svg" width="200" />
          <div>شما سفارش پرداخت شده ای ندارید.</div>
        </div>
      </v-tab-item>
      <v-tab-item>
        <div v-if="allBaskets.completed">
          <v-card
            v-for="item in allBaskets.completed"
            :key="item.id"
            color="basil"
            class="ma-3 order_card_style"
          >
            <ProgressOrders v-if="tab == 2" :order="item" />
          </v-card>
        </div>
        <div v-else class="text-center my-8">
          <img src="/icon/no-order.svg" width="200" />
          <div>شما سفارش تحویل شده ندارید.</div>
        </div>
      </v-tab-item>
      <v-tab-item>
        <div v-if="allBaskets.canceled">
          <v-card
            v-for="item in allBaskets.canceled"
            :key="item.id"
            color="basil"
            class="ma-3 order_card_style"
          >
            <ProgressOrders v-if="tab == 3" :order="item" />
          </v-card>
        </div>
        <div v-else class="text-center my-8">
          <img src="/icon/no-order.svg" width="200" />
          <div>سفارشات شما تاکنون لغو نشده اند.</div>
        </div>
      </v-tab-item>
      <v-tab-item>
        <div v-if="allBaskets.waiting">
          <v-card
            v-for="item in allBaskets.waiting"
            :key="item.id"
            color="basil"
            class="ma-3 order_card_style"
          >
            <ProgressOrders @cancelPay="getOrders" v-if="tab == 4" :order="item" />
          </v-card>
        </div>
        <div v-else class="text-center my-8">
          <img src="/icon/no-order.svg" width="200" />
          <div>سفارشات شما تاکنون در انتظار پرداخت اند.</div>
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
      loading_items: false,
      tab: null,
      allBaskets: {},
    };
  },
  computed: {
    scroll_to() {
      return this.$vuetify.breakpoint.mdAndUp ? 0 : 300;
    },
  },
  watch: {},
  mounted() {
    this.$store.dispatch("setPageTitle", this.title);
    if (Boolean(this.$store.state.auth.user)) {
      this.getOrders();
    }
  },
  methods: {
    // open , waiting , payed , completed , canceled
    getOrders() {
      this.loading_items = true;
      let orders = [];
      this.$reqApi("/shop/basket")
        .then((res) => {
          orders = res.model.data;
          if (orders.length > 0) {
            const baskets = {
              open: orders?.filter((item) => item.status == "open"),
              waiting: orders?.filter((item) => item.status == "waiting"),
              payed: orders?.filter((item) => item.status == "payed"),
              completed: orders?.filter((item) => item.status == "completed"),
              canceled: orders?.filter((item) => item.status == "canceled"),
            };
            this.allBaskets = baskets;
            this.loading_items = false;
            console.log("this.orders > baskets waiting>>", baskets, [this.loading_items]);
          }
        })
        .catch((err) => {
          this.loading_items = false;
        });
    },
  },
};
</script>
