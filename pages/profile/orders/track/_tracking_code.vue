<template>
  <div>
    <OrderTrack :code="$route.params.tracking_code" />

    <div :class="$vuetify.breakpoint.mdAndUp ? 'mx-6' : 'mx-2 mt-4'" v-if="!loading">
      <v-card class="pa-3 rounded-lg box-shadow-none mx-3" v-if="!details">
        <div class="d-flex justify-center my-5">
          <span class="font_20"
            >سفارشی با این کد ثبت نشده است<br />
            <span
              class="font_14 d-flex justify-center mt-4 blue--text pointer"
              @click="$router.push('/')"
              >بازگشت به صفحه اصلی</span
            >
          </span>
        </div>
      </v-card>
      <v-card class="pa-3 rounded-lg box-shadow-none mx-3" v-if="details">
        <OrderDetails v-if="details.items.length != 0" :basket="details" :show-details="false" />
        <div
          class="d-flex justify-center my-5"
          v-if="details.items.length == 0"
        >
          <span class="font_20"
            >سفارشی با این کد ثبت نشده است<br />
            <span
              class="font_14 d-flex justify-center mt-4 blue--text pointer"
              @click="$router.push('/profile/orders/track')"
              >بازگشت به صفحه قبل</span
            >
          </span>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
import OrderDetails from "@/components/orders/OrderDetails.vue";
import OrderTrack from "@/components/orders/OrderTrack";
export default {
  components: { OrderDetails, OrderTrack },
  data() {
    return {
      title: "جزئیات سفارش",
      details: null,
      loading: false,
      items: [],
    };
  },
  watch: {
    loading() {
      this.$store.dispatch("setTopLoader", this.loading);
    },
  },
  mounted() {
    this.$store.dispatch("setPageTitle", this.title);
    if (this.$route.params.tracking_code)
      this.getorders(this.$route.params.tracking_code);
  },
  methods: {
    getorders(tracking_code) {
      this.loading = true;
      this.$reqApi("/basket/show", { tracking_code })
        .then((response) => {
          this.loading = false;
          this.$scrollTo(0,200)
          this.details = response.data;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
  },
};
</script>
<style scoped></style>
