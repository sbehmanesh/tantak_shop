<template>
  <div>
 
    <v-card-text class="pa-3 elevation-2 my-2 d-flex card-style">
      <v-icon> arrow_left </v-icon>
      کیف پول نقدی
      <v-spacer></v-spacer>
      {{ $price(wallet_balance.cash_wallt) }}

      <small class="mx-1">ریال</small>
    </v-card-text>
    <v-card-text class="pa-3 elevation-2 my-2 d-flex card-style">
      <v-icon> arrow_left </v-icon>
      کیف پول اعتباری <v-spacer></v-spacer
      >{{ $price(wallet_balance.credit_wallt) }}

      <small class="mx-1">ریال</small>
    </v-card-text>
    <v-card-text class="pa-3 elevation-2 my-2 d-flex card-style">
      <v-icon> arrow_left </v-icon>
      کیف پول امتیازی <v-spacer></v-spacer>
      {{ $price(wallet_balance.score_wallt) }}
    </v-card-text>

    <!-- <ActionWallet /> -->
  </div>
</template>
<script>
import ActionWallet from "@/components/Wallet/ActionWallet.vue";

export default {
  components: {
    ActionWallet,
  },
  data() {
    return {
      loading: false,
      amount: "",
      wallet_balance: {
        score_wallt: 0,
        cash_wallt: 0,
        credit_wallt: 0,
      },
    };
  },

  beforeMount() {
    if (
      Boolean(this.$store.state.auth.user) &&
      Object.keys(this.$store.state.auth.user).length > 0
    ) {
      this.loading = true;
      this.setWallet(this.$store.state.auth.user);
    }
  },

  methods: {
    setWallet(user) {
      this.wallet_balance.score_wallt = user.score_wallt;
      this.wallet_balance.cash_wallt = user.cash_wallt;
      this.wallet_balance.credit_wallt = user.credit_wallt;
    },
  },
};
</script>
<style scoped>
.card-style {
  border-radius: 10px !important;
  border: 1px solid #00000038;
}

.hover-class:hover {
  background-color: rgb(248, 246, 246);
  cursor: pointer;
}
</style>
