<template>
  <v-card class="elevation-0 pa-5">
    <div v-for="(item, index) in payment_list" :key="index" v-if="!loading">
      <v-card-text class="pa-3 elevation-2 my-2 card-style">
        
        <span>
          <v-icon small :color="item.color"> fiber_manual_record </v-icon>
          {{ item.text }}
        </span>
        <br />
        <small>
          مبلغ تراکنش:
          {{ $price(item.price) }}
          ریال
        </small>
        <br />
        <small>
          شماره تراکنش :
          {{ item.transaction_number }}
        </small>
        <br />
        <small>
          وضعیت تراکنش :
          {{ $getItemEnum($store.state.static.status_pay, item.status) }}
        </small>
      </v-card-text>
    </div>
    <v-card-text
    v-if="!loading && extra_data.length  > 0"
      @click="seeMore"
      class="pa-3 elevation-0 my-2 card-style primary--text d-flex align-center hover-class"
    >
      <span v-if="see_more"> مشاهده بیشتر </span>
      <span v-else> بستن </span>

      <v-divider class="mx-2"></v-divider>
      <v-icon  v-if="see_more"> keyboard_arrow_down </v-icon>
      <v-icon v-else> 
keyboard_arrow_up
 </v-icon>
    </v-card-text>
    <div class="text-center my-15" v-if="loading">
      <v-progress-circular
        color="primary"
        size="35"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-card
      v-if="!loading && payment_list.length < 1"
      class="pb-8 box-shadow-none rounded-lg"
    >
      <div class="text-center">
        <v-icon class="mt-8" size="60">receipt_long</v-icon>
        <div class="font_14">برای شما تراکنشی ثبت نشده</div>
      </div>
    </v-card>
  </v-card>
</template>
<script>
export default {
  layout: "profile",
  data() {
    return {
      title: " تراکنش های بانکی من",
      loading: false,
      see_more: true,
      amount: "",
      items: [],
      payment_list: [],
      extra_data: [],
      wallet_balance: {
        score_wallt: 0,
        cash_wallt: 0,
        credit_wallt: 0,
      },
    };
  },

  beforeMount() {
    this.loading = true;
    this.getPayments();
  },
  methods: {
    getPayments() {
      this.$reqApi("shop/payment")
        .then((res) => {
          let data = res.model.data;
          for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if (element.status == "wait") {
              element["color"] = "primary";
            } else if (element.status == "payed") {
              element["color"] = "green";
            } else if (element.status == "cancled") {
              element["color"] = "error";
            } else {
              element["color"] = "grey";
            }
          }
          this.payment_list = data.splice(0, 4);
          this.extra_data = data.splice(4);
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    seeMore() {
    
      let data = this.extra_data;
      if (Boolean(this.see_more)) {
        for (let index = 0; index < data.length; index++) {
        const element = data[index];
        this.payment_list.push(element);
      }
      this.see_more = false
      }else{
        let items = this.payment_list
        this.payment_list = items.splice(0 , 4)
        this.see_more = true
      }

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
  background-color: rgb(238, 238, 238);
  cursor: pointer;
}
</style>
