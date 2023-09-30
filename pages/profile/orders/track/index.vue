<template>
  <OrderTrack />
</template>

<script>
import OrderTrack from "@/components/orders/OrderTrack";

export default {
  components: { OrderTrack },

  data: () => ({
    title: "پیگیری سفارشات",
  }),
  mounted() {
    this.$store.dispatch("setPageTitle", this.title);
  },
  methods: {},
};
</script>


