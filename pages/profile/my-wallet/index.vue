<template>
  <v-card class="elevation-0 pa-5">
    <MyWallet />
    <div class="mt-15">
      <Transactions />
    </div>
  </v-card>
</template>
<script>
import Transactions from "@/components/Wallet/Transactions.vue";
import MyWallet from "@/components/Wallet/MyWallet.vue";
export default {
  components: { MyWallet  , Transactions},
  layout: "profile",
  data() {
    return {
      title: "کیف پول من",
      loading: false,
      amount: "",
      items: [],
      transaction_list: [],
      wallet_balance: {
        score_wallt: 0,
        cash_wallt: 0,
        credit_wallt: 0,
      },
    };
  },

  beforeMount() {

  },
  methods: {

 

  },
};
</script>
<style>
.card-style {
  border-radius: 10px !important;
  border: 1px solid #00000038;
}
.hover-class:hover {
  background-color: rgb(240, 255, 242);
  cursor: pointer;
}
</style>
