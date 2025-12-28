<template></template>

<script>
export default {
  props: {
    product: {
      type: Object,
    },
  },
  data: () => ({
    product: null,
    product_id: null,
    product_slider: null,
    price: "",
    max: null,
    min: null,
    number: 1,
    variation_id: null,
    valid: false,
    whole_variations: [],
    single_variations: [],
    all_variations: [],
    switch_single_whole: {
      title: "فروش",
      items: [
        { text: "جزئی", value: "single" },
        { text: "کلی", value: "whole" },
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
    items: [
      {
        text: "خانه",
        disabled: false,
        to: "/",
      },
      {
        text: "لیست محصولات",
        disabled: false,
        to: "/product",
      },
      {
        text: "محصول",
        disabled: true,
        to: "/product",
      },
    ],
  }),
  watch: {
    "switch_single_whole.select"(value) {
      if (value == "whole") {
        this.all_variations = this.whole_variations;
        this.setProductSelect();
      }
      if (value == "single") {
        this.all_variations = this.single_variations;
        this.setProductSelect();
      }
    },
    "variation1.select"(value) {
      this.selectVariation1(value);
    },
    "variation2.select"(value) {
      this.selectVariation2(value);
    },
    "variation3.select"(value) {
      this.selectVariation3(value);
    },
    max(value) {
      this.resetProductCount();
    },
    number(value) {
      this.checkProductCount();
    },
  },
  mounted() {
    if (this.$route.params) {
      this.product_id = this.$route.params.id;
    }
    this.getProductDetails();
  },
  methods: {
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
      this.product_slider = [{ image: data.main_picture_path, title: data.name }];
    },
    setProductVariation(data) {
      if (data.has_single_sell)
        this.setProductSingleVariation(data.single_sell_variation_combinations);
      if (data.has_whole_sell) {
        this.switch_single_whole.active = true;
        this.setProductWholeVariation(data.whole_sell_variation_combinations);
      }
    },
    setProductSingleVariation(variations) {
      variations?.forEach((each) => {
        let object = {
          id: each.id,
          max: each.max,
          min: each.min,
          price: each.price,
        };
        if (each.variation1) {
          object["variation1"] = {
            title: each.variation1_info.variation_type.value,
            value: each.variation1_info.value,
          };
        } else {
          object["variation1"] = null;
        }
        if (each.variation2) {
          object["variation2"] = {
            title: each.variation2_info.variation_type.value,
            value: each.variation2_info.value,
          };
        } else {
          object["variation2"] = null;
        }
        if (each.variation3) {
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
        };
        if (each.variation1) {
          object["variation1"] = {
            title: each.variation1_info.variation_type.value,
            value: each.variation1_info.value,
          };
        } else {
          object["variation1"] = null;
        }
        if (each.variation2) {
          object["variation2"] = {
            title: each.variation2_info.variation_type.value,
            value: each.variation2_info.value,
          };
        } else {
          object["variation2"] = null;
        }
        if (each.variation3) {
          object["variation3"] = {
            title: each.variation3_info.variation_type.value,
            value: each.variation3_info.value,
          };
        } else {
          object["variation3"] = null;
        }
        if (each.sub_variations_for_whole_sell.length != 0) {
          object["sub_variations_for_whole_sell"] = each.sub_variations_for_whole_sell;
        } else {
          object["sub_variations_for_whole_sell"] = null;
        }
        this.whole_variations.push(object);
      });
    },
    setProductSelect() {
      let first_variation = true;
      this.variation1.items = [];
      this.all_variations?.forEach((each, index) => {
        if (each.variation1) {
          this.variation1.title = each.variation1.title;
          this.variation1.items.push(each.variation1.value);
          if (first_variation) {
            first_variation = false;
            this.selectVariation1(each.variation1.value);
          }
        }
      });
    },
    selectVariation1(value) {
      this.variation1.select = value;
      let first_variation = true;
      this.variation2.items = [];
      this.all_variations?.forEach((each, index) => {
        if (each.variation1) {
          if (each.variation2 && each.variation1.value == value) {
            this.variation1.title = each.variation1.title;
            this.variation2.title = each.variation2.title;
            this.variation2.items.push(each.variation2.value);
            if (first_variation) {
              first_variation = false;
              this.selectVariation2(each.variation2.value);
            }
          } else if (each.variation1.value == value) {
            this.variation3.title = null;
            this.variation2.title = null;
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
      this.all_variations?.forEach((each, index) => {
        if (each.variation2 && each.variation1) {
          if (each.variation3 && each.variation2.value == value) {
            this.variation2.title = each.variation2.title;
            this.variation3.title = each.variation3.title;
            this.variation3.items.push(each.variation3.value);
            if (first_variation) {
              first_variation = false;
              this.selectVariation3(each.variation3.value);
            }
          } else if (each.variation2.value == value) {
            this.variation3.title = null;
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
      let first_variation = null;
      this.all_variations?.forEach((each, index) => {
        if (each.variation3 && each.variation3.value == value) {
          this.variation_id = each.id;
          this.price = each.price;
          this.max = each.max;
          this.min = each.min;
        }
      });
    },
    addProductCount() {
      if (this.switch_single_whole.select == "whole") {
        this.number++;
        this.findWholeSubVariation();
        return;
      }
      if (this.number < this.max) {
        this.number++;
      }
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
      return this.number;
    },
    findWholeSubVariation() {
      this.all_variations?.forEach((each, index) => {
        if (this.chackWhichWholeVariationSelected(each)) {
          if (each.sub_variations_for_whole_sell) {
            if (this.number <= each.max && this.number >= each.min) {
              this.variation_id = each.id;
              this.price = each.price;
              this.max = each.max;
              this.min = each.min;
            }
            each.sub_variations_for_whole_sell?.forEach((item, i) => {
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
      if (Number(this.number) < (this.min || 1)) {
        this.number = this.min || 1;
      }
      if (Number(this.number) > this.max) {
        this.number = this.max;
      }
    },
    chackWhichWholeVariationSelected(variation) {
      let check = false;
      if (variation.id == this.variation_id) check = true;
      if (variation.sub_variations_for_whole_sell) {
        variation.sub_variations_for_whole_sell?.forEach((item, i) => {
          if (item.id == this.variation_id) check = true;
        });
      }
      return check;
    },
    addToBasket() {
      let app_id = this.$store.state.auth.app_id;
      let form = {
        number: this.checkProductCount(),
        product_varcomb_id: this.variation_id,
        app_id,
      };
      this.$reqApi("/basket-item/insert", form).then((res) => {
        this.$toast.success("محصول با موفقیت به سبد اضافه شد");
        this.$store.dispatch("base/getBasket", app_id);
      }).catch;
    },
  },
};
</script>
