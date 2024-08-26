<template>
  <v-row class="d-flex justify-center align-center">
    <v-card class="my-15" width="500" style="border-radius: 10px !important">
      <v-col class="text-center primary" :class="color" v-if="!load_items">
        <v-icon large color="white"> credit_card </v-icon>
        <v-spacer></v-spacer>
        <span class="font_12 white--text"> جزییات پرداخت </span>
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
                <small v-if="text_log"> ( {{ text_log }} ) </small>
              </span>
              <v-spacer></v-spacer>
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
  mounted() {
    let id = this.$route.params.pay;
    if (Boolean(id)) {
      this.loadDate(id);
    }
  },
  methods: {
    loadDate(id) {
      this.$reqApi("/shop/payment/show", { id: id })
        .then((res) => {
          this.items = res.data;

          switch (res.data.status) {
            case "wait":
              this.status = " منتظر پرداخت شده";
              this.color = "teal lighten-2";
              break;
            case "payed":
              this.status = " پرداخت شده";
              this.color = "success lighten-1";
              break;
            case "unpayed":
              this.status = "پرداخت نشده";
              this.color = "grey darken-2";
              break;
            case "reject":
              this.status = "کنسل شده";
              this.color = "error";
              break;
            case "cancled":
              this.status = "کنسل شده";
              this.color = "error";
              break;
            case "owdat":
              this.status = "عودت وجه";
              this.color = "primary";
              break;

            default:
              break;
          }

          this.text_log = res.data.text;
          this.load_items = false;
        })
        .catch((err) => {
          this.load_items = false;
        });
    },
    backToHome(){
      this.$router.push("/")
    }
  },
};
</script>
