<template>
  <div>
    <v-form v-model="valid" @submit.prevent="addToBasket" style="height: 100%">
      <v-row no-gutters style="height: 100%" class="justify-space-around">
        <v-col class="col-12 col-md-12 pa-3 pa-md-6">
          <v-row no-gutters class="flex-column" style="height: 100%">
            <v-col class="mb-3 flex-grow-0 d-flex align-center justify-center">
              <v-btn
                v-if="count_down_timer"
                width="100%"
                class="rounded-0 font_20"
                style="letter-spacing: 0"
                outlined
                color="error"
                x-large
              >
                <CountDown
                  v-if="count_down_timer"
                  :end_time="count_down_timer"
                />
              </v-btn>
            </v-col>
            <v-col class="flex-grow-0 d-flex align-center">
              <h1 class="font_22 font-weight-regular">{{ product.name }}</h1>
              <div class="primary--text font_12 px-3">
                <!-- <span>{{ product.comments.length }}</span> -->
                <span>دیدگاه</span>
              </div>
              <v-icon
                :class="[
                  'mr-auto',
                  'favorite-icon',
                  { 'favorite-icon--disabled': favoriteProcessing }
                ]"
                color="primary"
                @click="toggleFavorite"
              >
                {{ favorite ? "mdi-heart" : "mdi-heart-outline" }}
              </v-icon>
            </v-col>
            <v-divider class="my-3 primary"></v-divider>
            <v-col class="flex-grow-0 d-flex align-center">
              <div class="font_14 mb-3">
                <span>موجودی:</span>
                <!-- v-if="variations_data_1.length > 0" -->
                <span v-if="available" class="success--text">موجود در انبار</span>
                <span v-else class="error--text" >ناموجود</span>
              </div>
            </v-col>

            <v-form
              v-model="valid"
              @submit.prevent="submit()"
              :disabled="loading"
              class="rounded-0 pa-2 d-flex flex-column"
            >
              <v-col cols="12" md="7">
                <amp-select
                  starRight
                  :text="'انتخاب' + ' ' + variation1.title"
                  rules="require"
                  :items="variation1.items"
                  v-model="form.var1"
                />
                <amp-select
                  starRight
                  rules="require"
                  :disabled="!Boolean(form.var1)"
                  :text="'انتخاب' + ' ' + variation2.title"
                  :items="variation2.items"
                  v-model="form.var2"
                />
                <amp-select
                  starRight
                  :disabled="!Boolean(form.var2)"
                  rules="require"
                  :text="'انتخاب' + ' ' + variation3.title"
                  :items="variation3.items"
                  v-model="form.var3"
                />
              </v-col>
            </v-form>

            <!-- <v-col class="flex-grow-0 d-flex align-center">
            <amp-select text="انتخاب سایز :" :items="product.sizes" />
          </v-col> -->

            <div >
              <v-col v-if="$vuetify.breakpoint.mdAndUp" class="flex-grow-0">
                <span class="font_14">تعداد</span>
                <v-btn
                  class="d-flex elevation-0 pa-0 rounded-0"
                  outlined
                  color="primary"
                  large
                  style="letter-spacing: 0"
                >
                  <v-btn
                    v-if="switch_single_whole.select == 'single'"
                    min-width="unset"
                    @click="addProductCount"
                    text
                    aria-label="زیاد کردن تعداد"
                    class="elevation-0 d-flex justify-center align-center rounded"
                    style="width: 36px; height: 36px"
                  >
                    <v-icon size="24">mdi-plus</v-icon>
                  </v-btn>
                  <div
                    class="d-flex justify-center align-center text-center flex-grow-0 font_20 px-1"
                  >
                    <div>
                      {{ number }}
                    </div>
                  </div>
                  <v-btn
                    v-if="switch_single_whole.select == 'single'"
                    min-width="unset"
                    @click="removeProductCount"
                    text
                    aria-label="کم کردن تعداد"
                    class="elevation-0 d-flex justify-center align-center rounded"
                    style="width: 36px; height: 36px"
                  >
                    <v-icon size="24">mdi-minus</v-icon>
                  </v-btn>
                </v-btn>
              </v-col>
              <!-- <v-col v-if="product.keywords.length != 0" class="pt-3 flex-grow-1"> -->
              <v-col class="pt-3 flex-grow-1">
                <!-- <v-chip-group column>
              <v-icon color="primary">mdi-tag-multiple-outline</v-icon>
              <v-chip
                small
                outlined
                v-for="item in product.keywords"
                :key="item.id"
                nuxt
                :to="'/tag/' + item.value"
                color="primary"
                >{{ item.value }}</v-chip
              >
            </v-chip-group> -->
              </v-col>
              <v-col>
                <v-row no-gutters class="flex-column">
                  <v-col
                    class="flex-grow-0 d-flex align-center justify-space-between py-3"
                    v-if="!$vuetify.breakpoint.mdAndUp"
                  >
                    <div
                      class="d-flex elevation-0"
                      v-if="!$vuetify.breakpoint.mdAndUp"
                    >
                      <v-btn
                        outlined
                        color="primary"
                        min-width="unset"
                        @click="addProductCount"
                        text
                        aria-label="زیاد کردن تعداد"
                        class="elevation-0 d-flex justify-center align-center rounded"
                        style="width: 36px; height: 36px"
                      >
                        <v-icon size="24">mdi-plus</v-icon>
                      </v-btn>
                      <div
                        class="d-flex justify-center align-center text-center flex-grow-0 font_20 px-1"
                      >
                        <div
                          v-if="switch_single_whole.select == 'single'"
                          class="mx-2"
                        >
                          {{ number }}
                        </div>
                      </div>
                      <v-btn
                        outlined
                        color="primary"
                        v-if="switch_single_whole.select == 'single'"
                        min-width="unset"
                        @click="removeProductCount"
                        text
                        aria-label="کم کردن تعداد"
                        class="elevation-0 d-flex justify-center align-center rounded"
                        style="width: 36px; height: 36px"
                      >
                        <v-icon size="24">mdi-minus</v-icon>
                      </v-btn>
                    </div>
                    <!-- <div class="d-flex flex-column">
                      <span
                        class="px-2 font_14 error--text text-decoration-line-through"
      
                      >
                        {{ Number(clacPriceWithoutDiscount).toLocaleString() }}
                        <v-chip small color="error">
                          {{ discount_price_percent + "%" }}
                        </v-chip>
                      </span>
                      <span
                        class="px-2 font_16"
                        v-if="!$vuetify.breakpoint.mdAndUp"
                      >
                        {{ this.$price(base_price) }}
                        <span class="font_12">ریال</span>
                      </span>
                    </div> -->
                  </v-col>
                  <v-col
                    class="d-flex justify-end"
                  >
                    <div class="d-flex flex-column">
                      <!-- <span
                        class="px-2 font_14 error--text text-decoration-line-through"
                      >
                        {{ Number(clacPriceWithoutDiscount).toLocaleString() }}
                        <v-chip small color="error">
                          {{ discount_price_percent + "%" }}
                        </v-chip>
                      </span> -->
                      <span class="px-2 font_16">
                        <!-- {{ Number(clacPrice).toLocaleString() }} -->
                        {{ this.$price(base_price) }}
                        <span class="font_12">ریال</span>
                      </span>
                    </div>
                  </v-col>
                  <!-- <v-col
                class="flex-grow-0 d-flex align-center justify-center mt-3"
              >
                <v-row> -->
                  <v-col
                    class="flex-grow-0 d-flex align-center justify-left mt-3"
                  >
                    <v-btn
                      type="submit"
                      :disabled="!valid || loading || !available"
                      :loading="loading"
                      width="200"
                      class="rounded-0"
                      style="letter-spacing: 0"
                      outlined
                      color="primary"
                      large
                    >
                      <v-icon>mdi-cart-outline</v-icon>
                      <span>افزودن به سبد</span>
                      <!-- <span
                        class="px-2 font_16"
                        v-if="$vuetify.breakpoint.mdAndUp"
                      >
                        {{ " - " + Number(clacPrice).toLocaleString() }}
                        
                    {{ this.$price(product.price) }}
                        <span class="font_12">ریال</span>
                      </span> -->
                    </v-btn>
                    <div v-if="error_variation">
                      <span
                        v-text="error_message"
                        class="error--text font_14"
                      ></span>
                      <v-icon color="error">mdi-alert-circle-outline</v-icon>
                    </div>
                  </v-col>
                  <!-- </v-row>
              </v-col> -->
                </v-row>
              </v-col>
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
    <!-- v-if="variations_data_1.length < 1" -->
    <!-- <v-row
      :class="$vuetify.breakpoint.mdAndUp ? 'mb-10' : ''"
      no-gutters
      class="flex-grow-0 d-flex align-center"
    >
      <v-col
        v-if="!loading_product"
        cols="12"
        :class="$vuetify.breakpoint.mdAndUp ? ' pr-13' : ''"
      >
        <v-card
          max-width="600px"
          elevation="2"
          :class="$vuetify.breakpoint.mdAndUp ? '' : 'mx-6'"
        >
          <v-img :src="$getImage(main_image)" class="error_img">
            <span
              class="white--text align-center text-center"
              :class="
                $vuetify.breakpoint.mdAndUp
                  ? 'box-error px-15 mr-2 py-2'
                  : 'box-error-mobile  py-1'
              "
            >
              اتمام موجودی
            </span>
          </v-img>
        </v-card>
      </v-col>
    </v-row> -->
    <v-dialog v-model="showLoginDialog" max-width="650">
      <v-card class="pa-4">
        <v-row no-gutters class="justify-end mb-2">
          <v-icon color="primary" @click="closeLoginDialog">mdi-close</v-icon>
        </v-row>
        <OTPPhoneForm v-if="!otpUsername" v-model="otpUsername" />
        <OTPCodeForm
          v-else
          v-model="otpUsername"
          :reload_page="false"
          :url_path="''"
          :auto_navigate="false"
          @success="handleOtpSuccess"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CountDown from "../CountDown/CountDown.vue";
import Loader from "../Layout/Loader.vue";
import OTPCodeForm from "@/components/Auth/OTPCodeForm.vue";
import OTPPhoneForm from "@/components/Auth/OTPPhoneForm.vue";

export default {
  components: { CountDown, Loader, OTPCodeForm, OTPPhoneForm },
  props: {
    product: {
      type: Object,
      required: true,
    },
    loading_product: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    valid: false,
    error_variation: false,
    galeryProduct:[],
    available: true,
    error_message: "قابلیت خرید وجود ندارد",
    main_image: "",
    loading: false,
    price: "",
    max: null,
    min: null,
    number: 1,
    base_price: "",
    min_price: "",
    variation_id: null,
    setInfoBasket: null,
    discounted_price: null,
    active_discount: null,
    final_discount: 0,
    count_down_timer: null,
    update_id: null,
    update_number: null,
    whole_variations: [],
    single_variations: [],
    all_variations: [],
    variations_data_1: [],
    variations_data_2: [],
    variations_data_3: [],
    unique_variation: [],
    slider_items_img: [],
    selected_var: [],
    items_variation2: [],
    items_variation3: [],
    product_images: [],
    items_product: "",
    form: {
      var1: "",
      var2: "",
      var3: "",
    },

    switch_single_whole: {
      title: "فروش",
      items: [
        { text: "جزئی", value: "single" },
        { text: "فله", value: "whole" },
      ],
      select: "single",
      active: false,
    },
    variation1: {
      title: null,
      items: [],
    },
    variation2: {
      title: null,
      items: [],
    },
    variation3: {
      title: null,
      items: [],
    },
    favorites: [],
    favorite: false,
    favorite_id: null,
    showLoginDialog: false,
    otpUsername: "",
    pendingAddToBasket: false,
    favoriteProcessing: false,
    pendingFavoriteToggle: false,
  }),

  watch: {
    "form.var1"() {
      this.form.var2 = "";
      this.form.var3 = "";
      let product_images = [];
      this.setVariationItems(this.form.var1, this.items_variation2, "2");
      let find = this.variation1.items.find((x) => x.value == this.form.var1);
      if (Boolean(find)) {
        product_images= find.product_images;
        
      }
      this.$emit("getImageSlider", {
        main_image: this.main_image,
        product_images: product_images,
      });
    },
    "form.var2"() {
      this.form.var3 = "";
      this.setVariationItems(this.form.var2, this.items_variation3, "3");
    },
    "form.var3"() {
      this.findSlectedProduct();
    },
    valid() {
      if (Boolean(this.valid)) {
        this.getVarians();
      }
    },
    showLoginDialog(value) {
      if (!value) {
        this.otpUsername = "";
        this.pendingAddToBasket = false;
        this.pendingFavoriteToggle = false;
      }
    },
    "product.id"(value) {
      if (value) {
        this.initializeFavoriteState();
      }
    },
  },
  computed: {
    clacPrice() {
      // if(this.switch_single_whole.select == 'single') return this.price
      return (
        (Number(this.price) - Number(this.final_discount)) * Number(this.number)
      );
    },
    //   clacPriceWithoutDiscount() {
    //     // if(this.switch_single_whole.select == 'single') return this.price
    //     return Number(this.price) * Number(this.number);
    //   },
    //   discount_price_percent() {
    //     let price = Number(this.price);
    //     let discount = Number(this.final_discount);
    //     return Math.ceil((discount / price) * 100);
    //   },
  },

  mounted() {
    this.base_price = this.product.base_price;
    this.main_image = this.product.main_image;
    this.min_price = this.product.base_price;
    this.available = (this.product.stock_pro != null && this.product.stock_pro > 0);
    if (Boolean(this.product)) {
      this.setItemsProduct();
    }
    this.initializeFavoriteState();
  },
  methods: {
    setItemsProduct() {
      let items1 = [];
      let items2 = [];
      let items3 = [];
      let data = this.product.product_variation_combinations;
      this.variation1.title = data[0].variation1.variation_type.value;
      this.variation2.title = data[0].variation2.variation_type.value;
      this.variation3.title = data[0].variation3.variation_type.value;
      if (data[0]?.variation1) {
          this.galeryProduct = data[0].variation1.product_images
          
          this.$emit("galeryProduct" , this.galeryProduct)
        }  
      for (let index = 0; index < data.length; index++) {
        const x = data[index];
            
        items1.push({
          text: x.variation1.colors,
          value: x.variation1.id,
          product_images: x.variation1.product_images,
        });
        items2.push({
          text: x.variation2.value,
          value: x.variation2.id,
          parent_id: x.variation_1_id,
        });
        items3.push({
          text: x.variation3.value,
          value: x.variation3.id,
          parent_id: x.variation_2_id,
        });
      }
      this.variation1.items = items1;
      this.items_variation2 = items2;
      this.items_variation3 = items3;
      
    },
    getProductDetails() {
      this.$reqApi("/product/show", { id: this.product.id }).then((res) => {
        this.product = res.data;
      });
    },
    setProductSlider(data) {
      if (typeof data.main_picture_path == "array") {
        this.product_slider = data.main_picture_path;
        return;
      }
      this.product_slider = [
        { image: data.main_picture_path, title: data.name },
      ];
    },
    setProductVariation(data) {
      if (data.has_single_sell == "1")
        this.setProductSingleVariation(data.single_sell_variation_combinations);
      if (data.has_whole_sell == "1") {
        this.setProductWholeVariation(data.whole_sell_variation_combinations);
      }
      if (data.has_single_sell == "1" && data.has_whole_sell == "1")
        this.switch_single_whole.active = true;
      if (data.has_single_sell == "0" && data.has_whole_sell == "1")
        this.switch_single_whole.select = "whole";
    },
    setProductSingleVariation(variations) {
      variations?.forEach((each) => {
        let object = {
          id: each.id,
          max: each.max,
          min: each.min,
          price: each.price,
          discounted_price: each.discounted_price,
          active_discount: each.active_discount,
        };
        if (each.variation1 && each.variation1_info) {
          object["variation1"] = {
            title: each.variation1_info.variation_type.value,
            value: each.variation1_info.value,
          };
        } else {
          object["variation1"] = null;
        }
        if (each.variation2 && each.variation2_info) {
          object["variation2"] = {
            title: each.variation2_info.variation_type.value,
            value: each.variation2_info.value,
          };
        } else {
          object["variation2"] = null;
        }
        if (each.variation3 && each.variation3_info) {
          object["variation3"] = {
            title: each.variation3_info.variation_type.value,
            value: each.variation3_info.value,
          };
        } else {
          object["variation3"] = null;
        }
        this.single_variations.push(object);
        this.all_variations.push(object);
      });
    },
    setProductWholeVariation(variations) {
      variations?.forEach((each) => {
        let object = {
          id: each.id,
          max: each.max,
          min: each.min,
          price: each.price,
          discounted_price: each.discounted_price,
          active_discount: each.active_discount,
        };
        if (each.variation1 && each.variation1_info) {
          object["variation1"] = {
            title: each.variation1_info.variation_type.value,
            value: each.variation1_info.value,
          };
        } else {
          object["variation1"] = null;
        }
        if (each.variation2 && each.variation2_info) {
          object["variation2"] = {
            title: each.variation2_info.variation_type.value,
            value: each.variation2_info.value,
          };
        } else {
          object["variation2"] = null;
        }
        if (each.variation3 && each.variation3_info) {
          object["variation3"] = {
            title: each.variation3_info.variation_type.value,
            value: each.variation3_info.value,
          };
        } else {
          object["variation3"] = null;
        }
        // if (each.sub_variations_for_whole_sell.length != 0) {
        //   object["sub_variations_for_whole_sell"] =
        //     each.sub_variations_for_whole_sell;
        // }
        // else {
        //   object["sub_variations_for_whole_sell"] = null;
        // }
        this.whole_variations.push(object);
      });
    },

    removeDuplicateItemFromArray(array) {
      array = [...new Set(array)];
    },
    addProductCount() {
      this.number++;
      this.base_price = this.min_price * this.number;
    },
    removeProductCount() {
      if (this.number > 1) {
        this.number--;
        this.base_price = this.min_price * this.number;
      }
    },
    resetProductCount() {
      this.number = this.min || 1;
    },
    checkProductCount() {
      if (this.switch_single_whole.select == "whole") {
        this.findWholeSubVariation();
        return;
      }
      if (this.number < (this.min || 1)) {
        this.number = this.min || 1;
      }
      if (this.number > this.max) {
        this.number = this.max;
      }
    },
    // findWholeSubVariation() {
    //   this.all_variations?.forEach((each, index) => {
    //     if (this.chackWhichWholeVariationSelected(each)) {
    //       if (each.sub_variations_for_whole_sell) {
    //         if (this.number <= each.max && this.number >= each.min) {
    //           this.variation_id = each.id;
    //           this.price = each.price;
    //           this.max = each.max;
    //           this.min = each.min;
    //         }
    //         each.sub_variations_for_whole_sell?.forEach((item, i) => {
    //           if (this.number <= item.max && this.number >= item.min) {
    //             this.variation_id = item.id;
    //             this.price = item.price;
    //             this.max = item.max;
    //             this.min = item.min;
    //           }
    //         });
    //       } else {
    //         this.variation_id = each.id;
    //         this.price = each.price;
    //         this.max = each.max;
    //         this.min = each.min;
    //       }
    //     }
    //   });
    //   if (
    //     Number(this.number) > Number(this.max) ||
    //     Number(this.number) < Number(this.min || 1)
    //   ) {
    //     this.error_variation = true;
    //     this.error_message = "مقدار محصول در بازه تعریف شده قرار ندارد";
    //   } else {
    //     this.error_variation = false;
    //   }
    // },
    // chackWhichWholeVariationSelected(variation) {
    //   let check = false;
    //   if (variation.id == this.variation_id) check = true;
    //   if (variation.sub_variations_for_whole_sell) {
    //     variation.sub_variations_for_whole_sell?.forEach((item, i) => {
    //       if (item.id == this.variation_id) check = true;
    //     });
    //   }
    //   return check;
    // },
    // addToBasket() {
    //   if (
    //     this.checkProductIsInBasket() &&
    //     this.switch_single_whole.select == "single"
    //   ) {
    //     this.checkProductCount();
    //     this.updateItemToBasket();
    //   } else {
    //     this.checkProductCount();
    //     this.insertNewItemToBasket();
    //   }
    // },
    // checkProductIsInBasket() {
    //   if (!this.$store.state.base.basket.data) {
    //     return false;
    //   }
    //   let basket_items = this.$store.state.base.basket.data.items;
    //   let item = basket_items.find(
    //     (each) => each.product_varcomb_id == this.variation_id
    //   );
    //   if (
    //     item &&
    //     item != undefined &&
    //     this.switch_single_whole.select == "single"
    //   ) {
    //     this.update_id = item.id;
    //     this.number = Number(item.number) + Number(this.number);
    //     this.update_number = Number(item.number);
    //     return true;
    //   } else {
    //     this.update_id = null;
    //     return false;
    //   }
    // },
    // insertNewItemToBasket() {
    //   this.loading = true;
    //   let form = {
    //     number: this.number,
    //     product_varcomb_id: this.variation_id,
    //   };
    //   this.$reqApi("/basket-item/insert", form)
    //     .then((res) => {
    //       this.loading = false;
    //       this.$toast.success("محصول با موفقیت به سبد اضافه شد");
    //       this.$store.dispatch("base/getBasket");
    //     })
    //     .catch((err) => {
    //       this.loading = false;
    //       this.$toast.error("محصول به سبد اضافه نشد");
    //     });
    // },
    // updateItemToBasket() {
    //   this.loading = true;
    //   let form = {
    //     number: this.number,
    //     id: this.update_id,
    //   };
    //   this.number = Number(this.number) - Number(this.update_number);
    //   this.$reqApi("/basket-item/update", form)
    //     .then((res) => {
    //       this.loading = false;
    //       this.$toast.success("محصول با موفقیت در سبد بروز شد");
    //       this.$store.dispatch("base/getBasket");
    //     })
    //     .catch((err) => {
    //       this.loading = false;
    //       this.$toast.error("محصول به سبد اضافه نشد");
    //     });
    // },
    // clacDiscount() {
    //   if (this.discounted_price && this.active_discount) {
    //     if (this.active_discount.type == "percent") {
    //       this.final_discount =
    //         (Number(this.price) * Number(this.active_discount.discount)) / 100;
    //     }
    //     if (this.active_discount.type == "amount") {
    //       this.final_discount = Number(this.active_discount.discount);
    //     }
    //   }
    //   if (!this.discounted_price && this.active_discount) {
    //     if (this.active_discount.type == "percent") {
    //       this.final_discount =
    //         (Number(this.price) * Number(this.active_discount.discount)) / 100;
    //     }
    //     if (this.active_discount.type == "amount") {
    //       this.final_discount = Number(this.active_discount.discount);
    //     }
    //   }
    //   if (this.discounted_price && !this.active_discount) {
    //     this.final_discount =
    //       Number(this.price) - Number(this.discounted_price);
    //   }
    //   if (!this.discounted_price && !this.active_discount) {
    //     this.final_discount = 0;
    //   }
    // },
    // findDiscountCountDownTimer() {
    //   for (let item of this.single_variations) {
    //     if (item.active_discount) {
    //       this.count_down_timer = item.active_discount.ends_at;
    //       return;
    //     }
    //   }
    //   for (let item of this.whole_variations) {
    //     if (item.active_discount) {
    //       this.count_down_timer = item.active_discount.ends_at;
    //       return;
    //     }
    //   }
    // },
    // selectDiscountedVariation() {
    //   for (let item of this.single_variations) {
    //     if (item.discounted_price) {
    //       this.selectFullVariation(item);
    //       return;
    //     }
    //     if (item.active_discount) {
    //       this.selectFullVariation(item);
    //       return;
    //     }
    //   }
    //   for (let item of this.whole_variations) {
    //     if (item.discounted_price) {
    //       this.selectFullVariation(item);
    //       return;
    //     }
    //     if (item.active_discount) {
    //       this.selectFullVariation(item);
    //       return;
    //     }
    //   }
    // },
    // selectFullVariation(item) {
    //   item.variation1 && this.selectVariation1(item.variation1.value);
    //   item.variation2 && this.selectVariation2(item.variation2.value);
    //   item.variation3 && this.selectVariation3(item.variation3.value);
    // },
    setVariationItems(id, data, number) {
      let items = JSON.parse(JSON.stringify(data));
      if (number == 2) {
        this.variation2.items = items.filter((f) => f.parent_id == id);
      }
      if (number == 3) {
        this.variation3.items = items.filter((f) => f.parent_id == id);
      }
    },
    findSlectedProduct() {
      let product = this.product.product_variation_combinations.find(
        (f) =>
          f.variation_1_id == this.form.var1 &&
          f.variation_2_id == this.form.var2 &&
          f.variation_3_id == this.form.var3
      );
      if (Boolean(product)) {
      }
    },
    insertNewItemToBasket() {
      this.loading = true;
      let form = {
        number: this.number,
        product_varcomb_id: this.variation_id,
      };
      this.$reqApi("/basket-item/insert", form)
        .then((res) => {
          this.loading = false;
          this.$toast.success("محصول با موفقیت به سبد اضافه شد");
          this.$store.dispatch("base/getBasket");
        })
        .catch((err) => {
          this.loading = false;
          this.$toast.error("محصول به سبد اضافه نشد");
        });
    },
    updateItemToBasket() {
      this.loading = true;
      let form = {
        number: this.number,
        id: this.update_id,
      };
      this.number = Number(this.number) - Number(this.update_number);
      this.$reqApi("/basket-item/update", form)
        .then((res) => {
          this.loading = false;
          this.$toast.success("محصول با موفقیت در سبد بروز شد");
          this.$store.dispatch("base/getBasket");
        })
        .catch((err) => {
          this.loading = false;
          this.$toast.error("محصول به سبد اضافه نشد");
        });
    },
    clacDiscount() {
      if (this.discounted_price && this.active_discount) {
        if (this.active_discount.type == "percent") {
          this.final_discount =
            (Number(this.price) * Number(this.active_discount.discount)) / 100;
        }
        if (this.active_discount.type == "amount") {
          this.final_discount = Number(this.active_discount.discount);
        }
      }
      if (!this.discounted_price && this.active_discount) {
        if (this.active_discount.type == "percent") {
          this.final_discount =
            (Number(this.price) * Number(this.active_discount.discount)) / 100;
        }
        if (this.active_discount.type == "amount") {
          this.final_discount = Number(this.active_discount.discount);
        }
      }
      if (this.discounted_price && !this.active_discount) {
        this.final_discount =
          Number(this.price) - Number(this.discounted_price);
      }
      if (!this.discounted_price && !this.active_discount) {
        this.final_discount = 0;
      }
    },
    findDiscountCountDownTimer() {
      for (let item of this.single_variations) {
        if (item.active_discount) {
          this.count_down_timer = item.active_discount.ends_at;
          return;
        }
      }
      for (let item of this.whole_variations) {
        if (item.active_discount) {
          this.count_down_timer = item.active_discount.ends_at;
          return;
        }
      }
    },
    selectDiscountedVariation() {
      for (let item of this.single_variations) {
        if (item.discounted_price) {
          this.selectFullVariation(item);
          return;
        }
        if (item.active_discount) {
          this.selectFullVariation(item);
          return;
        }
      }
      for (let item of this.whole_variations) {
        if (item.discounted_price) {
          this.selectFullVariation(item);
          return;
        }
        if (item.active_discount) {
          this.selectFullVariation(item);
          return;
        }
      }
    },
    selectFullVariation(item) {
      item.variation1 && this.selectVariation1(item.variation1.value);
      item.variation2 && this.selectVariation2(item.variation2.value);
      item.variation3 && this.selectVariation3(item.variation3.value);
    },
    toggleFavorite() {
      if (this.favoriteProcessing || !this.product || !this.product.id) {
        return;
      }
      if (!this.$store.state.auth.user) {
        this.pendingFavoriteToggle = true;
        this.showLoginDialog = true;
        return;
      }
      this.favoriteProcessing = true;
      const actionPromise = this.favorite
        ? this.removeFavorite()
        : this.addFavorite(this.product.id);
      if (actionPromise && typeof actionPromise.finally === "function") {
        actionPromise
          .catch(() => {})
          .finally(() => {
            this.favoriteProcessing = false;
          });
      } else {
        this.favoriteProcessing = false;
      }
    },
    initializeFavoriteState() {
      this.favorites = [];
      this.favorite = false;
      this.favorite_id = null;
      if (!this.product || !this.product.id) {
        return Promise.resolve();
      }
      if (!this.$store.state.auth.user) {
        return Promise.resolve();
      }
      return this.favoritesList().catch(() => {});
    },
    addFavorite(id) {
      const product_id = id;
      return this.$reqApi("favoritelist/insert", { product_id })
        .then(() => {
          this.$toast.success("محصول به لیست علاقه مندی ها اضافه شد");
          this.favorite = true;
          return this.favoritesList();
        })
        .catch((error) => {
          this.favorite = false;
          throw error;
        });
    },
    removeFavorite() {
      const id = this.favorite_id;
      if (!id) {
        this.favorite = false;
        this.favorite_id = null;
        return Promise.resolve();
      }
      return this.$reqApi("favoritelist/delete", { id })
        .then(() => {
          this.$toast.success("محصول از لیست علاقه مندی ها حذف شد");
          this.favorite = false;
          this.favorite_id = null;
          this.favorites = this.favorites.filter(
            (favorite) => favorite.id !== id
          );
        })
        .catch((error) => {
          throw error;
        });
    },
    favoritesList() {
      if (!this.$store.state.auth.user) {
        this.favorites = [];
        this.favorite = false;
        this.favorite_id = null;
        return Promise.resolve();
      }
      let filters = {
        user_id: this.$store.state.auth.user.id,
      };
      return this.$reqApi("favoritelist/my-favorite", { filters })
        .then((response) => {
          let list = [];
          if (response && Array.isArray(response.model)) {
            list = response.model;
          } else if (
            response &&
            response.data &&
            Array.isArray(response.data.model)
          ) {
            list = response.data.model;
          }
          this.favorites = list.map((item) => ({
            id: item.id,
            product_id: item.product_id,
          }));
          const matched = this.favorites.find(
            (item) => item.product_id === this.product.id
          );
          this.favorite = Boolean(matched);
          this.favorite_id = matched ? matched.id : null;
        })
        .catch((error) => {
          this.favorite = false;
          this.favorite_id = null;
          throw error;
        });
    },
    addToBasket() {
      if (!this.$store.state.auth.user) {
        this.pendingAddToBasket = true;
        this.showLoginDialog = true;
        return;
      }
      this.performAddToBasket();
    },
    performAddToBasket() {
      if (!this.setInfoBasket || !this.setInfoBasket.id) {
        this.$toast.error("لطفا ابتدا تنوع محصول را انتخاب کنید");
        return;
      }
      this.loading = true;
      let form = {
        product_varcomb_id: this.setInfoBasket.id,
        number: this.number,
      };
      this.$reqApi("shop/basket/insert-by-user", form)
        .then(() => {
          this.$toast.success("با موفقیت به سبد خرید افزوده شد");
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleOtpSuccess() {
      this.showLoginDialog = false;
      const shouldAddToBasket = this.pendingAddToBasket;
      const shouldToggleFavorite = this.pendingFavoriteToggle;
      this.pendingAddToBasket = false;
      this.pendingFavoriteToggle = false;
      if (shouldAddToBasket) {
        this.performAddToBasket();
      }
      if (shouldToggleFavorite) {
        this.initializeFavoriteState()
          .catch(() => {})
          .finally(() => {
            this.toggleFavorite();
          });
      }
    },
    closeLoginDialog() {
      this.showLoginDialog = false;
    },
    getVarians(){
      const variation = this.product.product_variation_combinations

      let find_var = variation.find((x)=> x.variation_1_id == this.form.var1 
                                          && x.variation_2_id == this.form.var2
                                          &&x.variation_3_id == this.form.var3  )
      if (Boolean(find_var)) {
        this.setInfoBasket = find_var
      }
    }
  },
};
</script>
<style scoped>
.error_img {
  position: relative;
}
.box-error {
  position: absolute;
  font-size: 12px;
  rotate: 35deg;
  border: 1px solid #dd6161;
  background-color: #c90909fe;
  top: 5%;
  left: 75%;
  width: 200px;
  border-radius: 5px;
}
.box-error-mobile {
  position: absolute;
  font-size: 7px;
  rotate: 35deg;
  border: 1px solid #dd6161;
  background-color: #c90909fe;
  top: 5%;
  width: 110px;
  left: 73%;
  border-radius: 5px;
}
.favorite-icon {
  cursor: pointer;
  transition: transform 0.2s ease;
}
.favorite-icon:hover {
  transform: scale(1.05);
}
.favorite-icon--disabled {
  cursor: default;
  opacity: 0.6;
  pointer-events: none;
  transform: none;
}
</style>
