<template>
  <v-row class="d-flex justify-center align-center">
    <v-card class="my-15" width="500" style="border-radius: 10px !important">
      <v-col class="text-center primary" :class="color" v-if="!load_items">
        
        <v-icon large color="white"> credit_card </v-icon>
        <v-spacer></v-spacer>
        <span class="font_14 white--text"> جزییات پرداخت </span>
      </v-col>
      <v-card-text class="mt-4">
        <v-row
          class="align-center"
          v-if="!load_items && items && Object.keys(items).length > 0"
        >
          <v-col cols="12">
            <v-alert text dense :color="color" border="left">
              <v-row class="align-center px-5 py-4">
                <small> شماره فاکتور سبد </small>
                <v-spacer></v-spacer>
                <small v-if="items.basket.factor_number">
                  {{ items.basket.factor_number }}
                </small>
              </v-row>
            </v-alert>
          </v-col>
          <v-col cols="12" class="">
            <v-alert text dense :color="color" border="left">
              <v-row class="align-center px-5 py-4">
                <small> مقدار تراکنش </small>
                <v-spacer></v-spacer>

                <small v-if="items.price">
                  <small> ( ریال )</small>

                  {{ $price(items.price) }}
                </small>
              </v-row>
            </v-alert>
          </v-col>
          <v-col cols="12">
            <v-alert text dense :color="color" border="left">
              <v-row class="align-center px-5 py-4">
                <small> شماره تراکنش </small>
                <v-spacer></v-spacer>
                <small v-if="items.transaction_number">
                  {{ items.transaction_number }}
                </small>
              </v-row>
            </v-alert>
          </v-col>
          <v-col cols="12" class="mt-1">
            <v-alert :color="color" shaped prominent outlined dense type="info">
              <span>
                {{ status }}
              </span>
              <br />

              <small
                class="font_12 text-btn"
                @click="getPaymentLink"
                v-if="Boolean(this.$route.query.random_id) && !loading"
              >
                برای پرداخت تراکنش اینجا کلیک کنید
              </small>
              <small v-else >
                <v-col cols="12" md="5" class="pa-0 ma-0">
                  <small>
                    در حال انتقال به در گاه ...
                  </small>
             
                  <v-progress-linear indeterminate color="teal" />
                </v-col>
  
              </small>
            </v-alert>
          </v-col>
        </v-row>
        <v-col cols="12" class="text-center" v-if="!load_items">
          <v-btn text small color="black" @click="backToHome">
            <v-icon small> home </v-icon>
            <small> بازگشت به صفحه اصلی </small>
          </v-btn>
        </v-col>
        <div v-if="load_items" class="text-center">
          <v-progress-circular
            :size="30"
            color="grey"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>
export default {
  components: {},
  data: () => ({
    alert: true,
    title: "",
    status: "",
    text_log: "",
    load_items: true,
    loading: false,
    color: "",
    items: [],
  }),
  beforeMount() {
    if (this.$route.query.random_id) {
      let id = this.$route.query.random_id;
      this.loadDate(id);
    }
  },

  methods: {
    loadDate(id) {
      this.$reqApi("/shop/payment/show", { link_id: id })
        .then((res) => {
          this.items = res.data;

          this.status = " منتظر پرداخت شده";
          this.color = "teal lighten-2";

          this.text_log = res.data.text;
          this.load_items = false;
        })

        .catch((err) => {
          this.load_items = false;
        });
    },
    getPaymentLink() {
      let id = this.$route.query.random_id;
      this.loading = true;
      this.$reqApi("/shop/basket/pay-by-link", { link_id: id })
        .then((response) => {
          let url = response.url;
          window.open(url);
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    backToHome(){
      this.$router.push("/")
    }
  },
};
</script>
<style>
.text-btn {
  color: #099b9b !important;
  border-bottom: 1px solid #099b9b;
}
.text-btn:hover {
  cursor: pointer;
  color: #e74016 !important;
  border-bottom: 1px solid #e74016;
}
</style>
