<template>
    <div>
        <v-row class="justify-center">
      <v-col cols="6" md="3" class="text-center">
        <v-card-text class="pa-3 elevation-2 my-2  card-style">
          کیف پول نقدی
        </v-card-text>
      </v-col>
      <v-col cols="6" md="3"  class="text-center">
        <v-card-text class="pa-3 elevation-2 my-2  card-style">
          کیف پول نقدی
        </v-card-text>
      </v-col>
    </v-row>
      <!-- <v-expansion-panels>
        <v-expansion-panel class="card-style hover-class">
          <v-expansion-panel-header expand-icon="add_circle">
            افزایش موجودی نقدی
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div cols="12" class="d-flex align-center">
              <v-col cols="8" md="9">
                <amp-input
                rules="require"
                  text=" مبلغ  را وارد کنید (ریال)"
                  v-model="amount"
                  is-price
                />
              </v-col>
              <v-col cols="4" md="3">
                <amp-button
                  text="تایید"
                  block
                  class="green mt-2"
                  height="38"
                  :disabled="!Boolean(amount)"
                  @click="walletCharging"
                />
              </v-col>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels> -->
    </div>
  </template>
  <script>
  
  export default {

    data() {
      return {
        loading: false,
        amount: "",
        url: "",
        wallet_balance: {
          score_wallt: 0,
          cash_wallt: 0,
          credit_wallt: 0,
        },
      };
    },
  
    beforeMount() {
        console.log("ssds");
        console.log("ssds");
        console.log("ssds");
        console.log("ssds");
        console.log("ssds");
        console.log("ssds");
        console.log("ssds");
        console.log("ssds");
        console.log("ssds");
        console.log("ssds");

    },
    watch:{
      url(){
          if (Boolean(this.url)) {
              this.$router.push(this.url);
          }
      }
    },
    methods: {
      walletCharging() {
          this.$reqApi("/shop/wallet/recharge", { amount: this.amount })
            .then((res) => {
                if (Boolean(res)) {
                  this.url = res
                  console.log([res]);
  
                }
              this.loading = false;
            })
            .catch((error) => {
              this.loading = false;
            });
      },
    },
  };
  </script>
  <style scoped>
  .card-style {
    border-radius: 5px !important;
    border-bottom: 1px solid #fa960038 !important;
    cursor: pointer;
  }
  
  .hover-class:hover {
    background-color: rgb(248, 246, 246);
    cursor: pointer;
  }
  </style>
  