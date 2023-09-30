<template>
  <div>
    <v-card class="pb-3 rounded-lg box-shadow-none mx-3">
      <OrderDetails v-if="details" :basket="details"  />
    </v-card>
  </div>
</template>
<script>
import OrderDetails from "@/components/orders/OrderDetails.vue";
export default {
  layout: "profile",
  components: { OrderDetails },
  data() {
    return {
      title: "جزئیات سفارش",
      loading: false,
      details: null,
      items: []
    };
  },
  watch: {
    loading() {
      this.$store.dispatch("setTopLoader", this.loading);
    },
  },
  mounted() {
    this.$store.dispatch("setPageTitle", this.title);
    if(this.$route.params.id)
    this.getorders(this.$route.params.id);
  },
  methods: {
    getorders(id) {
      this.loading = true
      this.$reqApi("/basket/show",{id})
        .then((response) => {
          this.details = response.data
          this.loading = false
        })
        .catch((error) => {});
    },
  },
};
</script>
<style scoped></style>
