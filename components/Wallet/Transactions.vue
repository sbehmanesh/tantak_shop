<template>
    <v-card class="elevation-0 pa-5">
      <div >
        <v-card class="text-center pa-2 elevation-0  title-card"  style="border-radius: 10px;"  color="#dedede14">
          <span class="mx-2  ">
            <v-icon> history </v-icon>
            تاریخچه تراکنش ها
          </span>
    
        </v-card>
        <v-row class="mt-2" v-if="!loading">
          <v-col
            cols="12"
            md="6"
            v-for="(i, index) in transaction_list"
            :key="index"
          >
            <v-card class="elevation-0" color="#dedede14">
              <v-card-text class="elevation-2 card-style ma-0">
                <strong class="font_15">
                  #
                  {{ i.pay_text }}
                  <small>
                    (
                    {{ $getItemEnum($store.state.static.wallet_type, i.type) }} )
                  </small>
                </strong>
                <br />
                <small>
                  تاریخ ثبت :
                  {{ $toJalali(i.created_at, "YYYY-MM-DD", "jYYYY/jMM/jDD") }}
                </small>
                <br />
                <small>
                  نوع :
                  {{ $getItemEnum($store.state.static.wallet_kind, i.kind) }}
                </small>
                <br />
                <small>
                  تاریخ پرداخت :
                  {{ $toJalali(i.paid_date, "YYYY-MM-DD", "jYYYY/jMM/jDD") }}
                </small>
                <br />
                <small>
                  مقدار :
                  {{ $price(i.amount) }} (ریال)
                </small>
                <br />
                <small v-if="i.description">
                  توضیحات :‌
                  {{ i.description }}
                </small>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="mt-2" v-if="loading">
          <v-col cols="12" md="6" v-for="n in 4" :key="n">
            <v-card class="elevation-0"  color="#dedede14">
              <v-card-text class="elevation-2 card-style ma-0">
                <v-skeleton-loader
                  class="mx-auto"
                  type="text@5"
                ></v-skeleton-loader>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-card
     v-if="!loading && transaction_list.length == 0"
      class="pb-8 box-shadow-none rounded-lg"
    >
      <div class="text-center">
        <v-icon class="mt-8" size="60">receipt_long</v-icon>
        <div class="font_14">
   تاکنون تراکنشی ثبت نشده 
        </div>
      </div>
    </v-card>
      </div>
    </v-card>
  </template>
  <script>
  export default {
    data() {
      return {
        loading: false,
        transaction_list: [],

      };
    },
  
    beforeMount() {
      if (
        Boolean(this.$store.state.auth.user) &&
        Object.keys(this.$store.state.auth.user).length > 0
      ) {
        this.loading = true;
        this.getTransactions();
      }
    },
    methods: {

      getTransactions() {
        this.$reqApi("/shop/wallet")
          .then((res) => {
            let data = res.model.data;
  
            let sort_items = data.sort((a, b) => {
              a.created_at - b.created_at;
            });
   
            this.transaction_list =     sort_items.splice(0,6);

  
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
    border-radius: 10px !important;
    border: 1px solid #00000038;
  }
  .title-card{
    border-radius: 20px 0px 20px 0px !important;
    border: 1px solid #00000038 !important;
    background-color: #dedede14 !important;
  }


  </style>
  