<template>
    <v-container>
      <v-card class="pa-3 rounded-lg box-shadow-none mx-3" v-if="!loading" >
        <div class="d-flex justify-center my-5" v-if="error">
          <span class="font_20"
            >{{error}}<br />
            <span class="font_14 d-flex justify-center mt-4 blue--text pointer" @click="$router.push('/')">بازگشت به صفحه اصلی</span>
          </span>
        </div>
        <div v-if="basket">
          <v-col cols="12">
            <v-row align="center">
              <v-col  >
                <!-- <v-icon>mdi-arrow-right</v-icon> -->
                <span>جزئیات سفارش</span>
              </v-col>
              <v-col  class="align-last-left flex-grow-0">
                <v-btn
                :disabled="Boolean(error)" 
                color="primary" 
                style="letter-spacing:0" 
                class="pointer" 
                @click="pay"
                >
                  <v-icon>mdi-list-box-outline</v-icon>
                  <span class="font_14">پرداخت</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="px-0 pt-0">
            <v-divider></v-divider>
          </v-col>
          <!-- <v-col cols="12">
            <v-chip class="border10 chip-back">
              <span class="pl-1 font_10">تاریخ ثبت سفارش</span>
              <span class="font_12">{{ basket.date }}</span>
            </v-chip>
            <v-chip class="border10 chip2-back">
              <span class="pl-1 font_10">کد پیگیری سفارش</span>
              <span class="font_12">{{ basket.code }}</span>
            </v-chip>
          </v-col> -->
          <v-col cols="12">
            <v-row class="px-3">
              <div class="mr-md-5 ml-3 mb-1">
                <span class="font_12 gray--text">وضعیت : </span>
                <span class=" font_12">{{ getStatus(basket.status) }}</span>
              </div>
              <div class="mr-md-5 ml-3 mb-1">
                <span class="font_12 gray--text">شماره موبایل : </span>
                <span class=" font_12">{{ basket.phone }}</span>
              </div>
              <div class="mr-md-5 ml-3 mb-1">
                <span class="font_12 gray--text">آدرس : </span>
                <span class=" font_12">{{ basket.address }}</span>
              </div>
              <div class="mr-md-5 ml-3 mb-1" >
                <span class="font_12 gray--text">تحویل گیرنده : </span>
                <span class=" font_12"
                  >{{ basket.first_name }} {{ basket.last_name }}</span
                >
              </div>
              <div class="mr-md-5 ml-3 mb-1" >
                <span class="font_12 gray--text">هزینه ارسال:</span>
                {{Number(basket.delivery_price).toLocaleString()}}
                <span class="font_12">ریال</span>
              </div>
              <div class="mr-md-5 ml-3 mb-1" >
                <span class="font_12 gray--text">مجموع قیمت:</span>
                {{Number(basket.price).toLocaleString()}}
                <span class="font_12">ریال</span>
              </div>
            </v-row>
          </v-col>
          <v-col cols="12" class="px-0">
            <v-divider></v-divider>
          </v-col>
          <BasketProducts v-if="basket" :basket="basket"/>
        </div>
      </v-card>
    </v-container>
  </template>
  <script>
  import BasketProducts from "@/components/basket/BasketProducts.vue";

  export default {
    components: {BasketProducts},
    data() {
      return {
        title: "جزئیات سفارش",
        basket: null,
        loading: null,
        error:null,
        items: [],
      };
    },
    mounted() {
      this.$store.dispatch("setPageTitle", this.title);
      if (this.$route.params.link_id)
        this.getorders(this.$route.params.link_id);
    },
    watch:{
      loading() {
        this.$store.dispatch("setTopLoader", this.loading);
      },
    },
    methods: {
      getorders(link_id) {
        this.loading = true
        this.$reqApi("/basket/show", { link_id })
        .then((response) => {
          this.loading = false
          this.basket = response.basket;
          this.error = response?.message;
        })
        .catch((error) => {
            this.loading = false
            this.error = error?.message
        });
      },
      getStatus(status){
        let status_text = ''
        this.$store.state.static.basket_status.forEach(each => {
          if(each.value == status)status_text = each.text
        });
        return status_text
      },
      pay(){
        this.loading = true
        let form = {
          link_id:this.$route.params.link_id
        }
        this.$reqApi("/basket/pay-by-link",form)
        .then(res => {
          this.loading = false
          window.location.href = res.url
        })
        .catch(error => {
          this.$toast.error("خطایی به وجود امده")
        })
      },
    },
  };
  </script>
  <style scoped></style>
  