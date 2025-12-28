<template>
  <v-card class="pa-3 border10">
    <v-col cols="12" style="background: #f1ddfc">
      <div>فاکتور خرید</div>
    </v-col>
    <div class="d-flex justify-space-between pt-4">
      <span class="font_14">قیمت کالاها ({{ basket.items.length }})</span>
      <span class="font_14"
        >{{ Number(basket.price).toLocaleString() }}
        <span class="font_12">ریال</span>
      </span>
    </div>
    <v-col cols="12" class="px-0">
      <v-divider></v-divider>
    </v-col>
    <div class="d-flex justify-space-between align-center">
      <span class="font_14">روش ارسال</span>
      <v-radio-group
        v-if="delivery_method"
        v-model="delivery_method_id"
        class="ma-0 pa-0"
        hide-details
      >
        <v-radio
          v-for="item in delivery_method"
          :key="item.id"
          :value="item.id"
          :label="item.title"
        ></v-radio>
      </v-radio-group>
    </div>
    <v-col cols="12" class="px-0">
      <v-divider></v-divider>
    </v-col>
    <div class="d-flex justify-space-between">
      <span class="font_14">هزینه ارسال</span>
      <span class="font_14"
        >{{ Number(post_price || pay_at_delivery_price).toLocaleString() }}
        <span class="font_12">ریال</span>
        <span class="font_12" v-if="pay_at_delivery_price">
          - پرداخت در محل</span
        ></span
      >
    </div>
    <v-col cols="12" class="px-0">
      <v-divider></v-divider>
    </v-col>
    <div
      v-if="discount_price || Product_discount_price"
      class="d-flex justify-space-between pt-3"
    >
      <span class="font_14 error--text">تخفیف</span>
      <span class="font_14 error--text">
        {{
          (
            Number(discount_price) + Number(Product_discount_price)
          ).toLocaleString()
        }}
        <span class="font_12 error--text">ریال</span>
      </span>
    </div>
    <v-col
      v-if="discount_price || Product_discount_price"
      cols="12"
      class="px-0"
    >
      <v-divider></v-divider>
    </v-col>
    <div class="d-flex justify-space-between">
      <span class="font_14">مبلغ قابل پرداخت</span>
      <span class="font_14">
        {{
          (
            Number(basket.price) +
            Number(post_price) -
            Number(discount_price) -
            Number(Product_discount_price)
          ).toLocaleString()
        }}
        <span class="font_12">ریال</span></span
      >
    </div>
    <v-col cols="12" class="px-0">
      <v-divider></v-divider>
    </v-col>
    <v-col cols="12" class="px-0 pb-0 d-flex justify-center">
      <amp-button
        @click="openDialog"
        text="تکمیل پرداخت"
        :loading="loading"
        :disabled="disabled"
        color="success"
        height="40"
        width="100%"
      ></amp-button>
    </v-col>

    <!-- otp for existin users -->
    <FinalOTP v-if="basket" v-model="otpDialog" :phone="basket.phone" @OTPSuccess="OTPSuccess"/>
    <!-- otp for existin users end -->

  </v-card>
</template>

<script>

import FinalOTP from './FinalOTP.vue';

export default {
  components:{FinalOTP},
  props: {
    basket: {
      type: Object,
    },
    go_pay:{
      type:Boolean,
      default:false
    }
  },
  data: () => ({
    Product_discount_price: 0,
    pay_at_delivery_price: 0,
    new_basket_with_error:null,
    price_changed_items: null,
    delivery_method_id: null,
    stock_lack_items: null,
    delivery_method: null,
    discount_price: 0,
    otpDialog:false,
    post_price: 0,
    loading: false,
    disabled:false,
  }),
  mounted() {
    this.fillDeliveryMethod();
    this.calcPostPrice();
    this.calcDiscountCodePrice();
    this.calcProductDiscountPrice();
  },
  watch: {
    delivery_method_id() {
      //call update basket
      if (
        this.basket && 
        this.basket.delivery_method_id != this.delivery_method_id
        ) {
          this.updateBasketDeliveryMethod();
          this.calcPostPrice();
      }
    },
    "$store.state.base.basket.refresh"() {
      this.fillDeliveryMethod();
      this.calcPostPrice();
    },
    "$store.state.base.discount.refresh"() {
      this.calcDiscountCodePrice();
    },
    go_pay(){
      if(this.go_pay){
        this.pay()
      }
    }
  },
  methods: {
    fillDeliveryMethod() {
      if (this.$store.state.base.delivery_method) {
        this.delivery_method = this.$store.state.base.delivery_method;
      }
      if (this.basket && this.basket.delivery_method_id) {
        this.delivery_method_id = this.basket.delivery_method_id;
      } else {
        this.delivery_method_id = this.delivery_method[0].id;
      }
    },
    openDialog() {
      if(this.checkBasketNeedUpdate(this.basket)){
        this.$emit("dialogshow", true);
      }else{
        this.pay()
      }
    },
    pay(){
      this.loading = true
      let form = {}
      let discount = this.$store.state.base.discount.data
      if(discount){
        form['code'] = discount.code
      }
      this.$reqApi("/basket/pay",form)
      .then(res => {
        this.loading = false
        if(res.login_required){
          this.otpDialog = true
        }else if(res.basket_change_required){
          this.new_basket_with_error = this.basket
          this.chackBasketError(res.data)
          this.calcNeedUpdateBasket()
          this.$toast.error("سبد نیاز به بروز رسانی دارد")
          this.$store.dispatch("base/updateBasketWithoutApi", this.new_basket_with_error)
        }else{
          window.location.href = res.url
        }
      })
      .catch()
    },
    OTPSuccess(){
      this.otpDialog = false
      this.pay();
    },
    chackBasketError(data){
      if(data.stock_lack_items && data.stock_lack_items.length != 0){
          this.stock_lack_items = data.stock_lack_items
      }
      if(data.price_changed_items && data.price_changed_items.length != 0){
          this.price_changed_items = data.price_changed_items
      }
      this.new_basket_with_error['need_update_error'] = true
    },
    calcNeedUpdateBasket(){
      this.new_basket_with_error.items?.forEach((each)=>{
        if(this.stock_lack_items){
          this.setStockLack(each)
        }
        if(this.price_changed_items){
          this.setPriceChange(each)
        }
      })
    },
    setStockLack(basket_item){
      this.stock_lack_items?.forEach((item)=>{
        if(basket_item.id == item.item_id){
          basket_item['stock_lack_items'] = true
          basket_item['remained_stock'] = item.remained_stock
        }
      })
    },
    setPriceChange(basket_item){
      this.price_changed_items?.forEach((item)=>{
        if(basket_item.id == item.item_id){
          basket_item['price_changed_items'] = true
          basket_item['new_price'] = item.new_price
        }
      })
    },
    updateBasketDeliveryMethod() {
      let form = {
        delivery_method_id: this.delivery_method_id,
        id: this.basket.id,
      }
      this.loading = true
      this.$store
        .dispatch("base/updateBasket", form)
        .then((res) => {
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.disabled = true;
          this.$toast.error("عملیات بروز رسانی روش ارسال انجام نشد");
        });
      // this.$store.dispatch(
      //   "base/updateBasketDeliveryMethod",
      //   this.delivery_method_id
      // );
    },
    calcPostPrice() {
      let selected = this.delivery_method.find(
        (each) => each.id == this.delivery_method_id
      );
      if (selected && selected != undefined) {
        if (selected.pay_at_delivery == 1) {
          this.post_price = 0;
          this.pay_at_delivery_price =
            Number(selected.base) +
            Number(this.basket.total_weight / 1000) * Number(selected.ratio);
        } else if (
          Number(selected.send_free_threshold)
          &&
          Number(selected.send_free_threshold) <= Number(this.basket.price)
        ) {
          this.post_price = 0;
        } else {
          this.post_price =
            Number(selected.base) +
            Number(this.basket.total_weight / 1000) * Number(selected.ratio);
        }
      }
      let discount = this.$store.state.base.discount.data;
      if (discount && discount.code_send_free == 1) {
        this.post_price = 0;
      }
    },
    calcDiscountCodePrice() {
      let discount = this.$store.state.base.discount.data;
      let basket = this.$store.state.base.basket.data;

      if (basket.discount != 0) {
        this.discount_price = Number(basket.discount);
        return;
      }
      if (!discount) return;

      if (discount.type == "percent") {
        this.discount_price =
          (Number(basket.price) * Number(discount.discount)) / 100;
      }
      if (discount.type == "amount") {
        this.discount_price = Number(discount.discount);
      }
      if (
        discount.code_max_discount &&
        discount.code_max_discount != 0 &&
        discount.code_max_discount < this.discount_price
      ) {
        this.discount_price = discount.code_max_discount;
      }
      if (discount.code_send_free == 1) {
        this.post_price = 0;
      }
    },
    calcProductDiscountPrice() {
      this.Product_discount_price = Number(this.basket.products_discount);
    },
    checkBasketNeedUpdate(basket){
      if(
        basket.country_division_id &&
        basket.delivery_method_id &&
        basket.postal_code &&
        basket.first_name &&
        basket.address && 
        basket.phone && 
        basket.id
      ){
        return false
      }else{
        return true
      }
    }
  },
};
</script>
