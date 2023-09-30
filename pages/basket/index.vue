<template>
  <div>
    <!-- <Loading v-if="!basket"/> -->

    <!-- basket with no item -->
    <div
      v-if="basket && basket.items.length == 0"
      style="height: 50vh"
      class="d-flex align-center justify-center overflow-auto ma-md-9 ma-4"
    >
      <div class="py-10">
        <span class="text--secondary mt-4">سبد خرید شما خالی هست </span>
      </div>
    </div>
    <!-- basket with no item end  -->
    <div class="ma-md-9 ma-4">
      <v-row v-if="basket && basket.items.length != 0" >
        <v-col cols="12" md="8">
          <AddressCard
            v-if="basket"
            :basket="basket"
            @dialogshow="Update_dialog_show = true"
          />
          <v-card class="pa-4 mt-3 border10">
            <v-col cols="12" style="background: #f1ddfc">
              <v-row>
                <v-col >
                  <div>سبد خرید</div>
                </v-col>
              </v-row>
            </v-col>
            <BasketProducts :key="basket_product" v-if="basket" :basket="basket" />
          </v-card>
        </v-col>
        <v-col cols="12" md="4" >
          <Factor v-if="basket" :go_pay="go_pay" :basket="basket" @dialogshow="showDialog" />
          <discount-code v-if="basket && basket.discount == 0" class="mt-3"/>
        </v-col>
        <v-col class="col-12">
          <product-slider 
          v-if="basket.special_suggestions.length != 0" 
          :products="basket.special_suggestions" 
          title="پیشنهاد ویژه تن تاک برای شما" 
          />
        </v-col>
      </v-row>
    </div>

    <!-- basket form dialog -->
    <BasketUpdateForm
      v-model="Update_dialog_show"
      @successUpdate="closeUpdateDialog"
    />
    <BasketFinalFactor v-model="factor_dialog_show" />
    <!-- basket form dialog end -->
  </div>
</template>

<script>
import AddressCard from "@/components/basket/AddressCard.vue";
import BasketProducts from "@/components/basket/BasketProducts.vue";
import Factor from "@/components/basket/Factor.vue";
import BasketFinalFactor from "~/components/basket/BasketFinalFactor.vue";
import BasketUpdateForm from "~/components/basket/BasketUpdateForm.vue";
import DiscountCode from "~/components/basket/DiscountCode.vue";
import ProductSlider from '~/components/Slider/ProductSlider.vue';
export default {
  components: {
    AddressCard,
    BasketProducts,
    Factor,
    BasketFinalFactor,
    BasketUpdateForm,
    DiscountCode,
    ProductSlider,
  },

  data: () => ({
    title: "سبد خرید",
    basket: null,
    go_pay: false,
    basket_product:0,
    Update_dialog_show: false,
    factor_dialog_show: false,
    next_dialog_active: false,
    loading: false,
  }),
  mounted() {
    this.$store.dispatch("setPageTitle", this.title);
    this.getBasket();
  },
  watch: {
    "$store.state.base.basket.refresh"() {
      this.basket = this.$store.state.base.basket.data;
      if(this.$store.state.base.basket.data.need_update_error){
        this.basket_product++
      }
    },
    loading() {
      this.$store.dispatch("setTopLoader", this.loading);
    },
  },
  methods: {
    getBasket() {
      this.loading = true;
      this.$store.dispatch("base/getBasket");
      // ایجاد تاخیر برای نمایش لودر در فاصله لود سبد خرید کاربر
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    closeUpdateDialog() {
      this.Update_dialog_show = false;
      if (this.next_dialog_active) {
        this.go_pay = true;
        this.next_dialog_active = false;
      }
    },
    showDialog() {
      if(this.checkBasketNeedUpdate(this.basket)){
        this.Update_dialog_show = true;
        this.next_dialog_active = true;
      }else{
        this.go_pay = true;
        this.next_dialog_active = false;
      }
      
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
