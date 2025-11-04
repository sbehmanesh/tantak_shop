<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800">
      <v-card>
        <!-- دکمه بستن -->
        <v-col cols="12" class="text-end">
          <v-btn icon @click="closeDialog">
            <v-icon>close</v-icon>
          </v-btn>
        </v-col>

        <v-container fluid>
          <!-- لیست محصولات -->
          <v-row dense>
            <v-col v-for="item in items" :key="item.id" cols="12" md="4">
              <v-card height="358px" class="product-card elevation-2">
                <v-img
                  :src="$getImage(item.product.main_image)"
                  height="145px"
                  class="rounded-t-lg"
                  contain
                ></v-img>

                <v-card-title class="d-flex justify-space-between align-center">
                  <small>{{ item.product.name }}</small>
                  <v-chip color="primary" text-color="white" small>
                    {{ item.number }} عدد
                  </v-chip>
                </v-card-title>

                <v-card-text>
                  <div class="grey--text text--darken-2 mb-2">
                    <small>{{ item.information }}</small>
                  </div>

                  <div class="grey--text">
                    <small class="font-weight-bold">بارکد:</small>
                    {{ item.full_barcode }}
                  </div>

                  <v-divider class="my-2"></v-divider>

                  <div class="d-flex justify-space-between">
                    <small>قیمت واحد:</small>
                    <small class="font-weight-medium">
                      {{ item.price.toLocaleString() }} تومان
                    </small>
                  </div>

                  <div class="d-flex justify-space-between">
                    <small>جمع کل:</small>
                    <small class="primary--text font-weight-bold">
                      {{ (item.price * item.number).toLocaleString() }} تومان
                    </small>
                  </div>
                </v-card-text>

                <!-- <v-card-actions class="justify-end">
                  <v-btn color="primary" text small @click="viewProduct(item.product.id)">
                    مشاهده محصول
                    <v-icon right small>mdi-chevron-left</v-icon>
                  </v-btn>
                </v-card-actions> -->
              </v-card>
            </v-col>
          </v-row>

          <!-- نمایش مجموع کل سبد -->
          <v-divider class="my-4"></v-divider>
          <v-row class="justify-space-between align-center pa-3">
            <v-col cols="12" md="6">
              <div class="text-h6">
                مجموع کل سبد:
                <span class="primary--text font-weight-bold">
                  {{ totalPrice.toLocaleString() }} تومان
                </span>
              </div>
            </v-col>

            <v-col cols="12" md="6" class="text-end">
              <v-btn color="success" large @click="payBasket">
                <v-icon left>mdi-credit-card-check-outline</v-icon>
                ادامه پرداخت
              </v-btn>
            </v-col>
            <Factory
              v-if="showFactory && !loading && Boolean(resultPay)"
              :dialog="showFactory"
              :data="resultPay"
              @cancelPay="cancelPay"
            />
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Factory from "@/components/orders/Factory.vue";
export default {
  components: {
    Factory,
  },
  props: {
    dialog: {
      default: false,
    },
    orederId: {
      default: false,
    },
  },
  data() {
    return {
      items: [],
      resultPay: {},
      loading: false,
      showFactory: false,
    };
  },
  computed: {
    // محاسبه مجموع کل قیمت سبد
    totalPrice() {
      return this.items.reduce((sum, item) => {
        return sum + item.price * item.number;
      }, 0);
    },
  },
  mounted() {
    if (Boolean(this.orederId)) {
      this.$reqApi("shop/basket-item/public-list", { basket_id: this.orederId })
        .then((res) => {
          this.items = res.model.data;
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    payBasket() {
      this.loading = true;
      let only_price = 1;
      this.$reqApi("shop/basket/pay-by-user", {
        basket_id: this.orederId,
        only_price: only_price,
      })
        .then((res) => {
          this.resultPay = res;
          this.showFactory = true;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;

          console.error(err);
        });
    },
    viewProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    cancelPay(){
        this.closeDialog()
        this.showFactory = false
        this.$emit('cancelPay')
    }
  },
};
</script>

<style scoped>
.product-card {
  border-radius: 12px;
  transition: all 0.25s ease;
  cursor: pointer;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}
small {
  font-size: 11px;
}
</style>
