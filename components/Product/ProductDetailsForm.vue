<template>
  <v-form v-model="valid" @submit.prevent="addToBasket" style="height: 100%">
    <v-row no-gutters style="height: 100%" class="justify-space-around">
      <v-col class="col-12 col-md-12 pa-3 pa-md-6">
        <v-row
          no-gutters
          class="flex-column"
          style="height: 100%"
          v-if="variations_data_1.length > 0"
        >
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
              <CountDown v-if="count_down_timer" :end_time="count_down_timer" />
            </v-btn>
          </v-col>
          <v-col class="flex-grow-0 d-flex align-center">
            <h1 class="font_22 font-weight-regular">{{ product.name }}</h1>
            <div class="primary--text font_12 px-3">
              <!-- <span>{{ product.comments.length }}</span> -->
              <span>دیدگاه</span>
            </div>
            <v-icon class="mr-auto" color="primary">mdi-heart-outline</v-icon>
          </v-col>
          <v-divider class="my-3 primary"></v-divider>
          <v-col class="flex-grow-0 d-flex align-center">
            <div class="font_14 mb-3">
              <span>موجودی:</span>
              <span class="success--text">موجود در انبار</span>
            </div>
          </v-col>

          <div>
            <v-col
              class="flex-grow-0 d-flex align-center"
              v-for="(item, index) in items_product"
              :key="index"
            >
              <amp-select
                width="10px"
                v-if="item.sort == 1"
                :text="'انتخاب' + ' ' + item.text"
                :items="variations_data_1"
                v-model="variations_items_1"
              />
              <amp-select
                v-if="item.sort == 2"
                :disabled="!variations_items_1"
                :text="'انتخاب' + ' ' + item.text"
                :items="variations_data_2"
                v-model="variations_items_2"
              />

              <amp-select
                :disabled="!variations_items_2"
                v-if="item.sort == 3"
                :text="'انتخاب' + ' ' + item.text"
                :items="variations_data_3"
                v-model="variations_items_3"
              />
            </v-col>
          </div>

          <!-- <v-col class="flex-grow-0 d-flex align-center">
            <amp-select text="انتخاب سایز :" :items="product.sizes" />
          </v-col> -->
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
                <div class="d-flex flex-column">
                  <span
                    class="px-2 font_14 error--text text-decoration-line-through"
                    v-if="final_discount"
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
                    {{ this.$price(product.price) }}
                    <span class="font_12">تومان</span>
                  </span>
                </div>
              </v-col>
              <v-col
                v-if="$vuetify.breakpoint.mdAndUp"
                class="d-flex justify-end"
              >
                <div class="d-flex flex-column">
                  <span
                    class="px-2 font_14 error--text text-decoration-line-through"
                    v-if="final_discount"
                  >
                    {{ Number(clacPriceWithoutDiscount).toLocaleString() }}
                    <v-chip small color="error">
                      {{ discount_price_percent + "%" }}
                    </v-chip>
                  </span>
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
              <v-col class="flex-grow-0 d-flex align-center justify-left mt-3">
                <v-btn
                  type="submit"
                  :loading="loading"
                  :disabled="!valid || error_variation"
                  width="200"
                  class="rounded-0"
                  style="letter-spacing: 0"
                  outlined
                  color="primary"
                  large
                >
                  <v-icon class="">mdi-cart-outline</v-icon>
                  <span>افزودن به سبد</span>
                  <!-- <span
                        class="px-2 font_16"
                        v-if="$vuetify.breakpoint.mdAndUp"
                      >
                        {{ " - " + Number(clacPrice).toLocaleString() }}
                        
                    {{ this.$price(product.price) }}
                        <span class="font_12">تومان</span>
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
        </v-row>
        <v-row no-gutters class="flex-column" style="height: 100%" v-else>
          <span class="font_19 error--text box-error text-center py-5">
            اتمام موجودی !
          </span>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import CountDown from "../CountDown/CountDown.vue";

export default {
  components: { CountDown },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    valid: false,
    error_variation: false,
    error_message: "قابلیت خرید وجود ندارد",
    loading: false,
    price: "",
    max: null,
    min: null,
    number: 1,
    base_price: "",
    variation_id: null,
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
    items_product: "",
    variations_items_1: "",
    variations_items_2: "",
    variations_items_3: "",
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
      select: null,
    },
    variation2: {
      title: null,
      items: [],
      select: null,
    },
    variation3: {
      title: null,
      items: [],
      select: null,
    },
  }),
  // watch: {
  //   "switch_single_whole.select"(value) {
  //     if (value == "whole") {
  //       this.error_variation = false;
  //       this.all_variations = this.whole_variations;
  //       this.setProductSelect();
  //     }
  //     if (value == "single") {
  //       this.error_variation = false;
  //       this.all_variations = this.single_variations;
  //       this.setProductSelect();
  //     }
  //   },
  //   "variation1.select"(value) {
  //     this.selectVariation1(value);
  //   },
  //   "variation2.select"(value) {
  //     this.selectVariation2(value);
  //   },
  //   "variation3.select"(value) {
  //     this.selectVariation3(value);
  //   },
  //   max(value) {
  //     this.resetProductCount();
  //     if (!value || value == 0) {
  //       this.error_message = "ترکیب انتخاب شده موجود نیست.";
  //       this.error_variation = true;
  //     } else {
  //       this.error_variation = false;
  //     }
  //   },
  //   number(value) {
  //     this.checkProductCount();
  //   },
  //   active_discount() {
  //     this.clacDiscount();
  //   },
  //   discounted_price() {
  //     this.clacDiscount();
  //   },
  // },
  watch: {
    variations_items_1() {
      this.variations_items_2 = "";
      this.variations_items_3 = "";
      this.variations_data_2 = [];
      this.variations_data_3 = [];
      let selected_var = [];
      this.setItemsProduct();
      for (let index = 0; index < this.slider_items_img.length; index++) {
        const x = this.slider_items_img[index];
        if (x.id == this.variations_items_1) {
          selected_var.push({
            sort: x.sort,
            id: x.id,
            path: x.path,
          });
        }
      }
      let selected_var_new = selected_var.filter(
        (item, index, self) => index === self.findIndex((t) => t.id === item.id)
      );
      this.selected_var = selected_var_new;
      this.$emit("getImageSlider", this.selected_var);
    },
    variations_items_2() {
      this.variations_items_3 = "";
      this.variations_data_3 = [];
      this.setItemsProduct();
    },
    variations_items_3() {
      this.setItemsProduct();
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
  // mounted() {
  //   if (this.product) {
  //     this.setProductVariation(this.product);
  //     this.setProductSelect();
  //     this.findDiscountCountDownTimer();
  //     this.selectDiscountedVariation();
  //   }
  // },
  mounted() {
    this.base_price = this.product.base_price;
    this.setItemsProduct();
  },
  methods: {
    setItemsProduct() {
      let items = {};
      this.slider_items_img = [];
      let products = this.product.product_variations.sort(
        (a, b) => a.variation_type.sort - b.variation_type.sort
      );
      for (let index = 0; index < products.length; index++) {
        const element = products[index];
        if (typeof items[element.variation_type.id] == "undefined") {
          items[element.variation_type.id] = {
            id: element.variation_type.id,
            sort: element.variation_type.sort,
            text: element.variation_type.value,
          };
        }

        this.product.product_variation_combinations.map((x) => {
          if (
            x.stock > 0 &&
            element.variation_type.sort == 1 &&
            (element.id == x.variation_1_id ||
              element.id == x.variation_2_id ||
              element.id == x.variation_3_id)
          ) {
            if (element.product_images.length > 0) {
              this.slider_items_img.push({
                sort: element.variation_type.sort,
                id: element.id,
                path: element.product_images.map((x) => x.path),
              });
            }

            this.variations_data_1.push({
              text: element.value,
              value: element.id,
            });
          }
          if (
            Boolean(this.variations_items_1) &&
            x.stock > 0 &&
            (element.id == x.variation_1_id ||
              element.id == x.variation_2_id ||
              element.id == x.variation_3_id) &&
            (this.variations_items_1 == x.variation_1_id ||
              this.variations_items_1 == x.variation_2_id ||
              this.variations_items_1 == x.variation_3_id) &&
            element.variation_type.sort == 2
          ) {
            this.variations_data_2.push({
              text: element.value,
              value: element.id,
            });
          }
          if (
            Boolean(this.variations_items_1 && this.variations_items_2) &&
            x.stock > 0 &&
            (element.id == x.variation_1_id ||
              element.id == x.variation_2_id ||
              element.id == x.variation_3_id) &&
            (this.variations_items_1 == x.variation_1_id ||
              this.variations_items_1 == x.variation_2_id ||
              this.variations_items_1 == x.variation_3_id) &&
            (this.variations_items_2 == x.variation_1_id ||
              this.variations_items_2 == x.variation_2_id ||
              this.variations_items_2 == x.variation_3_id) &&
            element.variation_type.sort == 3
          ) {
            this.variations_data_3.push({
              text: element.value,
              value: element.id,
            });
          }
        });
      }
      this.items_product = items;
    },
    getProductDetails() {
      this.$reqApi("/product/show", { id: this.product_id }).then((res) => {
        this.product = res.data;
        this.setProductSlider(res.data);
        this.setProductVariation(res.data);
        this.setProductSelect();
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
      variations.forEach((each) => {
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
      variations.forEach((each) => {
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
    setProductSelect() {
      let first_variation = true;
      this.variation1.items = [];
      this.all_variations.forEach((each, index) => {
        if (each.variation1) {
          this.variation1.title = each.variation1.title;
          this.variation1.items.push(each.variation1.value);
          this.variation1.items = [...new Set(this.variation1.items)];
          if (first_variation) {
            first_variation = false;
            this.selectVariation1(each.variation1.value);
          }
        } else {
          this.error_variation = true;
        }
      });
    },
    selectVariation1(value) {
      this.variation1.select = value;
      let first_variation = true;
      this.variation2.items = [];
      this.all_variations.forEach((each, index) => {
        if (each.variation1) {
          if (each.variation2 && each.variation1.value == value) {
            this.variation1.title = each.variation1.title;
            this.variation2.title = each.variation2.title;
            this.variation2.items.push(each.variation2.value);
            this.variation2.items = [...new Set(this.variation2.items)];
            if (first_variation) {
              first_variation = false;
              this.selectVariation2(each.variation2.value);
            }
          } else if (each.variation1.value == value) {
            this.variation3.title = null;
            this.variation2.title = null;
            this.discounted_price = each.discounted_price;
            this.active_discount = each.active_discount;
            this.variation_id = each.id;
            this.price = each.price;
            this.max = each.max;
            this.min = each.min;
          }
        }
      });
    },
    selectVariation2(value) {
      this.variation2.select = value;
      let first_variation = true;
      this.variation3.items = [];
      this.all_variations.forEach((each, index) => {
        if (each.variation2 && each.variation1) {
          if (each.variation3 && each.variation2.value == value) {
            this.variation2.title = each.variation2.title;
            this.variation3.title = each.variation3.title;
            this.variation3.items.push(each.variation3.value);
            this.variation3.items = [...new Set(this.variation3.items)];
            if (first_variation) {
              first_variation = false;
              this.selectVariation3(each.variation3.value);
            }
          } else if (
            each.variation2.value == this.variation2.select &&
            each.variation1.value == this.variation1.select
          ) {
            this.variation3.title = null;
            this.discounted_price = each.discounted_price;
            this.active_discount = each.active_discount;
            this.variation_id = each.id;
            this.price = each.price;
            this.max = each.max;
            this.min = each.min;
          }
        }
      });
    },
    selectVariation3(value) {
      this.variation3.select = value;
      this.all_variations.forEach((each, index) => {
        if (
          each.variation3 &&
          each.variation3.value == value &&
          each.variation2.value == this.variation2.select &&
          each.variation1.value == this.variation1.select
        ) {
          this.discounted_price = each.discounted_price;
          this.active_discount = each.active_discount;
          this.variation_id = each.id;
          this.price = each.price;
          this.max = each.max;
          this.min = each.min;
        }
      });
    },
    removeDuplicateItemFromArray(array) {
      array = [...new Set(array)];
    },
    addProductCount() {
      if (this.switch_single_whole.select == "whole") {
        this.number++;
        this.findWholeSubVariation();
        return;
      }
      // if (this.number < this.max) {
      this.number++;
      // }
    },
    removeProductCount() {
      if (this.switch_single_whole.select == "whole") {
        this.number--;
        this.findWholeSubVariation();
        return;
      }
      if (this.number > (this.min || 1)) {
        this.number--;
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
    findWholeSubVariation() {
      this.all_variations.forEach((each, index) => {
        if (this.chackWhichWholeVariationSelected(each)) {
          if (each.sub_variations_for_whole_sell) {
            if (this.number <= each.max && this.number >= each.min) {
              this.variation_id = each.id;
              this.price = each.price;
              this.max = each.max;
              this.min = each.min;
            }
            each.sub_variations_for_whole_sell.forEach((item, i) => {
              if (this.number <= item.max && this.number >= item.min) {
                this.variation_id = item.id;
                this.price = item.price;
                this.max = item.max;
                this.min = item.min;
              }
            });
          } else {
            this.variation_id = each.id;
            this.price = each.price;
            this.max = each.max;
            this.min = each.min;
          }
        }
      });
      if (
        Number(this.number) > Number(this.max) ||
        Number(this.number) < Number(this.min || 1)
      ) {
        this.error_variation = true;
        this.error_message = "مقدار محصول در بازه تعریف شده قرار ندارد";
      } else {
        this.error_variation = false;
      }
    },
    chackWhichWholeVariationSelected(variation) {
      let check = false;
      if (variation.id == this.variation_id) check = true;
      if (variation.sub_variations_for_whole_sell) {
        variation.sub_variations_for_whole_sell.forEach((item, i) => {
          if (item.id == this.variation_id) check = true;
        });
      }
      return check;
    },
    addToBasket() {
      // if (
      //   this.checkProductIsInBasket() &&
      //   this.switch_single_whole.select == "single"
      // ) {
      //   this.checkProductCount();
      //   this.updateItemToBasket();
      // } else {
      //   this.checkProductCount();
      //   this.insertNewItemToBasket();
      // }
    },
    checkProductIsInBasket() {
      if (!this.$store.state.base.basket.data) {
        return false;
      }
      let basket_items = this.$store.state.base.basket.data.items;
      let item = basket_items.find(
        (each) => each.product_varcomb_id == this.variation_id
      );
      if (
        item &&
        item != undefined &&
        this.switch_single_whole.select == "single"
      ) {
        this.update_id = item.id;
        this.number = Number(item.number) + Number(this.number);
        this.update_number = Number(item.number);
        return true;
      } else {
        this.update_id = null;
        return false;
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
  },
};
</script>
<style scoped>
.box-error {
  border: 1px solid #dd6161;
  border-radius: 5px;
}
</style>
