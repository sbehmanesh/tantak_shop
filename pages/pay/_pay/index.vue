<template>
  <v-row class="d-flex justify-center align-center">
    <v-card
      class="my-15 px-3"
      width="400"
      style="border-radius: 10px !important"
    >
      <v-col class="text-center">
        <v-icon large> shopping_basket </v-icon>
        <br />
        <span class="font_12"> جزییات پرداخت </span>
      </v-col>
      <v-card-text>
        <v-row
          class="align-center"
          v-if="!load_items && items && Object.keys(items).length > 0"
        >
          <v-col cols="12" class="my-1">
            <v-row class="align-center px-2 py-1">
              <h5>
                <v-icon>arrow_left</v-icon>
                شماره فاکتور سبد
              </h5>
              <v-spacer></v-spacer>
              <h5 v-if="items.basket.factor_number">
                {{ items.basket.factor_number }}
              </h5>
            </v-row>
          </v-col>
          <v-col cols="12" class="my-1">
            <v-row class="align-center px-2 py-1">
              <h5>
                <v-icon>arrow_left</v-icon>
                مقدار تراکنش
              </h5>
              <v-spacer></v-spacer>

              <h5 v-if="items.price">
                <small> ( ریال )</small>

                {{ $price(items.price) }}
              </h5>
            </v-row>
          </v-col>

          <v-col cols="12" class="my-1">
            <v-row class="align-center px-2 py-1">
              <h5>
                <v-icon>arrow_left</v-icon>
                شماره تراکنش
              </h5>
              <v-spacer></v-spacer>

              <h5 v-if="items.transaction_number">
                {{ items.transaction_number }}
              </h5>
            </v-row>
          </v-col>
          <v-col cols="12" class="mt-2">
            <v-alert color="teal" dense shaped text type="info">
              <small>
                <small>
                  {{ text_log }}
                </small>
              </small>
            </v-alert>
          </v-col>
        </v-row>
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
    items: [],
  }),
  mounted() {
    console.log("params");
    let id = this.$route.params.pay;
    if (Boolean(id)) {
      this.loadDate(id);
    }
  },
  methods: {
    loadDate(id) {
      console.log("SSSS = > ", id);
      this.$reqApi("/shop/payment/show", { link_id: id })
        .then((res) => {
          console.log("res ----? ", "ewsdasd");
          this.items = res.data;
          console.log("items", this.items);
          let status = this.$getItemEnum(this.$store.state.status_pay);
          this.status = status;
          this.text_log = res.data.text;
          this.load_items = false;
        })
        .catch((err) => {
          this.load_items = false;
        });
    },
  },
};
</script>
